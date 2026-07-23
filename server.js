import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { ingestDocument } from "./services/ingestionService.js";


const app = express();
const Port = 3000;
app.use(express.json());
app.listen(Port, () => {
    console.log(`Server running on Port: ${Port}`);
});

const filePath = "./data/pdfs/cg-internal-docs.pdf" ;
await ingestDocument(filePath);

