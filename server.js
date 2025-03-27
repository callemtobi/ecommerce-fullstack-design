import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

// Routes
import Auth from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import cartRoute from "./routes/cart.js";
import mainRoute from "./routes/main.js";
// Models
import Product from "./models/Product.js";
import User from "./models/User.js";
import Order from "./models/Order.js";
import Cart from "./models/Cart.js";

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

app.use("/", mainRoute);
app.use("/user", userRoute);
app.use("/auth", Auth);
app.use("/products", productRoute);
app.use("/orders", orderRoute);
app.use("/carts", cartRoute);

// ----------------------------------- Port
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
