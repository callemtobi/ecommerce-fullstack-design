import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {type: String, unique: true, required: true},
        product: [{
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }]
    },
    {
        timestamps: true
    }
)

const Cart = new mongoose.model('Cart', cartSchema);

export default Cart;