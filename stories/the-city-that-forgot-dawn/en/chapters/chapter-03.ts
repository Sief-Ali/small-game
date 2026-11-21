import type { StoryScene } from '../../../../src/modules/choose-your-chaos/types'
import { flags, signals } from '../helpers'

export const chapter03: Record<string, StoryScene> = {
  archive_memory: {
    id: 'archive_memory', chapter: 3, chapterTitle: 'Chapter III · The Turning Point',
    kind: 'event', kicker: 'A memory is not a place to live', title: 'The Queen’s unfinished letter',
    paragraphs: [
      'The letter describes the Golden Festival: music in the square, warm bread passed from hand to hand, and a thousand paper stars floating above the river. The Queen did not want to lose the joy of that night. She did not realise that keeping it forever would stop every new joy from arriving.',
      'At the bottom, one sentence is underlined: “A beautiful moment is a gift because it ends, and makes room for another.”',
      'The lantern absorbs the words. A second golden spark appears inside it.'
    ],
    atmosphere: 'archive',
    artwork: { key: 'queens-letter-library', description: 'A glowing handwritten royal letter in an old library, surrounded by shelves and floating golden dust.', symbol: '📜', caption: 'The Queen’s letter · a memory set free' },
    choices: [{ id: 'continue-archive', label: 'Carry the new spark to the city clock.', detail: 'The next part of the story is waiting below.', icon: '➡️', nextScene: 'heart_chamber' }]
  },
  clockwork_key: {
    id: 'clockwork_key', chapter: 3, chapterTitle: 'Chapter III · The Turning Point',
    kind: 'event', kicker: 'The city has a mechanism', title: 'The missing piece',
    paragraphs: [
      'The map leads to a workshop beneath the station. You line up the lantern with the drawing, and a hidden compartment opens. Inside is a small silver gear shaped like a crescent moon.',
      'It fits into the clock’s mechanism, but it will not turn by itself. The lantern warms in your hands, as if it is waiting for a decision.'
    ],
    atmosphere: 'workshop',
    artwork: { key: 'clockmakers-underground-workshop', description: 'A hidden clockmaker workshop with brass gears, a crescent-shaped silver gear and warm lamplight.', symbol: '⚙️', caption: 'The clockmaker’s workshop · one piece missing' },
    choices: [{ id: 'continue-workshop', label: 'Take the silver gear to the city clock.', detail: 'The mechanism is ready. The choice is yours now.', icon: '➡️', nextScene: 'heart_chamber' }]
  },
  market_song: {
    id: 'market_song', chapter: 3, chapterTitle: 'Chapter III · The Turning Point',
    kind: 'event', kicker: 'Some things are found together', title: 'The song between the stalls',
    paragraphs: [
      'You and Lina search until a baker recognises the tiny star. He found it near his stall and kept it safe. When Lina holds it, the market vendors begin humming the festival tune her mother used to sing.',
      'One by one, lanterns across the market brighten. The little glass star floats into your brass lantern, and a second golden spark joins the first.'
    ],
    atmosphere: 'market',
    artwork: { key: 'market-vendors-singing', description: 'A welcoming night market glowing with paper lights as neighbours hum together and a child holds a glass star.', symbol: '🎐', caption: 'The market square · a familiar melody returns' },
    choices: [{ id: 'continue-market', label: 'Follow the song toward the old city clock.', detail: 'The tune seems to know the way.', icon: '➡️', nextScene: 'heart_chamber' }]
  },
  river_bridge: {
    id: 'river_bridge', chapter: 3, chapterTitle: 'Chapter III · The Turning Point',
    kind: 'event', kicker: 'Light travels further when shared', title: 'The bridge of little stars',
    paragraphs: [
      'Lina holds the lantern while you walk beside the river. Its light reveals hundreds of tiny glass stars caught between the stones. They were dropped during the old festival and have been reflecting the same moonlight for years.',
      'Lina finds her mother’s star. Before she runs home, she ties a ribbon around your lantern. “So you remember that you did not have to carry the light alone.” A second golden spark appears.'
    ],
    atmosphere: 'river',
    artwork: { key: 'river-bridge-glass-stars', description: 'A moonlit stone bridge over a river, with tiny glass stars glittering between the stones and a ribbon on a lantern.', symbol: '🌉', caption: 'The river bridge · a light shared' },
    choices: [{ id: 'continue-river', label: 'Follow the river to where it meets the clock tower.', detail: 'The water is glowing now.', icon: '➡️', nextScene: 'heart_chamber' }]
  },
  glass_roof: {
    id: 'glass_roof', chapter: 3, chapterTitle: 'Chapter III · The Turning Point',
    kind: 'event', kicker: 'The horizon was never empty', title: 'A sunrise waiting outside',
    paragraphs: [
      'The glass roof trembles under your feet, but you reach the other side. Beyond the mountains, a band of gold waits just below the horizon. The city’s spell has made the night beautiful, but it has also made the world stand still.',
      'The little bird lands on your shoulder and leaves a glowing feather in the lantern. A second spark appears. The bird turns toward the clock tower.'
    ],
    atmosphere: 'rooftops',
    artwork: { key: 'glass-roof-golden-horizon', description: 'A delicate glass rooftop above a sleeping city, with a glowing horizon and a small bird of light.', symbol: '🌅', caption: 'The glass roof · morning is still possible' },
    choices: [{ id: 'continue-glass', label: 'Follow the bird to the clock tower.', detail: 'There is only one place left to go.', icon: '➡️', nextScene: 'heart_chamber' }]
  },
  bellkeeper: {
    id: 'bellkeeper', chapter: 3, chapterTitle: 'Chapter III · The Turning Point',
    kind: 'event', kicker: 'A sound can bring people together', title: 'The keeper of the quiet bell',
    paragraphs: [
      'The bell has no rope. An old woman sitting beside it tells you it only rings when someone remembers why the city needs a morning. She asks what you heard while walking through Nera.',
      'You tell her about the letter, the lost star, and the rooftops you crossed. She smiles. “Then you have already heard enough. Let the city hear it too.” The lantern catches her voice and a second spark appears.'
    ],
    atmosphere: 'belltower',
    artwork: { key: 'silent-bell-tower', description: 'An old bell tower with a huge silent bronze bell, a kind keeper and a city of lights below.', symbol: '🔔', caption: 'The bell tower · waiting for a reason to ring' },
    choices: [{ id: 'continue-bell', label: 'Take the lantern into the heart of the clock.', detail: 'The bell gives one soft note as you leave.', icon: '➡️', nextScene: 'heart_chamber' }]
  }
}
