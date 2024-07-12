import { User } from "../models/user.model.js"; // Importing the User model from the user.model.js file
import { setUser } from "../service/auth.js"; // Importing the setUser function from the auth.js file

// Function to handle user signup
async function handleUserSignup(req, res) {
    const { name, email, role, password } = req.body; // Destructuring name, email, role, and password from the request body
    await User.create({
        name,
        email,
        role,
        password
    }); // Creating a new user in the database with the provided details
    return res.render("home"); // Rendering the home view
}

// Function to handle user login
async function handleUserLogin(req, res) {
    const { email, password } = req.body; // Destructuring email and password from the request body
    const user = await User.findOne({ email, password }); // Finding a user in the database with the provided email and password
    if (!user) return res.render("login", { error: "Invalid email or username" }); // If user is not found, render the login view with an error message
    
    // Generating token
    const token = setUser(user); // Creating a JWT token for the user
    res.cookie("token", token); // Setting the token in the cookies
    return res.redirect("/"); // Redirecting to the home page
}

export {
    handleUserSignup,
    handleUserLogin
}; // Exporting the handleUserSignup and handleUserLogin functions
