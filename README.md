# DocSense

DocSense is a RAG-based document assistant that allows users to upload a PDF and ask questions about its content.

The application extracts the document text, splits it into chunks, generates embeddings, stores them in Pinecone, and retrieves relevant chunks when a question is asked. An LLM then generates an answer using the retrieved context.

## Features

* Upload PDF documents
* Extract and split document text into chunks
* Generate vector embeddings for document chunks
* Store and retrieve vectors using Pinecone
* Ask questions about uploaded documents
* Generate answers using retrieved document context
* Simple React frontend

## Architecture

```text
                React Frontend
                     |
                     | HTTP
                     v
              Express Backend
                     |
          +----------+----------+
          |                     |
          v                     v
   Document Ingestion       Question Answering
          |                     |
          v                     v
     PDF Parsing            Query Embedding
          |                     |
          v                     v
       Chunking              Pinecone
          |                  Retrieval
          v                     |
      Embeddings                v
          |                  Context
          v                     |
       Pinecone                LLM
                                |
                                v
                              Answer
```

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js
* Multer

### RAG / AI

* Google Gemini Embeddings
* Pinecone
* Groq
* GPT-OSS 120B

### Other

* Git / GitHub
* REST APIs

## How It Works

### 1. Document Upload

The user uploads a PDF through the React frontend.

The backend receives the file and extracts its text using PDF parsing.

### 2. Chunking

The extracted text is divided into smaller chunks so that individual sections of the document can be indexed and retrieved efficiently.

### 3. Embeddings

Each chunk is converted into a vector embedding using Google's embedding model.

### 4. Vector Storage

The embeddings and their associated metadata are stored in Pinecone.

Each document is assigned a unique `documentId` so that its chunks can be associated with the uploaded document.

### 5. Retrieval

When the user asks a question, relevant document chunks are retrieved from Pinecone using vector similarity search.

### 6. Answer Generation

The retrieved chunks are passed as context to the LLM.

The model is instructed to answer using only the provided document context.

If the required information is not present in the retrieved context, DocSense returns:

```text
I couldn't find that information in the document.
```

## Example

A user uploads a PDF containing company policies.

They can then ask:

```text
What are the expected working hours for full-time employees?
```

DocSense retrieves the relevant section of the document and generates an answer based on that context.

## Project Structure

```text
DocSense/
│
├── controllers/
├── middleware/
├── routes/
├── services/
│   ├── aiService.js
│   ├── embeddingService.js
│   ├── ingestionService.js
│   ├── pdfLoader.js
│   ├── pineconeService.js
│   ├── retrievalService.js
│   └── textSplitter.js
│
├── frontend/
│   └── src/
│
├── uploads/
├── server.js
├── package.json
└── .gitignore
```

## Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd DocSense
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key
```

### 4. Start the backend

```bash
node server.js
```

The backend runs on:

```text
http://localhost:3000
```

### 5. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The React application will be available at:

```text
http://localhost:5173
```

## Environment Variables

| Variable           | Purpose                               |
| ------------------ | ------------------------------------- |
| `GEMINI_API_KEY`   | Generates document embeddings         |
| `GROQ_API_KEY`     | Generates answers using the LLM       |
| `PINECONE_API_KEY` | Stores and retrieves document vectors |

## Current Limitations

This version is designed as a portfolio/demo project rather than a production multi-user application.

Some production improvements that could be added include:

* User authentication
* Per-user document and vector isolation
* Rate limiting
* File size and usage limits
* Document deletion and vector lifecycle management
* Better retrieval evaluation
* Persistent document metadata
* Monitoring and usage tracking

## Future Improvements

* Support for additional document formats
* Conversation history
* Source citations in answers
* Improved chunking and retrieval strategies
* Hybrid search and reranking
* User authentication and document management

## Author

Gaurav Joshi

Built as a project to explore Retrieval-Augmented Generation, vector databases, embeddings, and LLM-based applications.
