import type { StoryFlag, StorySave } from '../types'
import { START_SCENE_ID } from '../../../../stories/the-city-that-forgot-dawn/en/story'

const SAVE_KEY = 'choose-your-chaos-story-v2'

const defaultFlags: Record<StoryFlag, number> = {
  curiosity: 0,
  kindness: 0,
  courage: 0,
  care: 0,
  community: 0,
  wonder: 0
}

export function createEmptyStorySave(): StorySave {
  return {
    currentSceneId: START_SCENE_ID,
    history: [],
    flags: { ...defaultFlags },
    signals: {},
    completed: false
  }
}

export function readStorySave(): StorySave {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return createEmptyStorySave()

    const saved = JSON.parse(raw) as Partial<StorySave>
    return {
      ...createEmptyStorySave(),
      ...saved,
      currentSceneId: typeof saved.currentSceneId === 'string' ? saved.currentSceneId : START_SCENE_ID,
      history: Array.isArray(saved.history) ? saved.history : [],
      flags: { ...defaultFlags, ...(saved.flags || {}) },
      signals: saved.signals || {},
      completed: Boolean(saved.completed)
    }
  } catch {
    return createEmptyStorySave()
  }
}

export function writeStorySave(save: StorySave): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save))
  } catch {
    // The story remains playable when browser storage is unavailable.
  }
}
