import { HomeScreen } from '../components/HomeScreen'
import { StoryScreen } from '../components/StoryScreen'
import { useStoryGame } from '../hooks/useStoryGame'

export default function GamePage() {
  const game = useStoryGame()

  return (
    <main className="app-shell">
      {game.screen === 'home' ? (
        <HomeScreen
          hasProgress={game.hasProgress}
          onContinue={game.continueStory}
          onStartNew={game.startNewStory}
        />
      ) : (
        <StoryScreen
          story={game.story}
          scene={game.scene}
          save={game.save}
          progress={game.progress}
          onChoose={game.choose}
          onHome={game.goHome}
          onRestart={game.startNewStory}
        />
      )}
    </main>
  )
}
