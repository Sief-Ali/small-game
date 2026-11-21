import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Challenge, Choice } from '../types'

type ChallengeScreenProps = {
  challenge: Challenge
  index: number
  total: number
  progress: number
  selected?: string
  chosen?: Choice
  showReaction: boolean
  onExit: () => void
  onChoose: (choiceId: string) => void
  onNext: () => void
}

export function ChallengeScreen({
  challenge, index, total, progress, selected, chosen, showReaction,
  onExit, onChoose, onNext
}: ChallengeScreenProps) {
  return (
    <section className="game-view">
      <div className="game-nav">
        <button className="back-button" onClick={onExit}><ArrowLeft size={16}/> Exit</button>
        <span className="level-count">CHALLENGE {index + 1} <i>/</i> {total}</span>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: progress + '%' }}/></div>
      <div className={`challenge-card ${challenge.color}`}>
        <div className="challenge-emoji">{challenge.emoji}</div>
        <p className="eyebrow">{challenge.subtitle}</p>
        <h2>{challenge.title}</h2>
        <p className="prompt">{challenge.prompt}</p>
        <div className="choices">
          {challenge.choices.map((choice, i) => (
            <button key={choice.id} className={`choice-button ${selected === choice.id ? 'selected' : ''}`} onClick={() => onChoose(choice.id)} disabled={showReaction}>
              <span className="choice-emoji">{choice.emoji}</span><span className="choice-label">{choice.label}</span>
              <span className="choice-index">0{i + 1}</span>
            </button>
          ))}
        </div>
        {showReaction && chosen && (
          <div className="reaction-panel">
            <span className="reaction-spark">✦ plot twist ✦</span>
            <p>{chosen.reaction}</p>
            <button className="primary-button next-button" onClick={onNext}>
              {index === total - 1 ? 'See my results' : 'Next challenge'} <ArrowRight size={17}/>
            </button>
          </div>
        )}
      </div>
      <p className="game-footnote">Go with your first instinct. Overthinking is not part of the game.</p>
    </section>
  )
}
