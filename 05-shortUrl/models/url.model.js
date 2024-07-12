import mongoose from "mongoose"; // Importing mongoose

// Defining the URL schema
const urlSchema = mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }], // Array of timestamps for visit history
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }

}, { timestamps: true }) // Adding createdAt and updatedAt fields

const URL = mongoose.model("URL", urlSchema) // Creating the URL model

export { URL } // Exporting the URL model
