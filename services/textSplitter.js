// Breakdown document into chunks

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function splitDocuments(doc){
    const splitter = new RecursiveCharacterTextSplitter({ 
    chunkSize: 500, 
    chunkOverlap: 100 
    })
    const chunks =  await splitter.splitDocuments(doc);
    return chunks ;
}

