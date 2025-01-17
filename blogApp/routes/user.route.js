import { Router } from "express";
import { User } from "../models/user.model.js";
import { matchPasswordAndGenerateToken } from "../models/user.model.js"


const router = Router()

router.get("/signin", (req, res) => {
    return res.render("signin")
})

router.get("/signup", (req, res) => {
    return res.render("signup")
})

router.post("/signin", async (req, res) => {
    const { email, password } = req.body

    const user = await User.matchPasswordAndGenerateToken(email, password)

    console.log("User : ", user)
    return res.redirect("/")
})

router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body
    await User.create({
        fullName,
        email,
        password
    })
    return res.redirect("/")
})

export { router }