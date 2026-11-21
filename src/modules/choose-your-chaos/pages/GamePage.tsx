import { StoryEnginePreviewPage } from '../../story-engine'
import { HomeScreen } from '../components/HomeScreen'
import { StoryScreen } from '../components/StoryScreen'
import { useStoryGame } from '../hooks/useStoryGame'

export default function GamePage() {
  const game = useStoryGame()
  const isEnginePreview = new URLSearchParams(window.location.search).get('engine') === 'preview'

  if (isEnginePreview) return <StoryEnginePreviewPage />

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
          scene={game.scene}
          flags={game.save.flags}
          progress={game.progress}
          onChoose={game.choose}
          onHome={game.goHome}
          onRestart={game.startNewStory}
        />
      )}
    </main>
  )
}
