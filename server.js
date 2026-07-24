import "dotenv/config";

import express from "express";

import { ingestDocument } from "./services/ingestionService.js";
import { retrieveDocuments } from "./services/retrievalService.js";
import { answerQuestion } from "./services/aiService.js";

import uploadRoute from "./routes/uploadRoute.js";
import chatRoute from "./routes/chatRoute.js"
const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
});

// when post we ingest document
app.use("/upload" , uploadRoute);

// when we want response to a question
app.use("/chat", chatRoute);

