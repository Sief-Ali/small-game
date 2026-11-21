import { useEffect, useMemo, useState } from 'react'
import { START_SCENE_ID, storyScenes, TOTAL_CHAPTERS } from '../data/story'
import { createEmptyStorySave, readStorySave, writeStorySave } from '../lib/storage'
import type { StoryFlag, StorySave } from '../types'

type Screen = 'home' | 'story'

export function useStoryGame() {
  const [save, setSave] = useState<StorySave>(readStorySave)
  const [screen, setScreen] = useState<Screen>('home')

  useEffect(() => {
    writeStorySave(save)
  }, [save])

  const scene = useMemo(
    () => storyScenes[save.currentSceneId] || storyScenes[START_SCENE_ID],
    [save.currentSceneId]
  )

  const hasProgress = save.history.length > 0 || save.completed
  const chapterProgress = [8, 34, 65, 88]
  const progress = scene.kind === 'ending' ? 100 : chapterProgress[scene.chapter - 1] || 0

  function choose(choiceId: string) {
    const choice = scene.choices.find(item => item.id === choiceId)
    if (!choice || scene.kind === 'ending') return

    const nextScene = storyScenes[choice.nextScene]
    if (!nextScene) {
      console.error(`Story data references a missing scene: ${choice.nextScene}`)
      return
    }

    setSave(current => {
      const nextFlags: Record<StoryFlag, number> = { ...current.flags }
      Object.entries(choice.flags || {}).forEach(([key, value]) => {
        const flag = key as StoryFlag
        nextFlags[flag] = (nextFlags[flag] || 0) + (value || 0)
      })

      const nextSignals = { ...current.signals }
      Object.entries(choice.signals || {}).forEach(([key, value]) => {
        nextSignals[key as keyof typeof nextSignals] =
          (nextSignals[key as keyof typeof nextSignals] || 0) + (value || 0)
      })

      const completed = nextScene.kind === 'ending'
      return {
        ...current,
        currentSceneId: nextScene.id,
        history: [...current.history, { sceneId: scene.id, choiceId: choice.id }],
        flags: nextFlags,
        signals: nextSignals,
        completed,
        endingSceneId: completed ? nextScene.id : undefined
      }
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
