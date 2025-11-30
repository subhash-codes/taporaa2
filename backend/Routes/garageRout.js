import express from "express";
import { addGarage, updateGarage, nearestGarages, removeGarage, listGarage } from "../Controllers/garageController.js";
import multer from "multer";

const garageRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "Uploades",
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`)
});
const upload = multer({ storage });

// --- API Endpoints ---
garageRouter.post("/addgarage", upload.single("image"), addGarage);
garageRouter.post("/updategarage", upload.single("image"), updateGarage);
garageRouter.get("/listgarage", listGarage);
garageRouter.post("/removegarage/:id", removeGarage);
garageRouter.post("/nearestgarages", nearestGarages);


export default garageRouter;
