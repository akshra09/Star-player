import { useState } from 'react'

export default function SearchScreen({ onSearch, results, onAddTrack, addedIds, error }) {
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <div className="search-screen">
      <div className="playlist-header">
        <span>ADD SONGS</span>
      </div>
      <form className="search-form" onSubmit={submit}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search a song or artist..."
        />
        <button type="submit">go</button>
      </form>
      {error && <p className="empty-hint">{error}</p>}
      <ul className="search-results">
        {results.map((t) => (
          <li key={t.id} className="search-row">
            <div className="search-meta">
              <div className="search-name">{t.title}</div>
              <div className="search-artist">{t.channelTitle}</div>
            </div>
            <button
              className="add-btn"
              disabled={addedIds.has(t.id)}
              onClick={() => onAddTrack(t)}
            >
              {addedIds.has(t.id) ? '✓' : '+'}
            </button>
          </li>
        ))}
        {results.length === 0 && !error && (
          <p className="empty-hint">search to find songs to add ✦</p>
        )}
      </ul>
    </div>
  )
}
