import {embedQuery} from "./embeddingService.js" ;
import { searchVectors } from "./pineconeService.js";

export async function retrieveDocuments(question){
    const queryEmbedding = await embedQuery(question);

    const results = await searchVectors(queryEmbedding);

    return results ;
}