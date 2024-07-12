import mongoose from "mongoose"; // Importing mongoose

// Function to connect to MongoDB
async function connectToMongoDB(url) {
    return mongoose.connect(url) // Connecting to the provided MongoDB URL
}

export { connectToMongoDB } // Exporting the connection function
