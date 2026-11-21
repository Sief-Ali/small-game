import { challenges } from '../data/challenges'
import { useGame } from '../hooks/useGame'
import { HomeScreen } from '../components/HomeScreen'
import { ChallengeScreen } from '../components/ChallengeScreen'
import { ResultScreen } from '../components/ResultScreen'

export default function GamePage() {
  const game = useGame()

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" onClick={event => { event.preventDefault(); game.setScreen('home') }}>
          <span className="brand-mark">✳</span> choose your chaos
        </a>
      </header>

      {game.screen === 'home' && (
        <HomeScreen answered={game.answered} onStart={game.start} onRestart={game.restart}/>
      )}

      {game.screen === 'game' && game.challenge && (
        <ChallengeScreen
          challenge={game.challenge}
          index={game.index}
          total={challenges.length}
          progress={game.progress}
          selected={game.selected}
          chosen={game.chosen}
          showReaction={game.showReaction}
          onExit={() => game.setScreen('home')}
          onChoose={game.choose}
          onNext={game.next}
        />
      )}

      {game.screen === 'result' && (
        <ResultScreen
          discoveries={game.discoveries}
          onRestart={game.restart}
          onHome={() => game.setScreen('home')}
        />
      )}

      <footer className="footer"><span>made for a little chaos</span><span>✦</span><span>no wrong answers</span></footer>
    </main>
  )
}
