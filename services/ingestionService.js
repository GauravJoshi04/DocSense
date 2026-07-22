import { loadPDF } from "./pdfLoader.js";


export async function ingestDocument(path){

    const docs = await loadPDF(path);

    console.log("Loaded documents:", docs.length);

    return docs;
}