const STORAGE_KEY = 'star_player_playlist'

export function loadPlaylist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('Failed to load saved playlist', e)
    return []
  }
}

export function savePlaylist(tracks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks))
  } catch (e) {
    console.error('Failed to save playlist', e)
  }
}
