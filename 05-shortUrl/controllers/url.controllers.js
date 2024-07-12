import { nanoid } from "nanoid"; // Importing nanoid to generate unique IDs
import { URL } from "../models/url.model.js"; // Importing the URL model

// Controller to handle generating a new short URL
async function handleGenerateNewShortUrl(req, res) {
    const body = req.body // Getting the request body
    if (!body.url) return res.status(400).json({ error: "URL is required" }) // Validating if URL is provided

    const shortID = nanoid(8) // Generating a unique short ID
    // Creating a new URL entry in the database
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    })
    //for the rendering purpose
    return res.render("home", {
        id: shortID
    })
   // return res.json({ id: shortID }) // Returning the short ID
}

// Controller to handle fetching analytics for a short URL
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId // Getting the shortId from request params
    const data = await URL.findOne({ shortId }) // Fetching the URL entry from the database

    // Returning the analytics data
    return res.json({
        totalClicks: data.visitHistory.length,
        analytics: data.visitHistory,
    })
}

export {
    handleGenerateNewShortUrl,
    handleGetAnalytics
}
