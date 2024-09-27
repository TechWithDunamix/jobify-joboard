### Week 3: API Security, Testing, and Deployment

---

## Day 1: API Security Best Practices

### Importance of API Security

Securing your API is crucial to protect sensitive data and prevent unauthorized access. Here are some best practices for API security:

1. **Use HTTPS**: Always use HTTPS to encrypt data in transit. This helps prevent man-in-the-middle attacks.

2. **Authentication and Authorization**:
   - **JWT**: Use JSON Web Tokens for authentication.
   - **OAuth2**: Consider implementing OAuth2 for secure authorization, especially when dealing with third-party applications.

3. **Input Validation**: Always validate incoming data to prevent SQL injection, XSS, and other attacks. Use libraries like `express-validator`.

4. **Rate Limiting**: Implement rate limiting to protect your API from abuse and denial-of-service attacks.

5. **CORS (Cross-Origin Resource Sharing)**: Configure CORS to restrict which domains can access your API.

### Implementing Basic Security Features

1. **Using Helmet**: Helmet helps secure Express apps by setting various HTTP headers.

   **Installation**:
   ```bash
   npm install helmet
   ```

   **Usage**:
   ```javascript
   const helmet = require('helmet');
   app.use(helmet());
   ```

2. **Rate Limiting with Express-rate-limit**: 

   **Installation**:
   ```bash
   npm install express-rate-limit
   ```

   **Usage**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   app.use(limiter);
   ```

3. **Implementing CORS**:

   **Installation**:
   ```bash
   npm install cors
   ```

   **Usage**:
   ```javascript
   const cors = require('cors');
   app.use(cors({
     origin: 'https://your-frontend-domain.com' // allow only your frontend
   }));
   ```

---

## Day 2: Testing Express.js APIs

### Importance of Testing

Testing is essential for ensuring that your API works as intended and is free from bugs. It helps catch issues early in the development cycle.

### Types of Tests

1. **Unit Tests**: Test individual components or functions in isolation.
2. **Integration Tests**: Test how different components interact with each other.
3. **End-to-End Tests**: Test the entire application flow, simulating user interactions.

### Testing Libraries

1. **Mocha**: A JavaScript test framework.
2. **Chai**: An assertion library for Node.js.
3. **Supertest**: A library for testing HTTP requests.

### Setting Up Testing Environment

1. **Install Dependencies**:
   ```bash
   npm install mocha chai supertest --save-dev
   ```

2. **Create a Test Directory**:
   Create a folder named `test` in your project root.

### Writing Tests

1. **Example Test File**: Create a file named `user.test.js` in the `test` directory.

```javascript
const request = require('supertest');
const app = require('../server'); // Import your Express app

describe('User API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'test123'
      });
    expect(res.status).to.equal(201);
    expect(res.text).to.equal('User registered');
  });

  it('should log in an existing user', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'test123'
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
```

### Running Tests

Run your tests using the following command:

```bash
npx mocha test/*.test.js
```

---

## Day 3: Documentation with Swagger

### Importance of API Documentation

Well-documented APIs make it easier for developers to understand and use your API, leading to a better developer experience.

### Setting Up Swagger

1. **Install Swagger UI Express**:
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

2. **Create Swagger Specification**:

   Create a file named `swagger.js` to define your Swagger documentation.

```javascript
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API Information',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
```

3. **Set Up Swagger in Your Express App**:

```javascript
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

### Writing API Documentation

Add comments to your route handlers in your route files:

```javascript
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', (req, res) => {
  // Your code here
});
```

Now, navigate to `http://localhost:3000/api-docs` to view your API documentation.

---

## Day 4: Deployment Basics

### Preparing Your App for Deployment

1. **Environment Variables**: Use environment variables to store sensitive information like API keys and database URLs. Use the `dotenv` package to load environment variables from a `.env` file.

   **Installation**:
   ```bash
   npm install dotenv
   ```

   **Usage**:
   Create a `.env` file in your root directory:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/myapp
   ```

   Load variables in your `server.js`:
   ```javascript
   require('dotenv').config();
   const PORT = process.env.PORT || 3000;
   ```

2. **Production Build**: Ensure your app is optimized for production. Minify code, set NODE_ENV to production, and remove any unnecessary files.

### Choosing a Hosting Provider

1. **Heroku**: Easy to use and supports Node.js apps.
2. **DigitalOcean**: Offers virtual private servers for more control.
3. **Render**: Good for static sites and Node.js applications.

### Deploying to Heroku

1. **Install the Heroku CLI** and log in:

   ```bash
   heroku login
   ```

2. **Create a new Heroku app**:

   ```bash
   heroku create your-app-name
   ```

3. **Push your code to Heroku**:

   ```bash
   git push heroku main
   ```

4. **Set environment variables**:

   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   ```

5. **Open your app**:

   ```bash
   heroku open
   ```

---

## Day 5: Continuous Integration and Deployment (CI/CD)

### What is CI/CD?

Continuous Integration (CI) and Continuous Deployment (CD) are practices that automate the process of software development and delivery. They help ensure that code changes are tested and deployed smoothly.

### Setting Up CI/CD with GitHub Actions

1. **Create a `.github/workflows` Directory**: This is where your workflow files will live.

2. **Create a Workflow File**: Create a file named `ci.yml` in `.github/workflows`.

```yaml
name: CI

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'

      - name: Install Dependencies
        run: npm install

      - name: Run Tests
        run: npm test
```

### Automating Deployment

You can also automate deployment to Heroku or any other service using GitHub Actions.

**Example of Deployment to Heroku**:

```yaml
deploy:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout Code
      uses: actions/checkout@v2

    - name: Heroku Deploy
      uses: akhileshns/heroku-deploy@v3.11.7
      with:
        heroku_app_name: your-app-name
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_email: your-email@example.com
```

1. Add your Heroku API key to GitHub Secrets under your repository settings.

---

This completes **Week 3** of the Express.js API development course. We covered security best practices, testing strategies, documentation with Swagger, deployment, and CI/CD. Let me know when you're ready to move on to **Week 4** or if you need further details on any specific topic!