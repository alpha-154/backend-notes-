import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library
const secretKey = "johnDoe07@"; // Defining the secret key for signing the JWT

// Function to generate a JWT token
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secretKey); // Signing the token with the user information and secret key
}

// Function to verify the JWT token
function getUser(token) {
    if (!token) return null; // If no token is provided, return null
    try {
        return jwt.verify(token, secretKey); // Verifying the token with the secret key
    } catch (error) {
        return null; // If token verification fails, return null
    }
}

export { setUser, getUser }; // Exporting the setUser and getUser functions
