import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });

    } catch (error) {
        console.log("error while fetching:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
};

export const createProducts = async (req, res) => {
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
};


export const updatedProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        // If no product is found, return 404
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Return success response
        res.status(200).json({ success: true, data: updatedProduct });

    } catch (error) {
        console.error("Error updating product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "product deleted" });

    } catch (error) {
        res.status(400).json({ success: false, message: "not found" });
    }
};