import  express  from "express";
import cors from "cors"
import { connectDB } from "./Config/db.js";
import serviceRouter from "./Routes/serviceRout.js";
import garageRouter from "./Routes/garageRout.js";
import serviceTypeRouter from "./Routes/serviceTypeRoute.js";
import userRouter from "./Routes/userRoute.js";
import userModel from "./Models/userModel.js";


import 'dotenv/config'

// app config

const app = express()
const port = process.env.PORT || 4000

// middlewear

app.use(express.json())
app.use(cors())

// create admin account manually if not exists
const createAdmin = async () => {
    const adminExists = await userModel.findOne({ username: "admin" });
    if (!adminExists) {
        const newAdmin = new userModel({
            username: "admin",
            password: "taporaa@admin" // In production, use bcrypt.hash()
        });
        await newAdmin.save();
        console.log("Admin account created manually.");
    }
};

// db connection

connectDB();
createAdmin();

// API endpoint
app.use("/api/services", serviceRouter)
app.use("/api/garages",garageRouter)
app.use("/api/servicetypes", serviceTypeRouter);
app.use("/images", express.static('Uploades'));

// route for user login
app.use("/api/user", userRouter);



app.get("/", (req, res)=>{
res.send("API Working..DB Started")

})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})



