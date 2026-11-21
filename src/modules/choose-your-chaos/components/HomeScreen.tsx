import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageToggle } from './LanguageToggle'

type HomeScreenProps = {
  hasProgress: boolean
  onContinue: () => void
  onStartNew: () => void
}

export function HomeScreen({ hasProgress, onContinue, onStartNew }: HomeScreenProps) {
  const { t } = useTranslation()

  return (
    <section className="home-screen">
      <div className="home-toolbar">
        <LanguageToggle/>
      </div>
      <div className="home-glow home-glow-one" aria-hidden="true"/>
      <div className="home-glow home-glow-two" aria-hidden="true"/>
      <div className="home-emblem" aria-hidden="true">
        <span className="emblem-orbit orbit-one"/>
        <span className="emblem-orbit orbit-two"/>
        <span className="emblem-star">✦</span>
        <span className="emblem-lantern">🏮</span>
      </div>
      <p className="home-eyebrow"><Sparkles size={14}/> {t('ui.homeEyebrow')}</p>
      <h1 className="home-title">{t('ui.homeTitle')} <em>{t('ui.homeTitleEmphasis')}</em></h1>
      <p className="home-description">{t('ui.homeDescription')}</p>
      <div className="home-facts">
        <span><BookOpen size={15}/> {t('ui.factChapters')}</span>
        <span>✦ {t('ui.factEndings')}</span>
        <span>♡ {t('ui.factChoices')}</span>
      </div>
      <div className="home-actions">
        {hasProgress && (
          <button className="primary-button" onClick={onContinue}>
            {t('ui.continueStory')} <ArrowRight size={18}/>
          </button>
        )}
        <button className={hasProgress ? 'secondary-button' : 'primary-button'} onClick={onStartNew}>
          {hasProgress ? t('ui.newJourney') : t('ui.beginStory')} <ArrowRight size={18}/>
        </button>
      </div>
      <p className="home-save-note">{t('ui.saveNote')}</p>
    </section>
  )
}
