import { createInitialStorySave } from '../../story-engine/engine'
import type { StorySave } from '../../story-engine/types'
import { storyDefinition } from '../../../../stories/the-city-that-forgot-dawn/en/story'

const SAVE_KEY = 'choose-your-chaos-story-v3'

export function createEmptyStorySave(): StorySave {
  return createInitialStorySave(storyDefinition)
}

export function readStorySave(): StorySave {
  const fallback = createEmptyStorySave()

  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return fallback

    const saved = JSON.parse(raw) as Partial<StorySave>
    if (
      saved.schemaVersion !== 3 ||
      typeof saved.currentSceneId !== 'string' ||
      !storyDefinition.passages[saved.currentSceneId]
    ) {
      return fallback
    }

    return {
      ...fallback,
      ...saved,
      currentSceneId: saved.currentSceneId,
      history: Array.isArray(saved.history) ? saved.history : [],
      flags: { ...fallback.flags, ...(saved.flags ?? {}) },
      stats: { ...fallback.stats, ...(saved.stats ?? {}) },
      inventory: Array.isArray(saved.inventory) ? saved.inventory : [],
      quests: { ...fallback.quests, ...(saved.quests ?? {}) },
      relationships: saved.relationships ?? {},
      achievements: saved.achievements ?? [],
      completedChapterIds: saved.completedChapterIds ?? [],
      discoveredEndings: saved.discoveredEndings ?? [],
      visitedPassages: saved.visitedPassages ?? [],
      score: typeof saved.score === 'number' ? saved.score : 0,
      completed: Boolean(saved.completed)
    }
  } catch {
    return fallback
  }
}

export function writeStorySave(save: StorySave): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save))
  } catch {
    // The story remains playable for the current session when storage is unavailable.
  }
}
