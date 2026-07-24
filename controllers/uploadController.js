import { ingestDocument } from "../services/ingestionService" ;

export const uploadDocument = async(req , res)=>{
    try{
        // file
        const filePath = "./data/pdfs/cg-internal-docs.pdf";

        await ingestDocument(filePath) ;

        res.json({
            success: true,
            message: "Document Ingested Succesfully"
        });
    } catch (err){
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Upload failed!"
        });
    }
}