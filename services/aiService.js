
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function answerQuestion(question, documents) {

    const context = documents
    .map(doc => `Page ${doc.page}:\n${doc.text}`)
    .join("\n\n");

    // Build prompt next

    const messages = [
        {
        role: "system",
        content: `You are an AI assistant answering questions from a document.
        Use ONLY the information provided in the context.
        If the answer is not present, reply:"I couldn't find that information in the document."
        Context:
         
        ${context}`
        },
        {
        role: "user",
        content: question
        }
    ]
    // Calling Groq
    const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages
    });

    return completion.choices[0].message.content; 
}