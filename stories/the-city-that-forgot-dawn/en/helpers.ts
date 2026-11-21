import type { StoryFlag, StorySignal } from '../../../../src/modules/story-engine/types'

export const flags = (...entries: [StoryFlag, number][]) =>
  Object.fromEntries(entries) as Partial<Record<StoryFlag, number>>

export const signals = (...entries: [StorySignal, number][]) =>
  Object.fromEntries(entries) as Partial<Record<StorySignal, number>>
