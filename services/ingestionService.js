import crypto from "crypto";

import { embedDocuments } from "./embeddingService.js";
import { loadPDF } from "./pdfLoader.js";
import { splitDocuments } from "./textSplitter.js";
import { storeVectors } from "./pineconeService.js"
export async function ingestDocument(path){
    // generating a random id for this document 
    const documentId = crypto.randomUUID();

    const documents = await loadPDF(path);

    console.log("Loaded Pages:", documents.length);
    
    const chunks = await splitDocuments(documents);
    console.log("No. of chunks" , chunks.length);
    //console.log(chunks);
    // return chunks ;
    
    

    const vectors = await embedDocuments(chunks);
    console.log("Number of vectors:", vectors.length);
    console.log("Dimensions:", vectors[0].length);


    await storeVectors(chunks ,vectors ,documentId);
    const stats = {
    documentId: documentId,    
    pages: documents.length,
    chunks: chunks.length,
    vectors: vectors.length,
    };

return stats;
    
    
}