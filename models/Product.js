import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // Unique ID is generated automatically
    name: {type: String, unique: true},
    price: {type: Number, required: true},
    // img: { data: buffer, contentType: String, required: true },
    description: {type: String, required: true},
    category: {type: Array},
    stock: {type: String, required: true}
}, {
    timestamps: true
})

const Product = new mongoose.model('Product', productSchema);

export default Product; // ---> import {Product} from './js/schema'
// module.exports = Product;  // ---> import User from './js/schema'

// Products
// Product.insertMany([
//     {
//         title: 'Nike slippers',
//         reviews: 'Very comfortable',
//         price: 10.30,
//         company: 'Nike',
//         category: 'Shoes',
//         color: 'White'
//     },
//     {
//         title: 'Adidas jumbo',
//         reviews: 'Mesmirizing',
//         price: 20,
//         company: 'Adidas',
//         category: 'Shoes',
//         color: 'White-black'
//     }
// ])

// const newProduct = new product({
    // img: { data: req.file.buffer, contentType: req.file.mimetype },
    // title: 'Nike Shoes',
    // reviews: 'Very comfortable',
    // price: 10.30,
    // company: 'Nike',
    // category: 'Shoes',
    // color: 'White'
// })


// const newBlog = new blog({
//     img: { data: req.file.buffer, contentType: req.file.mimetype },
//     title: req.body.compose_title,
//     desc: req.body.compose_post,
//     Imgfilename: req.file.filename
// })