import manifest from '../manifest.json'
import type {
  StoryDefinition,
  StoryPassage,
  StoryPassageSource
} from '../../../src/modules/story-engine/types'
import { chapter01 } from './chapters/chapter-01'
import { chapter02 } from './chapters/chapter-02'
import { chapter03 } from './chapters/chapter-03'
import { chapter04 } from './chapters/chapter-04'
import { chapter05 } from './chapters/chapter-05'
import { chapter06 } from './chapters/chapter-06'
import { chapter07 } from './chapters/chapter-07'

const storyMetadata = manifest as unknown as Omit<StoryDefinition, 'passages'>

const sourcePassages: Record<string, StoryPassageSource> = {
  ...chapter01,
  ...chapter02,
  ...chapter03,
  ...chapter04,
  ...chapter05,
  ...chapter06,
  ...chapter07
}

const chaptersById = new Map(storyMetadata.chapters.map(chapter => [chapter.id, chapter] as const))
const actsById = new Map(storyMetadata.acts.map(act => [act.id, act] as const))

const backgroundSymbols: Record<string, string> = {
  'bg-iron-street-dusk': '🌆',
  'bg-night-market': '🏮',
  'bg-courier-stall': '🕵️',
  'bg-foundry-alley': '⚙️',
  'bg-market-gate': '🚪',
  'bg-crossroads-lanterns': '🛤️',
  'bg-foundry-floor': '🔥',
  'bg-reserve-power': '🛢️',
  'bg-steam-conduit': '♨️',
  'bg-belfry-bells': '🔔',
  'bg-meridian-climb': '⛰️',
  'bg-vault-door': '🔐',
  'bg-pendulum-spin': '⏱️',
  'bg-secret-vault': '📜',
  'bg-horizon-dawn': '🌅',
  'bg-gilded-twilight': '🌇',
  'bg-first-sunrise': '☀️'
}

const passages = Object.fromEntries(
  Object.entries(sourcePassages).map(([id, source]) => {
    const chapter = chaptersById.get(source.chapterId)
    const actId = chapter?.actId ?? 'act-1'
    const act = actsById.get(actId)
    const backgroundKey = source.backgroundKey

    return [id, {
      ...source,
      actId,
      chapter: Number(source.chapterId.replace('ch-', '')),
      kicker: act?.title ?? '',
      title: chapter?.title ?? '',
      atmosphere: backgroundKey,
      artwork: {
        key: backgroundKey,
        description: `Artwork reference: ${backgroundKey}`,
        symbol: backgroundSymbols[backgroundKey] ?? '⚙️',
        caption: chapter?.title ?? ''
      }
    }]
  })
) as Record<string, StoryPassage>

export const storyDefinition: StoryDefinition = {
  ...storyMetadata,
  passages
}

export const START_SCENE_ID = storyDefinition.startPassageId
export const TOTAL_CHAPTERS = storyDefinition.totalChapters
export const storyScenes = storyDefinition.passages
