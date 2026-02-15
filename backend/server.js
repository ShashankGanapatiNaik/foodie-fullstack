import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import UserRouter from "./routes/UserRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// app config
const app = express()
const port = 4000
// middleware
app.use(express.json())
app.use(cors())
// DB connection
connectDB();


// api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"));
app.use("/api/user", UserRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API working")
})
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})
// mongodb+srv://shashanknaik6226_db_user:Shashank2005@cluster0.qidyrye.mongodb.net/?