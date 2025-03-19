import express from "express";

import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import cors from 'cors';

// Load environment variables
dotenv.config();

// Allow all origins (for development)


// Initialize the Express app
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.use(cors());
// MongoDB connection before starting the server
connectDB();


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
