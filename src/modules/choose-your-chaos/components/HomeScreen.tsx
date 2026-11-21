import { ArrowRight, RotateCcw } from 'lucide-react'

type HomeScreenProps = {
  answered: number
  onStart: () => void
  onRestart: () => void
}

export function HomeScreen({ answered, onStart, onRestart }: HomeScreenProps) {
  return (
    <section className="home-view">
      <div className="hero-art" aria-hidden="true">
        <span className="spark spark-one">✦</span><span className="spark spark-two">✳</span>
        <div className="hero-orbit"><div className="hero-emoji">🎲</div></div>
        <span className="float-emoji float-one">🍕</span><span className="float-emoji float-two">🦆</span><span className="float-emoji float-three">👻</span>
      </div>
      <p className="eyebrow">A tiny game of questionable decisions</p>
      <h1>Hey, <span>troublemaker.</span></h1>
      <p className="hero-copy">Five tiny challenges. A suspicious number of choices. Absolutely no correct answers.</p>
      <div className="home-meta"><span>✦ 5 mini challenges</span><span>♡ 2–3 minutes</span><span>☻ zero pressure</span></div>
      <button className="primary-button start-button" onClick={onStart}>
        {answered ? 'Continue the chaos' : 'Let’s play'} <ArrowRight size={18}/>
      </button>
      {answered > 0 && <button className="text-button" onClick={onRestart}><RotateCcw size={14}/> Start fresh</button>}
      <p className="tiny-note">Your progress stays on this device. No account, no drama.</p>
    </section>
  )
}
