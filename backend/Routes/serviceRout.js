// backend/Routes/serviceRoute.js

import express from "express";
import {addService, listService, removeService,updateService} from "../Controllers/serviceController.js";
import multer from "multer";

const serviceRouter = express.Router();

// Image storage engine

const storage = multer.diskStorage({
    destination:"Uploades",
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

// --- API Endpoints ---

serviceRouter.post("/addservice",upload.single("image"), addService);
serviceRouter.get("/listservice", listService);
serviceRouter.post("/removeservice/:id", removeService);
serviceRouter.post("/updateservice", upload.single("image"), updateService);


export default serviceRouter;