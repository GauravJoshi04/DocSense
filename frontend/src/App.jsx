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

      setMessage(
    'Uploaded successfully! ' + data.stats.chunks + ' chunks indexed.'
     )

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

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />

          {file && (
            <p>
              Selected file: <strong>{file.name}</strong>
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload PDF'}
          </button>

          {message && <p>{message}</p>}

        </section>


        <section className="chat-section">

          <h2>Ask your document</h2>

          <input
            type="text"
            placeholder="What would you like to know?"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />

          <button
            onClick={handleChat}
            disabled={chatLoading || !documentId}
          >
            {chatLoading ? 'Thinking...' : 'Ask'}
          </button>

          {answer && (
            <div className="answer">

              <h3>DocSense</h3>

              <p>{answer}</p>

            </div>
          )}

        </section>

      </main>

    </div>
  )
}

export default App



