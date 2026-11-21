import { useEffect, useMemo, useState } from 'react'
import { START_SCENE_ID, storyScenes, TOTAL_CHAPTERS } from '../../../../stories/the-city-that-forgot-dawn/en/story'
import { getCurrentScene, getStoryProgress, transitionStory } from '../../story-engine/engine'
import { createEmptyStorySave, readStorySave, writeStorySave } from '../lib/storage'
import type { StorySave } from '../types'

type Screen = 'home' | 'story'

export function useStoryGame() {
  const [save, setSave] = useState<StorySave>(readStorySave)
  const [screen, setScreen] = useState<Screen>('home')

  useEffect(() => {
    writeStorySave(save)
  }, [save])

  const story = useMemo(
    () => ({ startSceneId: START_SCENE_ID, totalChapters: TOTAL_CHAPTERS, scenes: storyScenes }),
    []
  )
  const scene = useMemo(
    () => getCurrentScene(story, save.currentSceneId),
    [story, save.currentSceneId]
  )

  const hasProgress = save.history.length > 0 || save.completed
  const progress = getStoryProgress(scene, story.totalChapters)

  function choose(choiceId: string) {
    setSave(current => {
      const currentScene = getCurrentScene(story, current.currentSceneId)
      return transitionStory(story, current, currentScene, choiceId) ?? current
    })
  }

  function continueStory() {
    setScreen('story')
  }

  function startNewStory() {
    setSave(createEmptyStorySave())
    setScreen('story')
  }

  function goHome() {
    setScreen('home')
  }

  return {
    save,
    scene,
    screen,
    progress,
    hasProgress,
    continueStory,
    startNewStory,
    goHome,
    choose
  }
}
