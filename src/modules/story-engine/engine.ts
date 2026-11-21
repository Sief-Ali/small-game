import type { StoryFlag, StorySave, StoryScene } from './types'

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
  if (!nextScene) return null

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

export type StoryValidationIssue = {
  code: 'missing-start' | 'missing-target' | 'key-id-mismatch' | 'duplicate-choice' | 'invalid-chapter' | 'ending-has-choices' | 'unreachable-scene'
  message: string
  sceneId?: string
}

export function validateStoryDefinition(story: StoryDefinition): StoryValidationIssue[] {
  const issues: StoryValidationIssue[] = []
  const startScene = story.scenes[story.startSceneId]

  if (!startScene) {
    issues.push({
      code: 'missing-start',
      message: `The start passage "${story.startSceneId}" does not exist.`
    })
  }

  for (const [key, scene] of Object.entries(story.scenes)) {
    if (key !== scene.id) {
      issues.push({
        code: 'key-id-mismatch',
        sceneId: scene.id,
        message: `Scene map key "${key}" does not match passage id "${scene.id}".`
      })
    }

    if (!Number.isInteger(scene.chapter) || scene.chapter < 1 || scene.chapter > story.totalChapters) {
      issues.push({
        code: 'invalid-chapter',
        sceneId: scene.id,
        message: `Passage "${scene.id}" has an invalid chapter number.`
      })
    }

    if (scene.kind === 'ending' && scene.choices.length > 0) {
      issues.push({
        code: 'ending-has-choices',
        sceneId: scene.id,
        message: `Ending "${scene.id}" must not have outgoing choices.`
      })
    }

    const choiceIds = new Set<string>()
    for (const choice of scene.choices) {
      if (choiceIds.has(choice.id)) {
        issues.push({
          code: 'duplicate-choice',
          sceneId: scene.id,
          message: `Passage "${scene.id}" contains duplicate choice id "${choice.id}".`
        })
      }
      choiceIds.add(choice.id)

      if (!story.scenes[choice.nextScene]) {
        issues.push({
          code: 'missing-target',
          sceneId: scene.id,
          message: `Choice "${choice.id}" in "${scene.id}" points to missing passage "${choice.nextScene}".`
        })
      }
    }
  }

  if (startScene) {
    const reachable = new Set<string>()
    const pending = [story.startSceneId]

    while (pending.length > 0) {
      const sceneId = pending.pop()!
      if (reachable.has(sceneId)) continue
      reachable.add(sceneId)

      const scene = story.scenes[sceneId]
      if (!scene) continue
      for (const choice of scene.choices) {
        if (story.scenes[choice.nextScene] && !reachable.has(choice.nextScene)) {
          pending.push(choice.nextScene)
        }
      }
    }

    for (const sceneId of Object.keys(story.scenes)) {
      if (!reachable.has(sceneId)) {
        issues.push({
          code: 'unreachable-scene',
          sceneId,
          message: `Passage "${sceneId}" cannot be reached from the start passage.`
        })
      }
    }
  }

  return issues
}
