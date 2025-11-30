import express from "express";
import { addServiceType, listServiceType, removeServiceType } from "../Controllers/serviceTypeController.js";

const serviceTypeRouter = express.Router();

// Route to add a new service type
serviceTypeRouter.post("/addServiceType", addServiceType);

// Route to get a list of all service types
serviceTypeRouter.get("/listServiceType", listServiceType);

// Route to remove a service type by ID (using POST for simplicity, but could be DELETE)
serviceTypeRouter.post("/removeServiceType/:id", removeServiceType);

export default serviceTypeRouter;