// backend/Models/serviceModel.js

import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}  ,
    image: {type: String, required: true}, 
});

const serviceModel = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default serviceModel;