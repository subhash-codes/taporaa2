import mongoose from "mongoose";

// Define the schema for the Service Type
const serviceSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true // Service names should be unique
    }
});

// Create the Mongoose model
const serviceTypeModel = mongoose.models.ServiceType || mongoose.model("ServiceType", serviceSchema);

export default serviceTypeModel;