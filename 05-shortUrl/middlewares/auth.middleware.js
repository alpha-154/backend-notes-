import { getUser } from "../service/auth.js"; // Importing the getUser function from the auth.js file

// Middleware to check for authentication
function checkForAuthentication(req, res, next) {
    const tokenCookie = req.cookies?.token; // Extracting the token from the cookies
    req.user = null; // Initializing req.user to null

    if (!tokenCookie) return next(); // If no token is present, proceed to the next middleware
    
    const token = tokenCookie; // Storing the token in a variable
    const user = getUser(token); // Verifying the token and getting the user information
    
    req.user = user; // Attaching the user information to req.user
    return next(); // Proceeding to the next middleware
}

// Middleware to restrict access based on roles
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login"); // If user is not authenticated, redirect to login
        
        if (!roles.includes(req.user.role)) return res.end("UnAuthorized"); // If user role is not authorized, end the response with "UnAuthorized"

        return next(); // Proceeding to the next middleware
    };
}

export { checkForAuthentication, restrictTo }; // Exporting the checkForAuthentication and restrictTo functions
