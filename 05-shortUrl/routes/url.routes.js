import express from "express" // Importing express
import {
    handleGenerateNewShortUrl,
    handleGetAnalytics
} from "../controllers/url.controllers.js" // Importing the controllers

const router = express.Router() // Creating a router

router.post("/", handleGenerateNewShortUrl) // Route to generate a new short URL

router.get("/analytics/:shortId", handleGetAnalytics) // Route to get analytics for a short URL

export { router } // Exporting the router
