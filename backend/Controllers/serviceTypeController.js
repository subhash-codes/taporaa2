import serviceTypeModel from "../Models/serviceTypeModel.js";


// Endpoint: POST /api/service/add

const addServiceType = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.json({ success: false, message: "ServiceType is required." });
        }

        const newServiceType = new serviceTypeModel({ name });
        await newServiceType.save();

        res.json({ success: true, message: "Service type added successfully" });
    } catch (error) {
        // Handle duplicate key error (if name is already in use)
        if (error.code === 11000) {
            return res.json({ success: false, message: "This service type already exists." });
        }
        console.log("Error adding service:", error);
        res.json({ success: false, message: "Error adding service type" });
    }
};


// Endpoint: GET /api/service/list

const listServiceType = async (req, res) => {
    try {
        // Fetch all documents, sorted by name
        const serviceType = await serviceTypeModel.find({}).sort({ name: 1 });
        res.json({ success: true, data: serviceType });
    } catch (error) {
        console.log("Error listing services:", error);
        res.json({ success: false, message: "Error listing service types" });
    }
};

// Endpoint: POST /api/service/remove/:id

const removeServiceType = async (req, res) => {
    try {
        const id = req.params.id;

        // Use findByIdAndDelete to remove the document
        const result = await serviceTypeModel.findByIdAndDelete(id);

        if (!result) {
            return res.json({ success: false, message: "Service type not found" });
        }

        res.json({ success: true, message: "Service type removed successfully" });
    } catch (error) {
        console.log("Error removing service:", error);
        res.json({ success: false, message: "Error removing service type" });
    }
};

export { addServiceType, listServiceType, removeServiceType };