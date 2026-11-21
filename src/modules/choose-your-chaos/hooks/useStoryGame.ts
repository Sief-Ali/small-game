import { useEffect, useMemo, useState } from 'react'
import {
  getStoryProgress,
  transitionStory,
  validateStoryDefinition
} from '../../story-engine/engine'
import { storyDefinition } from '../../../../stories/the-city-that-forgot-dawn/en/story'
import { createEmptyStorySave, readStorySave, writeStorySave } from '../lib/storage'
import type { StorySave } from '../../story-engine/types'

type Screen = 'home' | 'story'

export function useStoryGame() {
  const [save, setSave] = useState<StorySave>(readStorySave)
  const [screen, setScreen] = useState<Screen>('home')

  useEffect(() => {
    writeStorySave(save)
  }, [save])

  const validationIssues = useMemo(
    () => validateStoryDefinition(storyDefinition),
    []
  )

  useEffect(() => {
    if (validationIssues.length > 0) {
      console.error('Story definition validation failed:', validationIssues)
    }
  }, [validationIssues])

  const scene = useMemo(
    () => storyDefinition.passages[save.currentSceneId] ??
      storyDefinition.passages[storyDefinition.startPassageId],
    [save.currentSceneId]
  )

  const hasProgress = save.history.length > 0 || save.completed
  const progress = getStoryProgress(scene, storyDefinition.totalChapters)

  function choose(choiceId: string) {
    setSave(current => {
      const currentScene = storyDefinition.passages[current.currentSceneId]
      if (!currentScene) return current
      return transitionStory(storyDefinition, current, currentScene, choiceId) ?? current
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
    story: storyDefinition,
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
