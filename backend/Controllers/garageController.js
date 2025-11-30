import garageModel from "../Models/garageModel.js";
import fs from "fs";
import axios from "axios";

// Replace YOUR_GOOGLE_API_KEY with your key if using Google Maps
const GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json";

async function getCoordinatesFromAddress(address) {
    try {
        const response = await axios.get(GEOCODE_API, {
            params: {
                address,
                key: process.env.GOOGLE_API_KEY
            }
        });
        const result = response.data.results[0];
        if (result) {
            const { lat, lng } = result.geometry.location;
            return [lng, lat]; // GeoJSON uses [longitude, latitude]
        }
        return [0, 0];
    } catch (error) {
        console.log("Geocoding error:", error);
        return [0, 0];
    }
}

// Add Garage
const addGarage = async (req, res) => {
    try {
        const { name, description, address } = req.body;
        const image_filename = req.file.filename;

        // Convert address → coordinates
        const coordinates = await getCoordinatesFromAddress(address);

        const garage = new garageModel({
            name,
            description,
            image: image_filename,
            address,
            location: { type: "Point", coordinates }
        });

        await garage.save();
        res.json({ success: true, message: "Garage added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding garage" });
    }
};

// Update Garage
const updateGarage = async (req, res) => {
    try {
        const { id, name, description, address } = req.body;
        const garage = await garageModel.findById(id);
        if (!garage) return res.json({ success: false, message: "Garage not found" });

        if (req.file) {
            if (garage.image) {
                fs.unlink(`Uploades/${garage.image}`, (err) => {
                    if (err) console.log("Image delete error:", err);
                });
            }
            garage.image = req.file.filename;
        }

        garage.name = name;
        garage.description = description;
        garage.address = address;
        garage.location.coordinates = await getCoordinatesFromAddress(address);

        await garage.save();
        res.json({ success: true, message: "Garage updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating garage" });
    }
};

const listGarage = async (req, res) => {
    try {
        const garages = await garageModel.find({});
        res.json({ success: true, data: garages });
    } catch (error) {
        console.log("Error listing garages:", error);
        res.json({ success: false, message: "Error listing garages" });
    }
};

const removeGarage = async (req, res) => {
    try {
        const id = req.params.id;

        const garage = await garageModel.findById(id);
        if (!garage) {
            return res.json({ success: false, message: "Garage not found" });
        }

        // delete image file
        fs.unlink(`Uploades/${garage.image}`, () => { 
             if (err) console.log("Image delete error:", err);
        });

        // delete from DB
        await garageModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Garage Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


const nearestGarages = async (req, res) => {
    try {
        const { userAddress, maxDistance = 5000 } = req.body;
        const [lng, lat] = await getCoordinatesFromAddress(userAddress);

        const garages = await garageModel.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [lng, lat] },
                    $maxDistance: parseInt(maxDistance)
                }
            }
        });

        res.json({ success: true, data: garages });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching nearest garages" });
    }
};

export { addGarage, updateGarage, nearestGarages, removeGarage, listGarage };