import { Router } from "express";
import { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } from './tokenVerify.js';
import Cart from "../models/Cart.js";
import axios from "axios";

const router = Router()

// Main page
router.get("/home", (req, res) => {
    axios.get('http://localhost/auth/login')
    .then(response => console.log(response.data.headers))
    .catch(err => console.log(err));

    res.render('main');
});

export default router;