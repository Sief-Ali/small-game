import { ArrowRight, Home, RotateCcw, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getAvailableChoices } from '../../story-engine/engine'
import type { StoryDefinition, StoryPassage, StorySave } from '../../story-engine/types'
import { LanguageToggle } from './LanguageToggle'
import { SceneArtwork } from './SceneArtwork'

type StoryScreenProps = {
  story: StoryDefinition
  scene: StoryPassage
  save: StorySave
  progress: number
  onChoose: (choiceId: string) => void
  onHome: () => void
  onRestart: () => void
}

export function StoryScreen({
  story, scene, save, progress, onChoose, onHome, onRestart
}: StoryScreenProps) {
  const { t } = useTranslation()
  const isEnding = scene.kind === 'ending'
  const passageKey = `story.passages.${scene.id}`
  const chapter = story.chapters.find(item => item.id === scene.chapterId)
  const act = story.acts.find(item => item.id === scene.actId)
  const ending = scene.endingId
    ? story.endings.find(item => item.id === scene.endingId)
    : undefined

  const chapterTitle = t(`story.meta.chapters.${scene.chapterId}.title`, {
    defaultValue: chapter?.title ?? scene.title
  })
  const actTitle = t(`story.meta.acts.${scene.actId}.title`, {
    defaultValue: act?.title ?? scene.kicker
  })
  const endingTitle = ending
    ? t(`story.meta.endings.${ending.id}.title`, { defaultValue: ending.title })
    : ''

  const translate = (key: string, fallback: string) =>
    t(key, { defaultValue: fallback })

  const interpolate = (value: string) =>
    value.replace(/\{\{stats\.([a-zA-Z0-9_]+)\}\}/g, (_, key: string) =>
      String(save.stats[key] ?? 0)
    )

  const paragraphs = scene.paragraphs.map((paragraph, index) =>
    interpolate(translate(`${passageKey}.body.${index}`, paragraph))
  )
  const choices = getAvailableChoices(scene, save)
  const completedQuests = Object.values(save.quests).filter(
    quest => quest.status === 'completed'
  ).length
  const totalQuests = story.quests.length
  const choiceHeading = scene.kind === 'choice'
    ? t('ui.whatDoYouDo')
    : scene.kind === 'checkpoint'
      ? t('ui.checkpointReached')
      : t('ui.storyMovesOn')

  return (
    <section className={`story-screen atmosphere-${scene.atmosphere} ${isEnding ? 'is-ending' : ''}`}>
      <div className="story-topline">
        <button className="quiet-icon-button" onClick={onHome} aria-label={t('ui.homeAria')}>
          <Home size={17}/>
        </button>
        <div className="chapter-progress">
          <div className="chapter-meta">
            <span>{chapterTitle}</span>
            <span>{isEnding ? t('ui.complete') : t('ui.chapter', { chapter: scene.chapter })}</span>
          </div>
          <div className="chapter-track"><span style={{ width: `${progress}%` }}/></div>
        </div>
        <LanguageToggle/>
      </div>

      <div className="story-state-strip" aria-label={t('ui.storyStatus')}>
        <span><strong>{save.stats.dawnProgress ?? 0}%</strong> {t('ui.dawnProgress')}</span>
        <span><strong>{save.inventory.length}</strong> {t('ui.inventoryCount')}</span>
        <span><strong>{completedQuests}/{totalQuests}</strong> {t('ui.questsComplete')}</span>
      </div>

      <div className="story-layout">
        <SceneArtwork scene={scene}/>

        <div className="story-column">
          <article className="story-panel">
            <div className="story-kicker">
              <span className="kicker-dot"/>
              {actTitle}
            </div>
            {isEnding ? (
              <>
                <p className="ending-overline">{t('ui.endingKicker')}</p>
                <h1 className="story-title">{endingTitle || chapterTitle}</h1>
              </>
            ) : (
              <h1 className="story-title">{chapterTitle}</h1>
            )}

            {scene.kind === 'checkpoint' && (
              <p className="passage-type-label">{t('ui.checkpointLabel')}</p>
            )}

            <div className="story-copy">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>

          {!isEnding ? (
            <div className="choice-panel" data-choice-group={scene.choiceGroupId}>
              <div className="choice-heading">
                <span>{choiceHeading}</span>
                <Sparkles size={15}/>
              </div>
              <div className="story-choices">
                {choices.map((choice, index) => (
                  <button
                    className="story-choice"
                    key={choice.id}
                    onClick={() => onChoose(choice.id)}
                  >
                    <span className="choice-icon">{String(index + 1).padStart(2, '0')}</span>
                    <span className="choice-content">
                      <span className="choice-label">
                        {translate(`${passageKey}.choices.${choice.id}.label`, choice.label)}
                      </span>
                    </span>
                    <span className="choice-arrow"><ArrowRight size={17}/></span>
                  </button>
                ))}
                {choices.length === 0 && (
                  <p className="no-choices-note">{t('ui.noChoicesAvailable')}</p>
                )}
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
