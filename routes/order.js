import { Router } from "express";
import {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from "./tokenVerify.js";
import Order from "../models/Order.js";

const router = Router();

// CREATE
router.post("/add", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const createOrder = await newOrder.save();
        return res.status(200).json(createOrder);
    } catch (err) {
        return res.status(400).json(err);
    }
});

// GET User Order
router.get("/:id", verifyToken, async (req, res) => {
    try {
        const getOrder = await Order.findOne({ _id: req.params.id });
        return res.status(200).json(getOrder);
    } catch (err) {
        return res.status(400).json(err);
    }
});
// Get All Orders
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const getOrders = await Order.find();
        return res.status(200).json(getOrders);
    } catch (err) {
        return res.status(400).json(err);
    }
});
// Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deleteOrder) {
            return res.status(400).json("Order not found");
        } else {
            return res.status(200).json("Order deleted!");
        }
    } catch (err) {
        return res.status(400).json(err);
    }
});
// Monthly Income
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
        new Date().setMonth(lastMonth.getMonth() - 1)
    );

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
            { $group: { _id: "$month", total: { $sum: "sales" } } },
        ]);
        return res.status(200).json(income);
    } catch (err) {
        return res.status(400).json(err);
    }
});

export default router;
