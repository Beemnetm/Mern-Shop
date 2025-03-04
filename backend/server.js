import express from "express";
import Product from "./models/product.model.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();
app.use(express.json());

// MongoDB connection before starting the server
connectDB();

// Product creation route
app.post("/api/products", async (req, res) => {
    const product = req.body;

    // Validation check
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    // Create new product instance
    const newProduct = new Product(product);

    try {
        // Save new product to database
        await newProduct.save();
        // Send response on successful creation
        res.status(201).json({ success: true, message: "Product created", product: newProduct });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
