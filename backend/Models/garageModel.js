import mongoose from "mongoose";

const garageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    address: { type: String, required: true }, // store full address
    location: {
        type: { type: String, default: "Point" }, 
        coordinates: { type: [Number], default: [0, 0] }, // optional, for geospatial queries if needed
    },
});

garageSchema.index({ location: "2dsphere" });

const garageModel = mongoose.models.Garage || mongoose.model("Garage", garageSchema);

export default garageModel;
