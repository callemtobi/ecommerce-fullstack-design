import { Router } from "express";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from './tokenVerify.js';
import User from "../models/User.js";

const router = Router();

// Get
router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    } catch (err) {
        res.status(500).json(err)
    }
})
// Update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PHRASE).toString();
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).json(err)
    }
})
// Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User deleted!');
    } catch (err) {
        res.status(500).json(err)
    }
})
// Get All Users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    // Query in the URL
    const query = req.query.new;
    try {
        // If theres a 'new' query, then limit and sort the users displayed to 1, else...
        const getUser = query? await User.find().sort({_id: -1}).limit(1) : await User.find();
        res.status(200).json(getUser);
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router;