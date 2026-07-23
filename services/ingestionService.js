import { embedDocuments } from "./embeddingService.js";
import { loadPDF } from "./pdfLoader.js";
import { splitDocuments } from "./textSplitter.js";
import { storeVectors } from "./vectorStore.js"
export async function ingestDocument(path){

    const documents = await loadPDF(path);

    console.log("Loaded Pages:", documents.length);
    
    const chunks = await splitDocuments(documents);
    console.log("No. of chunks" , chunks.length);
    //console.log(chunks);
    // return chunks ;
    
    

    const vectors = await embedDocuments(chunks);
    console.log("Number of vectors:", vectors.length);
    console.log("Dimensions:", vectors[0].length);


    await storeVectors(chunks ,vectors);
    
    
}