import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import userRoutes from "./src/routes/urlRoutes.js";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message: "Too many requests, please try again later!",
  },
  standardHeaders: true,
  legacyHeaders: true,
});

// Middleware Configuration
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(limiter);
app.use("/", userRoutes);

const PORT = process.env.PORT || 5000;

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
