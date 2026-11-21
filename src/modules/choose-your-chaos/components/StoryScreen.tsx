import { ArrowRight, Home, RotateCcw, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { StoryFlag, StoryScene } from '../types'
import { LanguageToggle } from './LanguageToggle'
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
  const { t } = useTranslation()
  const isEnding = scene.kind === 'ending'
  const sceneKey = `story.${scene.id}`
  const translate = (key: string, fallback: string) =>
    t(key, { defaultValue: fallback })

  const visibleMemories = (scene.conditionalParagraphs || [])
    .map((memory, index) => ({
      ...memory,
      index,
      translated: translate(`${sceneKey}.conditionalParagraphs.${index}`, memory.text)
    }))
    .filter(memory => flags[memory.flag] >= memory.minimum)

  return (
    <section className={`story-screen atmosphere-${scene.atmosphere} ${isEnding ? 'is-ending' : ''}`}>
      <div className="story-topline">
        <button className="quiet-icon-button" onClick={onHome} aria-label={t('ui.homeAria')}>
          <Home size={17}/>
        </button>
        <div className="chapter-progress">
          <div className="chapter-meta">
            <span>{translate(`${sceneKey}.chapterTitle`, scene.chapterTitle)}</span>
            <span>{isEnding ? t('ui.complete') : t('ui.chapter', { chapter: scene.chapter })}</span>
          </div>
          <div className="chapter-track"><span style={{ width: `${progress}%` }}/></div>
        </div>
        <LanguageToggle/>
      </div>

      <div className="story-layout">
        <SceneArtwork scene={scene}/>

        <div className="story-column">
          <article className="story-panel">
            <div className="story-kicker">
              <span className="kicker-dot"/>
              {isEnding
                ? translate(`${sceneKey}.endingSubtitle`, scene.endingSubtitle || '')
                : translate(`${sceneKey}.kicker`, scene.kicker)}
            </div>
            {isEnding ? (
              <>
                <p className="ending-overline">{t('ui.endingKicker')}</p>
                <h1 className="story-title">{translate(`${sceneKey}.endingTitle`, scene.endingTitle || scene.title)}</h1>
              </>
            ) : (
              <h1 className="story-title">{translate(`${sceneKey}.title`, scene.title)}</h1>
            )}

            {scene.question && (
              <div className="embedded-question">
                <span className="question-label">{t('ui.questionLabel')}</span>
                <p>{translate(`${sceneKey}.question.prompt`, scene.question.prompt)}</p>
                {scene.question.note && <small>{translate(`${sceneKey}.question.note`, scene.question.note)}</small>}
              </div>
            )}

            <div className="story-copy">
              {scene.paragraphs.map((paragraph, index) => (
                <p key={index}>{translate(`${sceneKey}.paragraphs.${index}`, paragraph)}</p>
              ))}
              {visibleMemories.map(memory => (
                <p className="memory-line" key={`${memory.flag}-${memory.index}`}>
                  <span>✦</span>{memory.translated}
                </p>
              ))}
            </div>
          </article>

          {!isEnding ? (
            <div className="choice-panel">
              <div className="choice-heading">
                <span>{scene.kind === 'event'
                  ? t('ui.storyMovesOn')
                  : scene.kind === 'question'
                    ? t('ui.littleQuestion')
                    : t('ui.whatDoYouDo')}</span>
                <Sparkles size={15}/>
              </div>
              <div className="story-choices">
                {scene.choices.map((choice, index) => (
                  <button className="story-choice" key={choice.id} onClick={() => onChoose(choice.id)}>
                    <span className="choice-icon">{choice.icon}</span>
                    <span className="choice-content">
                      <span className="choice-label">{translate(`${sceneKey}.choices.${choice.id}.label`, choice.label)}</span>
                      <span className="choice-detail">{translate(`${sceneKey}.choices.${choice.id}.detail`, choice.detail)}</span>
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
                {t('ui.takeAnotherPath')} <RotateCcw size={17}/>
              </button>
              <button className="ending-home-button" onClick={onHome}>{t('ui.returnBeginning')}</button>
            </div>
          )}
        </div>
      </div>

      <div className="story-footer">
        <span>{t('ui.footerStory')}</span>
        <span>{isEnding ? t('ui.footerComplete') : t('ui.footerTrace')}</span>
      </div>
    </section>
  )
}
