import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://shashanknaik6226_db_user:Shashank2005@cluster0.qidyrye.mongodb.net/food-del').then((() => console.log("DB connected")));
}