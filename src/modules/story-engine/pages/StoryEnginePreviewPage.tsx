import { useCallback, useState } from 'react'
import { ArrowLeft, BookOpen, Radio } from 'lucide-react'
import { SugarCubeFrame } from '../components/SugarCubeFrame'
import type { StoryRuntimeEvent } from '../types'

const STORY_URL = '/stories/the-city-that-forgot-dawn/en/index.html'

export function StoryEnginePreviewPage() {
  const [runtimeStatus, setRuntimeStatus] = useState('Waiting for story runtime…')
  const [currentPassage, setCurrentPassage] = useState('Not started')
  const [lastChoice, setLastChoice] = useState('No choice selected')

  const handleRuntimeEvent = useCallback((event: StoryRuntimeEvent) => {
    switch (event.type) {
      case 'runtime-ready':
        setRuntimeStatus('SugarCube runtime ready')
        break
      case 'passage-displayed':
        setRuntimeStatus('Story running')
        setCurrentPassage(event.passage)
        break
      case 'choice-selected':
        setLastChoice(`${event.label} → ${event.targetPassage}`)
        break
    }
  }, [])

  return (
    <main className="engine-preview">
      <header className="engine-preview__header">
        <a href="/" className="engine-preview__back"><ArrowLeft size={16}/> Back to app</a>
        <div>
          <span className="engine-preview__eyebrow">DEVELOPER PREVIEW</span>
          <h1><BookOpen size={21}/> SugarCube story runtime</h1>
        </div>
      </header>

      <section className="engine-preview__runtime">
        <SugarCubeFrame
          src={STORY_URL}
          title="The City That Forgot Dawn — SugarCube preview"
          onRuntimeEvent={handleRuntimeEvent}
        />
      </section>

      <aside className="engine-preview__events" aria-live="polite">
        <div><Radio size={15}/><span>{runtimeStatus}</span></div>
        <p>Current passage: <strong>{currentPassage}</strong></p>
        <p>Last choice: <strong>{lastChoice}</strong></p>
      </aside>
    </main>
  )
}
