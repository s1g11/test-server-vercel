import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.send("server is running")
})

app.get("/hello", (req, res) => {
    res.send("Hello world!")
})

app.listen(5000, () => console.log("Server started on PORT 5000"))