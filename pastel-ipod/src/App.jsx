import { useState, useCallback } from 'react'
import { searchVideos } from './youtube'
import useYouTubePlayer from './useYouTubePlayer'
import IpodShell from './components/IpodShell'
import ClickWheel from './components/ClickWheel'
import PlaylistScreen from './components/PlaylistScreen'
import NowPlayingScreen from './components/NowPlayingScreen'
import SearchScreen from './components/SearchScreen'
import SkyDecor from './components/SkyDecor'
import './device.css'

const SCREENS = ['playlist', 'nowplaying', 'search']
const YT_CONTAINER_ID = 'star-player-yt-target'

export default function App() {
  const [tracks, setTracks] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [screen, setScreen] = useState('playlist')

  const [searchResults, setSearchResults] = useState([])
  const [searchError, setSearchError] = useState(null)
  const [addedIds, setAddedIds] = useState(new Set())

  const { ready, isPlaying, progressPct, playVideoId, pause, resume } =
    useYouTubePlayer(YT_CONTAINER_ID)

  const currentTrack = currentIndex >= 0 ? tracks[currentIndex] : null

  const playAt = useCallback(
    (index) => {
      const track = tracks[index]
      if (!track || !ready) return
      playVideoId(track.id)
      setCurrentIndex(index)
      setScreen('nowplaying')
    },
    [tracks, ready, playVideoId]
  )

  const handlePlayPause = () => {
    if (currentIndex < 0) {
      playAt(selectedIndex)
      return
    }
    if (isPlaying) pause()
    else resume()
  }

  const handleNext = () => {
    if (tracks.length === 0) return
    const nextIndex = Math.min(currentIndex + 1, tracks.length - 1)
    playAt(nextIndex)
  }

  const handlePrev = () => {
    if (tracks.length === 0) return
    const prevIndex = Math.max(currentIndex - 1, 0)
    playAt(prevIndex)
  }

  const handleMenu = () => {
    setScreen((s) => SCREENS[(SCREENS.indexOf(s) + 1) % SCREENS.length])
  }

  const handleSearch = async (query) => {
    setSearchError(null)
    try {
      const results = await searchVideos(query)
      setSearchResults(results)
    } catch (e) {
      console.error(e)
      setSearchError(e.message)
    }
  }

  const handleAddTrack = (track) => {
    setTracks((prev) => [...prev, track])
    setAddedIds((prev) => new Set(prev).add(track.id))
  }

  return (
    <>
      <SkyDecor />
      {/* Hidden but "visible enough" for YouTube to keep playing audio in background */}
      <div className="yt-hidden-player">
        <div id={YT_CONTAINER_ID} />
      </div>

      <IpodShell
        wheel={
          <ClickWheel
            onMenu={handleMenu}
            onPrev={handlePrev}
            onNext={handleNext}
            onPlayPause={handlePlayPause}
            isPlaying={isPlaying}
          />
        }
      >
        {screen === 'playlist' && (
          <PlaylistScreen
            tracks={tracks}
            currentTrack={currentTrack}
            selectedIndex={selectedIndex}
            onSetSelectedIndex={setSelectedIndex}
            onSelectTrack={playAt}
          />
        )}

        {screen === 'nowplaying' && (
          <NowPlayingScreen
            track={currentTrack}
            trackIndex={Math.max(currentIndex, 0)}
            totalTracks={tracks.length}
            progressPct={progressPct}
            isPlaying={isPlaying}
          />
        )}

        {screen === 'search' && (
          <SearchScreen
            onSearch={handleSearch}
            results={searchResults}
            onAddTrack={handleAddTrack}
            addedIds={addedIds}
            error={searchError}
          />
        )}
      </IpodShell>
    </>
  )
}
