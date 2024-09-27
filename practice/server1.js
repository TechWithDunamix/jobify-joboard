import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded())


app.get("/:id",(req,res) => {
    console.log(req.params.id)
    res.status(200).json([{"name":"Calista","id":req.params.id}])
})

app.post("/new_user",(req,res) => {
    const newUser = req.body 
    res.status(201).json(newUser)
})

app.listen(5600,() => {
    console.log("server is running")
})