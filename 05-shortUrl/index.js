import express from "express"; // Importing the express framework
import cookieParser from "cookie-parser"; // Importing the cookie-parser middleware
import path from 'path'; // Importing the path module
import { router as urlRoute } from "./routes/url.routes.js"; // Importing the router from url.routes.js
import { router as staticRoute } from "./routes/staticRouter.js"; // Importing the router from staticRouter.js
import { router as userRoute } from "./routes/user.routes.js"; // Importing the router from user.routes.js
import { connectToMongoDB } from "./database/connection.js"; // Importing the MongoDB connection function
import { URL } from "./models/url.model.js"; // Importing the URL model
import { checkForAuthentication, restrictTo } from "./middlewares/auth.middleware.js"; // Importing the authentication middleware

const app = express(); // Creating an express app
const PORT = 8001; // Setting the port number

// Connecting to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Database is connected!!!")) // Logging success message
  .catch(() => console.log("Database connection failed")); // Logging failure message

// Setting the view engine to EJS
app.set('view engine', 'ejs'); 

// Setting the directory where the view files are located
app.set('views', path.resolve("./views")); 

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded requests
app.use(cookieParser()); // Middleware to parse cookies
app.use(checkForAuthentication); // Middleware to check for authentication on every request

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute); // Using the URL router for routes starting with /url, restricted to NORMAL and ADMIN roles
app.use("/user", userRoute); // Using the user router for routes starting with /user
app.use("/", staticRoute); // Using the static router for the root route

// Route to handle redirection using shortId
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId; // Extracting shortId from request params

  // Finding the URL entry and updating visit history
  const entry = await URL.findOneAndUpdate(
    { shortId }, // Query to find the document
    { $push: { visitHistory: { timestamp: Date.now() } } } // Update to push current timestamp to visitHistory
  );
  res.redirect(entry.redirectUrl); // Redirecting to the original URL
});

// Starting the server
app.listen(PORT, () => console.log(`Server is started at PORT: ${PORT}`)); // Listening for incoming requests on the specified port
