import "dotenv/config";


import express from "express";

import { ingestDocument } from "./services/ingestionService.js";
import { retrieveDocuments } from "./services/retrievalService.js";
 
const app = express();
const Port = 3000;
app.use(express.json());
app.listen(Port, () => {
    console.log(`Server running on Port: ${Port}`);
});

const filePath = "./data/pdfs/cg-internal-docs.pdf" ;
await ingestDocument(filePath);

const result = await retrieveDocuments("All full-time employees are expected to work for how many hours");
console.log(JSON.stringify(result,null,2));