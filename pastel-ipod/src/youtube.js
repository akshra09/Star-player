// YouTube Data API v3 — search only. No login, no OAuth.
// Playback itself is handled separately by the IFrame Player API (see youtubePlayer.js),
// which needs no API key at all.

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'

export async function searchVideos(query, maxResults = 12) {
  if (!API_KEY) {
    throw new Error(
      'Missing VITE_YOUTUBE_API_KEY — add it to your .env file (see README).'
    )
  }

  const params = new URLSearchParams({
    part: 'snippet',
    type: 'video',
    videoCategoryId: '10', // Music category
    maxResults: String(maxResults),
    q: query,
    key: API_KEY,
  })

  const res = await fetch(`${SEARCH_URL}?${params.toString()}`)
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`YouTube search failed (${res.status}): ${body}`)
  }
  const data = await res.json()

  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail:
      item.snippet.thumbnails?.medium?.url ||
      item.snippet.thumbnails?.default?.url,
  }))
}
