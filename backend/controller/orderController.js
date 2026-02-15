import orderModel from "../models/orderModel.js";
import userModel from '../models/UserModel.js';
import Stripe from "stripe"
import jwt from "jsonwebtoken";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Plcaing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"
    try {
        const token = req.headers.token;
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // this is the logged-in user's ID

        const newOrder = new orderModel({
            userId,          // now guaranteed to exist
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        const line_item = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity
        }))
        line_item.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })
        res.json({ success: true, session_url: session.url })
    } catch (error) {

        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// user order for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })

    }
}
export { placeOrder, verifyOrder, userOrders }