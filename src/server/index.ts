import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { Product } from "./models/Product";
import { Cart } from "./models/Cart";
import { Order } from "./models/Order";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes

// GET /api/products
app.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== "All") {
            query = { category };
        }
        const products = await Product.find(query);
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// GET /api/products/:id
app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            res.status(404).json({ success: false, error: "Product not found" });
            return;
        }
        res.json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// GET /api/cart/:sessionId
app.get("/api/cart/:sessionId", async (req, res) => {
    try {
        let cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            cart = await Cart.create({ sessionId: req.params.sessionId, items: [] });
        }
        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// POST /api/cart/:sessionId/items
app.post("/api/cart/:sessionId/items", async (req, res) => {
    try {
        const { sessionId } = req.params;
        const item = req.body;

        let cart = await Cart.findOne({ sessionId });

        if (!cart) {
            cart = await Cart.create({ sessionId, items: [item] });
        } else {
            const existingItemIndex = cart.items.findIndex((i) => i.id === item.id);

            if (existingItemIndex > -1) {
                cart.items[existingItemIndex].quantity += item.quantity;
            } else {
                cart.items.push(item);
            }
            await cart.save();
        }

        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// PUT /api/cart/:sessionId/items/:productId
app.put("/api/cart/:sessionId/items/:productId", async (req, res) => {
    try {
        const { sessionId, productId } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            res.status(404).json({ success: false, error: "Cart not found" });
            return;
        }

        const itemIndex = cart.items.findIndex((i) => i.id === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.json({ success: true, data: cart });
        } else {
            res.status(404).json({ success: false, error: "Item not found in cart" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// DELETE /api/cart/:sessionId/items/:productId
app.delete("/api/cart/:sessionId/items/:productId", async (req, res) => {
    try {
        const { sessionId, productId } = req.params;

        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            res.status(404).json({ success: false, error: "Cart not found" });
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cart.items = cart.items.filter((i) => i.id !== productId) as any;
        await cart.save();

        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

// POST /api/orders
app.post("/api/orders", async (req, res) => {
    try {
        const { sessionId } = req.body;

        const cart = await Cart.findOne({ sessionId });
        if (!cart || cart.items.length === 0) {
            res.status(400).json({ success: false, error: "Cart is empty" });
            return;
        }

        const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const order = await Order.create({
            sessionId,
            items: cart.items,
            totalAmount,
            status: "pending"
        });

        // Clear cart
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cart.items = [] as any;
        await cart.save();

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
