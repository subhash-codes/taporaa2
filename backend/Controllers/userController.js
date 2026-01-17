import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in MongoDB
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        // Check if password matches (Plain text check as per your current setup)
        if (user.password !== password) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Create a JWT token for the session
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret");
        
        res.json({ success: true, token });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Server Error" });
    }
};

export { loginUser };