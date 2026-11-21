import { useEffect, useRef } from 'react'
import type { StoryRuntimeEvent } from '../types'
import { isStoryRuntimeEvent } from '../types'

type SugarCubeFrameProps = {
  src: string
  title: string
  onRuntimeEvent?: (event: StoryRuntimeEvent) => void
}

export function SugarCubeFrame({ src, title, onRuntimeEvent }: SugarCubeFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    function handleMessage(message: MessageEvent<unknown>) {
      const frame = frameRef.current
      if (!frame || message.source !== frame.contentWindow) return

      // Sandboxed story documents have an opaque origin ("null"). The exact
      // iframe Window is checked above; no commands or sensitive data are accepted.
      if (message.origin !== 'null' && message.origin !== window.location.origin) return
      if (!isStoryRuntimeEvent(message.data)) return

      onRuntimeEvent?.(message.data)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [onRuntimeEvent])

  return (
    <iframe
      ref={frameRef}
      className="sugarcube-frame"
      src={src}
      title={title}
      sandbox="allow-scripts allow-forms"
      allow="fullscreen"
    />
  )
}
