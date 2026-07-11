export default function NowPlayingScreen({
  track,
  trackIndex,
  totalTracks,
  progressPct,
  isPlaying,
}) {
  if (!track) {
    return (
      <div className="nowplaying-screen empty">
        <div className="np-header">
          <span>Now Playing</span>
        </div>
        <p className="empty-hint">nothing queued — pick a song from the playlist ✦</p>
      </div>
    )
  }

  return (
    <div className="nowplaying-screen">
      <div className="np-header">
        <span>Now Playing</span>
        <span className="np-shuffle">⤨</span>
      </div>
      <div className="np-index">
        {trackIndex + 1} of {totalTracks}
      </div>
      <div className="np-body">
        <div className="np-art">
          {track.thumbnail ? (
            <img src={track.thumbnail} alt={track.title} />
          ) : (
            <div className="np-art-placeholder">♪</div>
          )}
        </div>
        <div className="np-meta">
          <div className="np-title">{track.title}</div>
          <div className="np-artist">{track.channelTitle}</div>
        </div>
      </div>
      <div className="np-progress-row">
        <span className="np-speaker">🔈</span>
        <div className="np-progress-track">
          <div className="np-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="np-speaker">🔊</span>
      </div>
      <div className="np-status">{isPlaying ? 'playing ⋆' : 'paused'}</div>
    </div>
  )
}
