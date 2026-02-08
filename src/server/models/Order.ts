import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending"
    },
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
