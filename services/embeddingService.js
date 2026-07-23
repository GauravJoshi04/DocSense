// Converts Chunks into Embeddings

import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai' ;


export async function embedDocuments(chunks) {
    const texts = chunks.map(chunk => chunk.pageContent);
    const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GEMINI_API_KEY

    });

    const vectors = await embeddings.embedDocuments(texts);

    return vectors ;
}