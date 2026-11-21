import type { StoryFlag, StorySave, StoryScene } from '../choose-your-chaos/types'

export type StoryDefinition = {
  startSceneId: string
  totalChapters: number
  scenes: Record<string, StoryScene>
}

export function getCurrentScene(story: StoryDefinition, sceneId: string): StoryScene {
  return story.scenes[sceneId] ?? story.scenes[story.startSceneId]
}

export function transitionStory(
  story: StoryDefinition,
  save: StorySave,
  currentScene: StoryScene,
  choiceId: string
): StorySave | null {
  const choice = currentScene.choices.find(item => item.id === choiceId)
  if (!choice || currentScene.kind === 'ending') return null

  const nextScene = story.scenes[choice.nextScene]
  if (!nextScene) {
    console.error(`Story "${currentScene.id}" references missing scene "${choice.nextScene}".`)
    return null
  }

  const flags: Record<StoryFlag, number> = { ...save.flags }
  for (const [key, value] of Object.entries(choice.flags ?? {})) {
    const flag = key as StoryFlag
    flags[flag] = (flags[flag] ?? 0) + (value ?? 0)
  }

  const signals = { ...save.signals }
  for (const [key, value] of Object.entries(choice.signals ?? {})) {
    signals[key as keyof typeof signals] = (signals[key as keyof typeof signals] ?? 0) + (value ?? 0)
  }

  const completed = nextScene.kind === 'ending'
  return {
    ...save,
    currentSceneId: nextScene.id,
    history: [...save.history, { sceneId: currentScene.id, choiceId: choice.id }],
    flags,
    signals,
    completed,
    endingSceneId: completed ? nextScene.id : undefined
  }
}

export function getStoryProgress(scene: StoryScene, totalChapters: number): number {
  if (scene.kind === 'ending') return 100
  const chapterProgress = [8, 34, 65, 88]
  return chapterProgress[scene.chapter - 1] ?? Math.round(((scene.chapter - 1) / totalChapters) * 100)
}
