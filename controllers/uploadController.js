import { ingestDocument } from "../services/ingestionService.js" ;

export const uploadDocument = async(req , res)=>{
    try{
        // check if user uploaded file or not !
        if (!req.file) {
        return res.status(400).json({
        success: false,
        message: "No PDF uploaded."
        });
        }
        // file Path is from the uploaded file user has given through multer middleware
        const filePath = req.file.path ;  // from req.file property after multer is worked
        

       
    //     return res.json({
    //         success: true,
    //         message: "File uploaded successfully",
    //         file: {
    //                 originalName: req.file.originalname,
    //                 savedAs: req.file.filename,
    //                 path: req.file.path,
    //                 size: req.file.size,
    //                 mimeType: req.file.mimetype
    //     }
    //    });
         
       
    
        const stats =  await ingestDocument(filePath) ;

        res.json({
            success: true,
            message: "Document ingested successfully",
            fileName: req.file.originalname,
            stats: stats
    });
    } catch (err){
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Upload failed!"
        });
    }
}