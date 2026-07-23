// Store embeddings and later search them

import { Pinecone } from "@pinecone-database/pinecone";


export async function storeVectors(chunks, vectors) {
    
    const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pc.index("docsense");
    const records = chunks.map((chunk, index) => ({

        id: `chunk-${index}`,

        values: vectors[index],

        metadata: {

            text: chunk.pageContent,

            source: chunk.metadata.source,

            page: chunk.metadata.loc?.pageNumber ?? -1
        }

    }));
    console.log(records[0]);
    // Upload comes next
    await index.upsert({
        records: records
    });
    console.log("Uploaded successfully!");

    
}