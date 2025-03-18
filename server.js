import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

// Routes
import userRoute from "./routes/user.js";
import Auth from "./routes/auth.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import orderRoute from "./routes/order.js";
// Models
import Product from "./models/Product.js";
import User from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 8000;

// ----------------------------------- Middleware
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

// ----------------------------------- Database
mongoose.connect("mongodb://localhost:27017/webstore");

mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
    console.log("-----> Database connected");
});

// ----------------------------------- Routes
app.get("/", (req, res) => {
    res.send("Welcome to Home");
});
app.use("/api/user", userRoute);
app.use("/api/user", Auth);
app.use("/api/products", productRoute);

// app.get('/main', (req, res) => {
//     Product.find()
//     .then(data => { console.log(data)})
//     .catch(err => {console.log('error:' + err)})
// })
// app.post('/', async (req, res) => {
//     const { title, reviews, price, company, category, color } = req.body;

//     const newProduct = new Product({ title, reviews, price, company, category, color });

//     try {
//         const savedProduct = await newProduct.save();
//         res.status(201).json(savedProduct);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// })

// ----------------------------------- Port
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
