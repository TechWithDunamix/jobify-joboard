### Week 2: Advanced Express.js Concepts and API Development

---

## Day 1: Express.js Middleware Deep Dive

### What is Middleware?

Middleware functions are functions that have access to the request (`req`), response (`res`), and the next function in the request-response cycle. Middleware is essential for processing requests, authentication, validation, and more.

Middleware can:

- Execute any code.
- Modify the request and response objects.
- End the request-response cycle.
- Call the next middleware function.

### Types of Middleware

1. **Application-Level Middleware**:
   Applied using `app.use()` or `app.METHOD()`.
   
   **Example**:
   ```javascript
   app.use((req, res, next) => {
     console.log('Request Type:', req.method);
     next();
   });
   ```

2. **Router-Level Middleware**:
   Applied specifically to a router instance.
   
   **Example**:
   ```javascript
   const router = express.Router();
   router.use((req, res, next) => {
     console.log('Router Level Middleware');
     next();
   });
   ```

3. **Error-Handling Middleware**:
   Used for handling errors that occur during request handling.
   
   **Example**:
   ```javascript
   app.use((err, req, res, next) => {
     console.error(err.stack);
     res.status(500).send('Something broke!');
   });
   ```

4. **Built-in Middleware**:
   Express includes several built-in middleware functions, such as `express.static`, `express.json()`, and `express.urlencoded()`.

### Custom Middleware

Custom middleware functions can be created for handling specific tasks, such as logging, authentication, or validation.

**Example of Logging Middleware**:
```javascript
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url} - Time: ${new Date().toISOString()}`);
  next();
});
```

---

## Day 2: Express.js Router

### Understanding the Router

Routers allow you to organize your Express.js code better by breaking up the application into smaller, manageable pieces. The router works like a mini-application capable of performing middleware and routing.

### Setting Up an Express Router

1. **Create a Router**:
   ```javascript
   const express = require('express');
   const router = express.Router();
   ```

2. **Define Routes for the Router**:
   ```javascript
   router.get('/users', (req, res) => {
     res.send('User List');
   });

   router.post('/users', (req, res) => {
     res.send('Create User');
   });
   ```

3. **Mount the Router in the Main Application**:
   ```javascript
   const app = express();
   app.use('/api', router);
   ```

Now all routes defined in the router will be prefixed with `/api`.

### Organizing Routes Using Routers

For better organization, you can separate routes into their own files:

**Example: `users.js` Router**:
```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('User List');
});

router.post('/', (req, res) => {
  res.send('Create User');
});

module.exports = router;
```

**In your main `app.js` file**:
```javascript
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
```

---

## Day 3: Working with Databases

### Connecting Express.js to a Database

Express.js can be connected to various databases, such as MongoDB, MySQL, PostgreSQL, and SQLite. In this course, we will use MongoDB with **Mongoose**, a popular ODM (Object Data Modeling) library for MongoDB.

### Installing Mongoose

To install Mongoose, run:

```bash
npm install mongoose
```

### Connecting to MongoDB

In your `server.js`, set up the connection to MongoDB:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
```

### Defining a Mongoose Schema and Model

Schemas define the structure of documents in MongoDB, while models are used to interact with the database.

**Example**:
```javascript
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model('User', userSchema);
```

### Performing CRUD Operations with Mongoose

1. **Create a New User**:
   ```javascript
   const newUser = new User({ name: 'Alice', age: 30, email: 'alice@example.com' });
   newUser.save((err, user) => {
     if (err) return console.error(err);
     console.log('User saved:', user);
   });
   ```

2. **Read Users**:
   ```javascript
   User.find({}, (err, users) => {
     if (err) return console.error(err);
     console.log('Users:', users);
   });
   ```

3. **Update a User**:
   ```javascript
   User.updateOne({ name: 'Alice' }, { age: 31 }, (err, res) => {
     if (err) return console.error(err);
     console.log('User updated');
   });
   ```

4. **Delete a User**:
   ```javascript
   User.deleteOne({ name: 'Alice' }, (err) => {
     if (err) return console.error(err);
     console.log('User deleted');
   });
   ```

---

## Day 4: Authentication with JWT (JSON Web Token)

### What is JWT?

JWT (JSON Web Token) is an open standard for securely transmitting information between parties as a JSON object. It is widely used for authentication in web applications.

### Installing JWT

Install the `jsonwebtoken` library:

```bash
npm install jsonwebtoken
```

### Generating a JWT

To generate a JWT, use the `sign()` method from the `jsonwebtoken` library:

```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign({ userId: 123 }, 'secret_key', { expiresIn: '1h' });
console.log('Generated Token:', token);
```

### Verifying a JWT

To verify a JWT, use the `verify()` method:

```javascript
jwt.verify(token, 'secret_key', (err, decoded) => {
  if (err) {
    console.log('Token is invalid');
  } else {
    console.log('Decoded Token:', decoded);
  }
});
```

### Protecting Routes with JWT

Middleware can be used to protect specific routes by requiring a valid JWT.

**Example**:
```javascript
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});
```

---

## Day 5: Building an Authentication System

### Setting Up User Registration

1. **Create a User Model**:

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);
```

2. **User Registration Route**:

```javascript
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  newUser.save((err, user) => {
    if (err) return res.status(500).send('Error saving user');
    res.status(201).send('User registered');
  });
});
```

### Implementing User Login

1. **Login Route**:

```javascript
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).send('Invalid email or password');

  const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
  res.json({ token });
});
```

2. **Protecting Routes**:
Apply the `authenticateToken` middleware to any routes that require authentication.

---

This completes **Week 2** of the Express.js API development course. Next week, we will focus on API security, testing, and deployment. Let me know when you're ready to move on to **Week 3** or if you need further clarifications!