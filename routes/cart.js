import { Router } from "express";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from './tokenVerify.js';
import Cart from "../models/Cart.js";

const router = Router();

// CREATE
router.post('/add', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const createCart = await newCart.save();
        return res.status(200).json(createCart); 
    } catch (err) {return res.status(400).json(err) }
})

// GET
router.get('/:userId', verifyToken, async (req, res) => {
    try {
        const getCart = await Cart.findOne({userId: req.params.userId});
        return res.status(200).json(getCart);
    } catch (err) {
        return res.status(400).json(err)
    }
})
// Get All Carts
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const getCarts = await Cart.find();
        return res.status(200).json(getCarts);
    } catch (err) {
        return res.status(400).json(err)
    }
})
// Update
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateCart)
    } catch (err) {
        res.status(500).json(err)
    }
})
// Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteCart = await Cart.findByIdAndDelete(req.params.id);
        if (!deleteCart) {return res.status(400).json('Cart not found')}
        else {return res.status(200).json('Cart deleted!');}
    } catch (err) {
        return res.status(400).json(err)
    }
})


export default router;