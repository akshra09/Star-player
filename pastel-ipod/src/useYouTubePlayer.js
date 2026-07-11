import { useEffect, useRef, useState, useCallback } from 'react'

// Loads the IFrame Player API script once (no API key needed for playback itself).
function loadIframeApi() {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve(window.YT)
      return
    }
    const prevCallback = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.()
      resolve(window.YT)
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
    }
  })
}

export default function useYouTubePlayer(containerId) {
  const playerRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progressPct, setProgressPct] = useState(0)
  const pollRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    loadIframeApi().then((YT) => {
      if (cancelled) return
      playerRef.current = new YT.Player(containerId, {
        height: '1',
        width: '1',
        playerVars: {
          playsinline: 1,
          controls: 0,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e) => {
            setIsPlaying(e.data === YT.PlayerState.PLAYING)
          },
        },
      })
    })

    return () => {
      cancelled = true
      clearInterval(pollRef.current)
      playerRef.current?.destroy?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Poll progress while playing
  useEffect(() => {
    clearInterval(pollRef.current)
    if (isPlaying) {
      pollRef.current = setInterval(() => {
        const p = playerRef.current
        if (!p || typeof p.getCurrentTime !== 'function') return
        const duration = p.getDuration?.() || 0
        const current = p.getCurrentTime?.() || 0
        setProgressPct(duration ? (current / duration) * 100 : 0)
      }, 500)
    }
    return () => clearInterval(pollRef.current)
  }, [isPlaying])

  const playVideoId = useCallback((videoId) => {
    playerRef.current?.loadVideoById?.(videoId)
    setProgressPct(0)
  }, [])

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo?.()
  }, [])

  const resume = useCallback(() => {
    playerRef.current?.playVideo?.()
  }, [])

  return { ready, isPlaying, progressPct, playVideoId, pause, resume }
}
