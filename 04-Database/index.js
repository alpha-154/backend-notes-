import express from "express";
import { router as userRouter } from "./routes/user.route.js";
import { connectMongoDB } from "./connection.js";
import { logReqRes } from "./middlwares/index.middleware.js";

const app = express();
const PORT = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/youtube-1")
  .then(() => console.log("MongoDB is connected"))
  .catch(() => console.log("MongoDB connection failed"));

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Custom middleware to log requests
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
