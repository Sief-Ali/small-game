import type { StoryScene } from '../../../../src/modules/choose-your-chaos/types'
import { flags, signals } from '../helpers'

export const chapter02: Record<string, StoryScene> = {
  keeper_truth: {
    id: 'keeper_truth', chapter: 2, chapterTitle: 'Chapter II · The Clue',
    kind: 'story', kicker: 'A secret kept for too long', title: 'Mara remembers the morning',
    paragraphs: [
      'Mara unlocks a room behind the station clock. Dusty timetables cover the walls. Every single one ends on the same date: the Night of the Golden Festival.',
      '“The people of Nera were afraid that their happiest day would end,” she tells you. “So the old Queen asked the clockmaker to keep that evening forever. The spell worked a little too well.”',
      'The lantern gives a small pulse. Somewhere beneath the city, something answers.'
    ],
    atmosphere: 'archive',
    artwork: { key: 'station-keepers-archive', description: 'A secret railway archive filled with old timetables, handwritten letters and a giant stopped clock.', symbol: '🕰️', caption: 'The records room · sealed since the festival' },
    choices: [
      { id: 'read-letter', label: 'Read the letter the Queen left behind.', detail: 'You want to understand why the spell was made.', icon: '✉️', nextScene: 'archive_memory', flags: flags(['curiosity', 1], ['care', 1]), signals: signals(['curiosity', 1], ['comfort', 1]) },
      { id: 'study-map', label: 'Study the clockmaker’s strange mechanism map.', detail: 'A practical answer might be hiding in the gears.', icon: '🗺️', nextScene: 'clockwork_key', flags: flags(['curiosity', 1], ['courage', 1]), signals: signals(['independence', 1], ['novelty', 1]) }
    ]
  },
  lost_star: {
    id: 'lost_star', chapter: 2, chapterTitle: 'Chapter II · The Clue',
    kind: 'story', kicker: 'A small problem, a big feeling', title: 'Lina’s missing star',
    paragraphs: [
      'The child introduces herself as Lina. She has been looking for a little glass star that fell from her mother’s festival necklace. It is not expensive, she explains. It is just the last thing her mother made before leaving Nera to find the sunrise.',
      'The lantern glows when Lina speaks. For a moment, its golden light looks almost like a tiny sunrise.'
    ],
    atmosphere: 'market',
    artwork: { key: 'nera-lantern-market', description: 'A quiet night market with paper lanterns, little stalls, ribbons and a child holding an empty necklace chain.', symbol: '🏮', caption: 'The lantern market · where every light has a story' },
    choices: [
      { id: 'search-market', label: 'Search every little market stall with Lina.', detail: 'There is no rush when someone matters.', icon: '🔎', nextScene: 'market_song', flags: flags(['kindness', 1], ['community', 1]), signals: signals(['connection', 1], ['comfort', 1]) },
      { id: 'share-light', label: 'Lend Lina your lantern and follow the river.', detail: 'The light might help you find what the market cannot.', icon: '💛', nextScene: 'river_bridge', flags: flags(['kindness', 1], ['courage', 1]), signals: signals(['generosity', 1], ['adventure', 1]) }
    ]
  },
  rooftop_run: {
    id: 'rooftop_run', chapter: 2, chapterTitle: 'Chapter II · The Clue',
    kind: 'story', kicker: 'Above the sleepy streets', title: 'A shortcut among the stars',
    paragraphs: [
      'You climb a narrow staircase and emerge above the rooftops. The blue light is not a person at all, but a tiny bird made of sparks. It circles the old bell tower, then darts toward the highest part of the city.',
      'Below you, Nera looks peaceful. Up here, you can see a thin line of gold behind the mountains. Morning is still out there. It has simply been held back.'
    ],
    atmosphere: 'rooftops',
    artwork: { key: 'nera-rooftops-comet-bird', description: 'A sweeping view over blue rooftops and chimneys, with a tiny glowing bird flying toward a distant bell tower.', symbol: '🕊️', caption: 'Above the rooftops · follow the little light' },
    choices: [
      { id: 'cross-glass', label: 'Follow the bird across the old glass roof.', detail: 'It looks fragile, but the light is almost within reach.', icon: '✨', nextScene: 'glass_roof', flags: flags(['courage', 1], ['wonder', 1]), signals: signals(['adventure', 1], ['novelty', 1]) },
      { id: 'ring-bell', label: 'Climb the bell tower and ring its silent bell.', detail: 'Maybe the whole city needs to hear something again.', icon: '🔔', nextScene: 'bellkeeper', flags: flags(['community', 1], ['care', 1]), signals: signals(['connection', 1], ['stability', 1]) }
    ]
  }
}
