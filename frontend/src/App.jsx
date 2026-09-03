import { useState } from 'react'
import './App.css'

function App() {

  const [file, setFile] = useState(null)
  const [documentId, setDocumentId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  const [stats, setStats] = useState(null)


  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
  }


  async function handleUpload() {

    if (!file) {
      setMessage('Please select a PDF first.')
      return
    }

    setLoading(true)
    setMessage('')

    const formData = new FormData()
    formData.append('pdf', file)

    try {

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!data.success) {
        setMessage(data.message)
        return
      }

      setDocumentId(data.stats.documentId)
      setStats(data.stats)

      setMessage('Document indexed successfully.')
    } catch (error) {

      console.error(error)
      setMessage('Upload failed. Please try again.')

    } finally {

      setLoading(false)

    }
  }


  async function handleChat() {

    if (!question.trim()) {
      return
    }

    if (!documentId) {
      setAnswer('Please upload a document first.')
      return
    }

    setChatLoading(true)
    setAnswer('')

    try {

      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: question,
          documentId: documentId
        })
      })

      const data = await response.json()

      if (!data.success) {
        setAnswer(data.message)
        return
      }

      setAnswer(data.answer)

    } catch (error) {

      console.error(error)
      setAnswer('Something went wrong. Please try again.')

    } finally {

      setChatLoading(false)

    }
  }


  return (
    <div className="app">

      <header>
        <h1>DocSense</h1>
        <p>AI-powered document assistant</p>
      </header>


      <main>

        <section className="upload-section">

          <h2>Upload a document</h2>

          <p>Upload a PDF and ask questions about it.</p>

          <label className="upload-box">
          <span className="upload-icon">📄</span>

          <span className="upload-title">
          {file ? file.name : 'Choose a PDF document'}
          </span>

          <span className="upload-subtitle">
             {file ? 'Document selected' : 'PDF files only'}
         </span>

            <input
             type="file"
              accept=".pdf"
            onChange={handleFileChange}
             />
           </label>

          <button
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Processing document...' : 'Upload PDF'}
          </button>

          {message && !stats && (
  <div className="upload-status">
    <span className="status-icon">!</span>

    <div>
      <strong>Upload status</strong>
      <p>{message}</p>
    </div>
  </div>
)}

{stats && (
  <div className="document-card">

    <div className="document-header">
      <span className="document-icon">📄</span>

      <div>
        <strong>{file?.name}</strong>
        <p>Document ready</p>
      </div>
    </div>

    <div className="document-stats">

      <div>
        <strong>{stats.pages}</strong>
        <span>Pages</span>
      </div>

      <div>
        <strong>{stats.chunks}</strong>
        <span>Chunks</span>
      </div>

      <div>
        <strong>{stats.vectors}</strong>
        <span>Vectors</span>
      </div>

      </div>

      </div>
       )}

        </section>


        <section className="chat-section">

  <div className="chat-header">
    <div>
      <h2>Ask your document</h2>
       <p>
  {documentId
    ? 'Ask anything about the uploaded PDF.'
    : 'Upload a PDF to start asking questions.'}
  </p> 
    </div>

    <span className="ai-badge">AI</span>
  </div>

  <div className="question-box">

    <input
      type="text"
      placeholder="What would you like to know?"
      value={question}
      onChange={(event) => setQuestion(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleChat()
        }
      }}
    />

    <button
  onClick={handleChat}
  disabled={chatLoading || !documentId}
 >
  {chatLoading ? 'Thinking...' : 'Ask'}
   </button>

  </div>

  {answer && (
    <div className="answer">

      <div className="answer-header">
        <span className="answer-icon">✦</span>
        <strong>DocSense</strong>
      </div>

      <p>{answer}</p>

    </div>
  )}

</section>

      </main>

    </div>
  )
}

export default App



