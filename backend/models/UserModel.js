import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name: { type: String, requirde: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minmize: false })
const UserModel = mongoose.models.user || mongoose.model("user", userSchema)
export default UserModel