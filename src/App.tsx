import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from 'lucide-react'
import { challenges, tagLabels } from './game'

type Save = { name: string; answers: Record<string, string>; completed: boolean }
const SAVE_KEY = 'choose-your-chaos-save-v1'
const emptySave: Save = { name: '', answers: {}, completed: false }

function readSave(): Save {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    return raw ? { ...emptySave, ...JSON.parse(raw) } : emptySave
  } catch { return emptySave }
}

export default function App() {
  const [save, setSave] = useState<Save>(readSave)
  const [screen, setScreen] = useState<'home' | 'game' | 'result'>('home')
  const [index, setIndex] = useState(0)
  const [showReaction, setShowReaction] = useState(false)

  useEffect(() => { localStorage.setItem(SAVE_KEY, JSON.stringify(save)) }, [save])

  const challenge = challenges[index]
  const selected = save.answers[challenge?.id]
  const chosen = challenge?.choices.find(choice => choice.id === selected)

  const discoveries = useMemo(() => {
    const counts: Record<string, number> = {}
    Object.entries(save.answers).forEach(([levelId, choiceId]) => {
      const level = challenges.find(item => item.id === levelId)
      const choice = level?.choices.find(item => item.id === choiceId)
      choice?.tags.forEach(tag => { counts[tag] = (counts[tag] || 0) + 1 })
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3)
  }, [save.answers])

  const answered = Object.keys(save.answers).length
  const progress = Math.round((answered / challenges.length) * 100)

  function choose(choiceId: string) {
    setSave(current => ({ ...current, answers: { ...current.answers, [challenge.id]: choiceId }, completed: false }))
    setShowReaction(true)
  }
  function next() {
    setShowReaction(false)
    if (index === challenges.length - 1) {
      setSave(current => ({ ...current, completed: true }))
      setScreen('result')
    } else setIndex(current => current + 1)
  }
  function start() {
    const firstUnanswered = challenges.findIndex(item => !save.answers[item.id])
    setIndex(firstUnanswered === -1 ? 0 : firstUnanswered)
    setShowReaction(false)
    setScreen('game')
  }
  function restart() {
    setSave(current => ({ ...current, answers: {}, completed: false }))
    setIndex(0)
    setShowReaction(false)
    setScreen('game')
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={e => { e.preventDefault(); setScreen('home') }}>
          <span className="brand-mark">✳</span> choose your chaos
        </a>
      </header>

      {screen === 'home' && (
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
          <button className="primary-button start-button" onClick={start}>
            {answered ? 'Continue the chaos' : 'Let’s play'} <ArrowRight size={18}/>
          </button>
          {answered > 0 && <button className="text-button" onClick={restart}><RotateCcw size={14}/> Start fresh</button>}
          <p className="tiny-note">Your progress stays on this device. No account, no drama.</p>
        </section>
      )}

      {screen === 'game' && challenge && (
        <section className="game-view">
          <div className="game-nav">
            <button className="back-button" onClick={() => setScreen('home')}><ArrowLeft size={16}/> Exit</button>
            <span className="level-count">CHALLENGE {index + 1} <i>/</i> {challenges.length}</span>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: progress + '%' }}/></div>
          <div className={`challenge-card ${challenge.color}`}>
            <div className="challenge-emoji">{challenge.emoji}</div>
            <p className="eyebrow">{challenge.subtitle}</p>
            <h2>{challenge.title}</h2>
            <p className="prompt">{challenge.prompt}</p>
            <div className="choices">
              {challenge.choices.map((choice, i) => (
                <button key={choice.id} className={`choice-button ${selected === choice.id ? 'selected' : ''}`} onClick={() => choose(choice.id)} disabled={showReaction}>
                  <span className="choice-emoji">{choice.emoji}</span><span className="choice-label">{choice.label}</span>
                  <span className="choice-index">0{i + 1}</span>
                </button>
              ))}
            </div>
            {showReaction && chosen && (
              <div className="reaction-panel">
                <span className="reaction-spark">✦ plot twist ✦</span>
                <p>{chosen.reaction}</p>
                <button className="primary-button next-button" onClick={next}>
                  {index === challenges.length - 1 ? 'See my results' : 'Next challenge'} <ArrowRight size={17}/>
                </button>
              </div>
            )}
          </div>
          <p className="game-footnote">Go with your first instinct. Overthinking is not part of the game.</p>
        </section>
      )}

      {screen === 'result' && (
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
            <button className="primary-button" onClick={restart}>Play again <RotateCcw size={17}/></button>
            <button className="secondary-button" onClick={() => setScreen('home')}>Back home</button>
          </div>
          <p className="tiny-note">Your choices are saved on this device.</p>
        </section>
      )}

      <footer className="footer"><span>made for a little chaos</span><span>✦</span><span>no wrong answers</span></footer>
    </main>
  )
}