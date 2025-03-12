import express from 'express';
import mongoose from 'mongoose';
import Product from './public/javascripts/db_schema.js';

const app = express();
const PORT = process.env.PORT || 8000;

// ----------------------------------- Middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs');

// ----------------------------------- Database
mongoose.connect('mongodb://localhost:27017/products');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('-----> Database connected');
});
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


// ----------------------------------- Routes
app.post('/', async (req, res) => {
    const { title, reviews, price, company, category, color } = req.body;

    const newProduct = new Product({ title, reviews, price, company, category, color });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// ----------------------------------- Port
app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
})