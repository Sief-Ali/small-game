import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'

type HomeScreenProps = {
  hasProgress: boolean
  onContinue: () => void
  onStartNew: () => void
}

export function HomeScreen({ hasProgress, onContinue, onStartNew }: HomeScreenProps) {
  return (
    <section className="home-screen">
      <div className="home-glow home-glow-one" aria-hidden="true"/>
      <div className="home-glow home-glow-two" aria-hidden="true"/>
      <div className="home-emblem" aria-hidden="true">
        <span className="emblem-orbit orbit-one"/>
        <span className="emblem-orbit orbit-two"/>
        <span className="emblem-star">✦</span>
        <span className="emblem-lantern">🏮</span>
      </div>
      <p className="home-eyebrow"><Sparkles size={14}/> AN INTERACTIVE STORY</p>
      <h1 className="home-title">The City That <em>Forgot Dawn</em></h1>
      <p className="home-description">
        A little lantern. A city trapped in twilight. And a choice about what kind of morning the world deserves.
      </p>
      <div className="home-facts">
        <span><BookOpen size={15}/> 4 chapters</span>
        <span>✦ 4 possible endings</span>
        <span>♡ your choices matter</span>
      </div>
      <div className="home-actions">
        {hasProgress && (
          <button className="primary-button" onClick={onContinue}>
            Continue story <ArrowRight size={18}/>
          </button>
        )}
        <button className={hasProgress ? 'secondary-button' : 'primary-button'} onClick={onStartNew}>
          {hasProgress ? 'Start a new journey' : 'Begin the story'} <ArrowRight size={18}/>
        </button>
      </div>
      <p className="home-save-note">Your story is saved on this device. No account, no rush.</p>
    </section>
  )
}
