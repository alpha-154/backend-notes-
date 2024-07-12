import express from "express"

const app = express()

app.get("/", ( req, res) => {
    res.send("You're in the home page")
})

app.get("/about", ( req, res) => {
    res.send(`Hey ${req.query.name}`)
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`server is started at ${PORT}`))
    
