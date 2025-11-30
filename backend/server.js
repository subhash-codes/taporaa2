import  express  from "express";
import cors from "cors"
import { connectDB } from "./Config/db.js";
import serviceRouter from "./Routes/serviceRout.js";


import 'dotenv/config'
// import cartRouter from "./Routes/cartRout.js";
// import orderRouter from "./Routes/orderRoute.js";

// app config

const app = express()
const port = process.env.PORT || 4000

// middlewear

app.use(express.json())
app.use(cors())

// db connection

connectDB();

// API endpoint
app.use("/api/services", serviceRouter)
app.use("/images", express.static('uploads'));



app.get("/", (req, res)=>{
res.send("API Working..DB Started")

})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})



