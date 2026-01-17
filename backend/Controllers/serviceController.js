import serviceModel from "../Models/serviceModel.js"
import fs from 'fs'

// add List item
const addService = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const service = new serviceModel({
        name: req.body.name,
        description: req.body.description,
        image: image_filename
    })
    try {
        await service.save();
        res.json({ success: true, message: "Service Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// all Service list

const listService = async (req, res) => {
    try {
        const services = await serviceModel.find({});
        res.json({ success: true, data: services })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// remove service item (updated to use URL param)
const removeService = async (req, res) => {
    try {
        const id = req.params.id;

        const service = await serviceModel.findById(id);
        if (!service) {
            return res.json({ success: false, message: "Service not found" });
        }

        // delete image file
        fs.unlink(`Uploades/${service.image}`, () => { 
             if (err) console.log("Image delete error:", err);
        });

        // delete from DB
        await serviceModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Service Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const updateService = async (req, res) => {
    try {
        const { id, name, description } = req.body;

        // Find existing service
        const service = await serviceModel.findById(id);
        if (!service) {
            return res.json({ success: false, message: "Service not found" });
        }

        // If new image uploaded → delete old image
        if (req.file) {
            if (service.image) {
                fs.unlink(`Uploades/${service.image}`, (err) => {
                    if (err) console.log("Image delete error:", err);
                });
            }
            service.image = req.file.filename; // update image
        }

        // Update name + description
        service.name = name;
        service.description = description;

        await service.save();

        res.json({ success: true, message: "Service updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating service" });
    }
};


export { addService, listService, removeService, updateService };