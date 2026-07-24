import express from "express" ;
import { uploadDocument } from '../controllers/uploadController.js' ;
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router() ;

router.post('/', upload.single("pdf") , uploadDocument);  // 1st function is our multer right now single pdf but can have array pdf later or even different fields

export default router ;