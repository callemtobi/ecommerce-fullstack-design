import { Router } from "express";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from './tokenVerify.js';
import Product from "../models/Product.js";

const router = Router();

// CREATE
router.post('/add', verifyTokenAndAdmin, async (req, res) => {
    const { name, price, description, category, stock } = req.body;
    const newProduct = new Product({
        name, price, description, category, stock
    })
    try {
        const createProduct = await newProduct.save();
        return res.status(200).json(createProduct); 
    } catch (err) {return res.status(400).json(err) }
})

// GET
router.get('/find/:id', verifyToken, async (req, res) => {
    try {
        const getProduct = await Product.findById(req.params.id);
        return res.status(200).json(getProduct);
    } catch (err) {
        return res.status(400).json(err)
    }
})
// Get All Products
router.get('/find', verifyToken, async (req, res) => {
    const query = req.query.category;
    try {
        const getProducts = query? await Product.find({category: {$in: [query]}}) : await Product.find();
        return res.status(200).json(getProducts);
    } catch (err) {
        return res.status(400).json(err)
    }
})
// Update
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})
// Delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {return res.status(400).json('Product not found')}
        else {return res.status(200).json('Product deleted!');}
    } catch (err) {
        return res.status(400).json(err)
    }
})


export default router;