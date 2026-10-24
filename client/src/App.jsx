import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://linkvault-backend-8qc8.onrender.com'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])

  async function loadHistory() {
    try {
      const response = await fetch(`${API_URL}/api/links`)

      if (!response.ok) {
        throw new Error(`History request failed: ${response.status}`)
      }

      const data = await response.json()
      setHistory(data)
    } catch (err) {
      console.error('Could not load link history:', err)
      setError(`History error: ${err.message}`)
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  async function shortenUrl() {
    setError('')
    setShortUrl('')

    const originalUrl = url.trim()

    if (!/^https?:\/\/.+/i.test(originalUrl)) {
      setError('Enter a URL starting with http:// or https://')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Request failed: ${response.status}`)
      }

      setShortUrl(data.shortUrl)
      await loadHistory()
    } catch (err) {
      console.error('URL shortening failed:', err)
      setError(`Could not shorten URL: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>LinkVault</h1>
      <p>Your personal URL shortener</p>

      <input
        type="url"
        placeholder="Paste your long URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={shortenUrl} disabled={loading}>
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>

      {shortUrl && (
        <div>
          <p>Your short link:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
          <p>Click the link to test the redirect.</p>
        </div>
      )}

      {error && <p role="alert">{error}</p>}

      <h2>Link History</h2>

      {history.length === 0 ? (
        <p>No links created yet.</p>
      ) : (
        history.map((link) => (
          <div key={link.shortCode}>
            <p>
              <a href={link.shortUrl} target="_blank" rel="noreferrer">
                {link.shortUrl}
              </a>
            </p>
            <p>Original URL: {link.originalUrl}</p>
            <p>Clicks: {link.clicks}</p>
          </div>
        ))
      )}
    </div>
  )
}

export default App