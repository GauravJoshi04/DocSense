import { retrieveDocuments } from "../services/retrievalService.js" ;
import { answerQuestion } from "../services/aiService.js" ;

export const chat = async (req ,res) => {
    try{
       const { question , documentId } = req.body ;
        if (!question) {
        return res.status(400).json({
        success: false,
        message: "Question is required."
        });
        }

        if (!documentId) {
             return res.status(400).json({
            success: false,
            message: "Document ID is required."
            });
        }
       const retrieveDocs = await retrieveDocuments(question ,documentId) ;

       const answer = await answerQuestion(question , retrieveDocs);

       return res.json({
        success: true,
        answer
       });

    } catch(err){
        console.log(err);
        
        return res.status(500).json({
            success: false,
            message: "Something went wrong !"
        });
    }
}


//  const result = await retrieveDocuments("All full-time employees are expected to work for how many hours");
// // console.log(JSON.stringify(result,null,2));
// const answer = await answerQuestion("All full-time employees are expected to work for how many hours",result);
// console.log("DocSense Response: ",answer);