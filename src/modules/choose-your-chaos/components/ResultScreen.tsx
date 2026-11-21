import { RotateCcw, Sparkles } from 'lucide-react'
import { tagLabels } from '../data/challenges'

type ResultScreenProps = {
  discoveries: [string, number][]
  onRestart: () => void
  onHome: () => void
}

export function ResultScreen({ discoveries, onRestart, onHome }: ResultScreenProps) {
  return (
    <section className="result-view">
      <div className="result-confetti">✦　✳　♡　✦</div>
      <div className="result-icon">🏆</div>
      <p className="eyebrow">Officially, scientifically, not at all scientifically</p>
      <h1>Chaos level: <span>legendary.</span></h1>
      <p className="hero-copy">You survived all five challenges. The world may never be the same.</p>
      <div className="discovery-card">
        <p className="card-kicker"><Sparkles size={15}/> YOUR VERY UNOFFICIAL VIBE CHECK</p>
        {discoveries.length ? discoveries.map(([tag], i) => (
          <div className="discovery-row" key={tag}><span className="discovery-number">0{i + 1}</span><span>{tagLabels[tag] || tag}</span></div>
        )) : <p>Still mysterious. We respect that.</p>}
        <p className="disclaimer">Based on game choices, not actual science. Please do not cite this in court.</p>
      </div>
      <div className="result-actions">
        <button className="primary-button" onClick={onRestart}>Play again <RotateCcw size={17}/></button>
        <button className="secondary-button" onClick={onHome}>Back home</button>
      </div>
      <p className="tiny-note">Your choices are saved on this device.</p>
    </section>
  )
}
