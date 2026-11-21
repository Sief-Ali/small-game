import type { GameSave } from '../types'

const SAVE_KEY = 'choose-your-chaos-save-v1'

export const emptySave: GameSave = {
  name: '',
  answers: {},
  completed: false
}

export function readGameSave(): GameSave {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    return raw ? { ...emptySave, ...JSON.parse(raw) } : emptySave
  } catch {
    return emptySave
  }
}

export function writeGameSave(save: GameSave): void {
  localStorage.setItem(SAVE_KEY, JSON.stringify(save))
}
