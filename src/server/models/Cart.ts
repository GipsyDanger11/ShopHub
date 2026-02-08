import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    items: [cartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
