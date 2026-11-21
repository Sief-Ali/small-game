import { ArrowRight, Home, RotateCcw, Sparkles } from 'lucide-react'
import type { StoryFlag, StoryScene } from '../types'
import { SceneArtwork } from './SceneArtwork'

type StoryScreenProps = {
  scene: StoryScene
  flags: Record<StoryFlag, number>
  progress: number
  onChoose: (choiceId: string) => void
  onHome: () => void
  onRestart: () => void
}

export function StoryScreen({
  scene, flags, progress, onChoose, onHome, onRestart
}: StoryScreenProps) {
  const isEnding = scene.kind === 'ending'
  const visibleMemories = (scene.conditionalParagraphs || [])
    .filter(memory => flags[memory.flag] >= memory.minimum)

  return (
    <section className={`story-screen atmosphere-${scene.atmosphere} ${isEnding ? 'is-ending' : ''}`}>
      <div className="story-topline">
        <button className="quiet-icon-button" onClick={onHome} aria-label="Go to story home">
          <Home size={17}/>
        </button>
        <div className="chapter-progress">
          <div className="chapter-meta">
            <span>{scene.chapterTitle}</span>
            <span>{isEnding ? 'COMPLETE' : `CHAPTER ${scene.chapter} / 4`}</span>
          </div>
          <div className="chapter-track"><span style={{ width: `${progress}%` }}/></div>
        </div>
        <div className="story-mark" aria-hidden="true">✦</div>
      </div>

      <div className="story-layout">
        <SceneArtwork scene={scene}/>

        <div className="story-column">
          <article className="story-panel">
            <div className="story-kicker">
              <span className="kicker-dot"/>
              {isEnding ? scene.endingSubtitle : scene.kicker}
            </div>
            {isEnding ? (
              <>
                <p className="ending-overline">YOUR STORY, YOUR ENDING</p>
                <h1 className="story-title">{scene.endingTitle || scene.title}</h1>
              </>
            ) : (
              <h1 className="story-title">{scene.title}</h1>
            )}

            <div className="story-copy">
              {scene.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              {visibleMemories.map((memory, index) => (
                <p className="memory-line" key={`${memory.flag}-${index}`}>
                  <span>✦</span>{memory.text}
                </p>
              ))}
            </div>
          </article>

          {!isEnding ? (
            <div className="choice-panel">
              <div className="choice-heading">
                <span>{scene.kind === 'event' ? 'THE STORY MOVES ON' : scene.kind === 'question' ? 'A LITTLE QUESTION' : 'WHAT DO YOU DO?'}</span>
                <Sparkles size={15}/>
              </div>
              <div className="story-choices">
                {scene.choices.map((choice, index) => (
                  <button className="story-choice" key={choice.id} onClick={() => onChoose(choice.id)}>
                    <span className="choice-icon">{choice.icon}</span>
                    <span className="choice-content">
                      <span className="choice-label">{choice.label}</span>
                      <span className="choice-detail">{choice.detail}</span>
                    </span>
                    <span className="choice-arrow"><ArrowRight size={17}/></span>
                    <span className="choice-number">0{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="ending-actions">
              <button className="primary-button" onClick={onRestart}>
                Take another path <RotateCcw size={17}/>
              </button>
              <button className="ending-home-button" onClick={onHome}>Return to the beginning</button>
            </div>
          )}
        </div>
      </div>

      <div className="story-footer">
        <span>THE CITY THAT FORGOT DAWN</span>
        <span>{isEnding ? 'THANK YOU FOR PLAYING' : 'EVERY CHOICE LEAVES A TRACE'}</span>
      </div>
    </section>
  )
}
