import express from "express"
import path from "path"
import mongoose from "mongoose"
import { router as userRoute } from "./routes/user.route.js"


const app = express()
const PORT = 8000

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(() => console.log("MongoDB is connected"))
.catch( () => console.error("MongoDB connection failed"))

app.use(express.urlencoded({ extended: false}))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home")
})

app.use("/user", userRoute)

app.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`))