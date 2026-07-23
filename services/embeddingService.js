// Converts Chunks into Embeddings

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai' ;
const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GEMINI_API_KEY

    });

export async function embedDocuments(chunks) {
    const texts = chunks.map(chunk => chunk.pageContent);
    

    const vectors = await embeddings.embedDocuments(texts);
    
    return vectors ;
}

export async function embedQuery(question) {
    return embeddings.embedQuery(question);
}