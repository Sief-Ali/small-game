import type { StoryScene } from '../../../../src/modules/story-engine/types'
import { chapter01 } from './chapters/chapter-01'
import { chapter02 } from './chapters/chapter-02'
import { chapter03 } from './chapters/chapter-03'
import { chapter04 } from './chapters/chapter-04'

export const START_SCENE_ID = 'arrival'
export const TOTAL_CHAPTERS = 4

export const storyScenes: Record<string, StoryScene> = {
  ...chapter01,
  ...chapter02,
  ...chapter03,
  ...chapter04
}
