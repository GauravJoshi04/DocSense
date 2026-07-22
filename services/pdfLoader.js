// Step 1: Load the Document : Read pdf --> Return doc here

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function loadPDF(filePath) {

    const loader = new PDFLoader(filePath , {splitPages: true});

    const docs = await loader.load();

    return docs ;
}