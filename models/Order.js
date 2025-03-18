import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
   {
      userId: { type: String, unique: true, required: true },
      product: [
         {
            productId: { type: String },
            quantity: { type: Number, default: 1 },
         },
      ],
      amount: { type: Number, required: true },
      address: { type: Object, required: true },
      status: { type: String, default: "pending" },
   },
   {
      timestamps: true,
   }
);

const Order = new mongoose.model("Order", orderSchema);

export default Order;
