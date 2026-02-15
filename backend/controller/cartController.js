import userModel from "../models/UserModel.js"

// add item to uercart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.body.itemId;
        if (!itemId) {
            return res.status(400).json({ success: false, message: "Item ID is required" });
        }
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// remove item from usercart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.body.itemId;
        let userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Removed from cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const cartData = await userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};
export { addToCart, removeFromCart, getCart }