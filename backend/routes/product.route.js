import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { createProducts, deleteProducts, getProducts, updatedProduct } from "../controllers/product.controller.js";
const router = express.Router();


router.get("/", getProducts);

router.post("/", createProducts);

router.put("/:id", updatedProduct);

router.delete("/:id", deleteProducts);

export default router;