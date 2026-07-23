// Store embeddings and later search them

import { Index, Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pc.index("docsense");

export async function storeVectors(chunks, vectors) {
    
    const records = chunks.map((chunk, index) => ({

        id: `chunk-${index}`,

        values: vectors[index],

        metadata: {

            text: chunk.pageContent,

            source: chunk.metadata.source,

            page: chunk.metadata.loc?.pageNumber ?? -1
        }

    }));
    //console.log(records[0]); // to see how records are being scored in pinecone

    // Upload comes next
    await index.upsert({
        records: records
    });
    console.log("Vectors Uploaded successfully!");   
}

// this takes user questio vector and help do semantic search in pinecone db
export async function searchVectors(queryEmbedding) {
    
    const results = await index.query({
        vector: queryEmbedding,
        topK: 3,
        includeValues: false,
        includeMetadata: true,
    });

    return results.matches.map(match => ({
    text: match.metadata.text,
    page: match.metadata.page,
    source: match.metadata.source,
    score: match.score
    }));
}

