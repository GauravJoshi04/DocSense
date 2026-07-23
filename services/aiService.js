


export async function answerQuestion(question, documents) {

    const context = documents
        .map(doc => doc.text)
        .join("\n\n");

    // Build prompt next
    const prompt = `
    You are an AI assistant answering questions from a document.
    Use ONLY the information provided in the context.
    If the answer is not present, reply:"I couldn't find that information in the document."
    Context: 
    ${context}
    
    Question:
    ${question}
    
    Answer:
    `;
}