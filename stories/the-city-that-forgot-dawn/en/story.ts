import type { StoryFlag, StoryScene, StorySignal } from '../../../src/modules/choose-your-chaos/types'

export const START_SCENE_ID = 'arrival'
export const TOTAL_CHAPTERS = 4

const flags = (...entries: [StoryFlag, number][]) =>
  Object.fromEntries(entries) as Partial<Record<StoryFlag, number>>

const signals = (...entries: [StorySignal, number][]) =>
  Object.fromEntries(entries) as Partial<Record<StorySignal, number>>

export const storyScenes: Record<string, StoryScene> = {
  arrival: {
    id: 'arrival', chapter: 1, chapterTitle: 'Chapter I · The Last Evening',
    kind: 'story', kicker: 'A city waiting for morning', title: 'The lantern with one warm star',
    paragraphs: [
      'In Nera, the clocks have shown 5:17 for as long as anyone can remember. The sun never rises, but the city has learned to live beneath its beautiful, endless blue evening.',
      'On your way home, a little brass lantern appears on the step of the abandoned train station. Inside it floats one tiny golden star. The station keeper, Mara, watches it flicker and says: “It has chosen someone. I only hope you are the sort who knows what to do with a little light.”'
    ],
    atmosphere: 'station',
    artwork: { key: 'nera-station-blue-hour', description: 'An old train station under a deep blue twilight sky, with a single golden lantern glowing on the platform.', symbol: '🏮', caption: 'Platform 5:17 · Nera Central' },
    choices: [
      { id: 'ask-mara', label: 'Ask Mara what happened to the sunrise.', detail: 'There is probably a story behind a city that forgot morning.', icon: '📖', nextScene: 'keeper_truth', flags: flags(['curiosity', 1], ['care', 1]), signals: signals(['curiosity', 1], ['stability', 1]) },
      { id: 'help-lina', label: 'Follow a child searching for a fallen star.', detail: 'Someone nearby seems to need help more than you need answers.', icon: '⭐', nextScene: 'lost_star', flags: flags(['kindness', 1], ['community', 1]), signals: signals(['connection', 1], ['generosity', 1]) },
      { id: 'chase-light', label: 'Follow the blue light racing over the rooftops.', detail: 'Whatever this is, it is not going to wait for you.', icon: '🌙', nextScene: 'rooftop_run', flags: flags(['courage', 1], ['wonder', 1]), signals: signals(['adventure', 1], ['independence', 1]) }
    ]
  },

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
  },

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
  },

  heart_chamber: {
    id: 'heart_chamber', chapter: 4, chapterTitle: 'Chapter IV · The First Morning',
    kind: 'story', kicker: 'Every light asks what it is for', title: 'At the heart of the clock',
    paragraphs: [
      'Beneath the tower is a round room with four empty lantern hooks. The city clock ticks once, then waits. The two sparks inside your lantern rise and circle a tiny golden flame.',
      'Mara’s voice echoes from the staircase: “The spell can end in more than one way. Do not ask which ending is correct. Ask what kind of morning this city deserves.”'
    ],
    conditionalParagraphs: [
      { flag: 'kindness', minimum: 1, text: 'A small glass star shines beside the lantern. Lina’s ribbon is still tied around its handle.' },
      { flag: 'curiosity', minimum: 1, text: 'The Queen’s words return to you: a memory should be carried, not locked away.' },
      { flag: 'courage', minimum: 1, text: 'Above, the little bird circles the tower, waiting to see what you will choose.' },
      { flag: 'community', minimum: 1, text: 'Somewhere outside, the people of Nera are humming together. The city is listening.' }
    ],
    atmosphere: 'clockheart',
    artwork: { key: 'nera-clock-heart-chamber', description: 'A vast circular chamber inside a clock tower, with four lantern hooks, floating sparks and a golden mechanism.', symbol: '✨', caption: 'The heart of the clock · choose what morning means' },
    choices: [
      { id: 'share-dawn', label: 'Let everyone share the lantern’s light.', detail: 'No single person should own the morning.', icon: '🕯️', nextScene: 'ending_shared', signals: signals(['connection', 2], ['generosity', 1]) },
      { id: 'keep-warmth', label: 'Save one warm light for a quiet, safe home.', detail: 'A gentle beginning can matter more than a grand one.', icon: '🏡', nextScene: 'ending_warm', signals: signals(['comfort', 2], ['stability', 1]) },
      { id: 'free-the-star', label: 'Release the star and let it find its own sky.', detail: 'Some beautiful things should be free to change.', icon: '🌠', nextScene: 'ending_wild', signals: signals(['adventure', 2], ['novelty', 1]) },
      { id: 'turn-the-clock', label: 'Repair the clock and bring back the natural rhythm.', detail: 'Give the whole city a chance to begin again.', icon: '⏳', nextScene: 'ending_clock', signals: signals(['independence', 1], ['stability', 1]) }
    ]
  },

  ending_shared: {
    id: 'ending_shared', chapter: 4, chapterTitle: 'Your ending', kind: 'ending',
    kicker: 'An ending made of many hands', title: 'The city of a thousand little suns',
    endingTitle: 'A morning that belongs to everyone', endingSubtitle: 'The Shared Dawn',
    paragraphs: [
      'You lift the lantern. Across Nera, windows open. One person lights a candle from its flame, then another, until the whole city is glowing. The clock begins to move, not because anyone commands it, but because everyone is ready to let the night end.',
      'The first sunrise in years spills over the rooftops. Lina finds you in the square and places her glass star in the lantern. It shines beside the little golden flame, a reminder that light grows when it is shared.',
      'Nera does not get its perfect festival night back. It gets something better: another day, and the chance to make it beautiful together.'
    ],
    conditionalParagraphs: [
      { flag: 'kindness', minimum: 1, text: 'Lina is among the first to light a candle. She waves when she sees you, and the little star around her neck catches the sunrise.' },
      { flag: 'community', minimum: 1, text: 'The market vendors, the bell keeper and the station workers all gather in the square. Your journey has quietly brought them back to one another.' }
    ],
    atmosphere: 'sunrise',
    artwork: { key: 'ending-shared-dawn', description: 'The whole city gathered at sunrise, passing candlelight between neighbours beneath a golden sky.', symbol: '🌇', caption: 'The Shared Dawn · a new day, together' },
    choices: []
  },

  ending_warm: {
    id: 'ending_warm', chapter: 4, chapterTitle: 'Your ending', kind: 'ending',
    kicker: 'A small light is still a light', title: 'The little house by the river',
    endingTitle: 'A gentle place to begin', endingSubtitle: 'The Quiet Morning',
    paragraphs: [
      'You place the lantern in the window of a little house beside the river. Its flame becomes a steady golden glow. The clock moves one careful minute forward, and a soft line of daylight slips across the floor.',
      'Nera does not burst into celebration. It wakes slowly. Bakers open their doors, cats stretch on warm steps, and people discover that the world can change without asking them to hurry.',
      'You stay long enough to watch the first cup of tea catch the morning light. Some beginnings are meant to be quiet.'
    ],
    conditionalParagraphs: [
      { flag: 'care', minimum: 1, text: 'Mara visits with a blanket and two cups of tea. She says the city has needed a place to rest as much as it has needed a sunrise.' },
      { flag: 'kindness', minimum: 1, text: 'Lina leaves a tiny paper star on the windowsill. It is not the same as the glass one, but it is made just for you.' }
    ],
    atmosphere: 'warm-morning',
    artwork: { key: 'ending-quiet-house', description: 'A snug riverside home at first light, with a glowing window, kettle steam and a paper star on the sill.', symbol: '☕', caption: 'The Quiet Morning · warmth before the world wakes' },
    choices: []
  },

  ending_wild: {
    id: 'ending_wild', chapter: 4, chapterTitle: 'Your ending', kind: 'ending',
    kicker: 'The sky was never meant to stay still', title: 'The night becomes a thousand colours',
    endingTitle: 'A sky with no borders', endingSubtitle: 'The Wild Aurora',
    paragraphs: [
      'You open the lantern. The little star rises, pauses above your hand, then shoots into the sky. For one breath the whole world is dark. Then colour pours across the horizon: violet, rose, gold and blue.',
      'The spell breaks like a window opening. Dawn comes to Nera in a wild sweep of light, and the little bird becomes a bright constellation that moves whenever someone looks up.',
      'No clock can tell this morning when to end. The city will have to learn its own rhythm, and you have the feeling it will be wonderfully imperfect.'
    ],
    conditionalParagraphs: [
      { flag: 'courage', minimum: 1, text: 'The little bird circles you once before joining the new constellation. It seems to recognise a fellow traveller.' },
      { flag: 'wonder', minimum: 1, text: 'For the first time, the people of Nera look beyond their rooftops and wonder what else might be waiting out there.' }
    ],
    atmosphere: 'aurora',
    artwork: { key: 'ending-wild-aurora', description: 'A magical sunrise with sweeping violet, rose and gold aurora ribbons above a city waking beneath the stars.', symbol: '🌌', caption: 'The Wild Aurora · let the world surprise you' },
    choices: []
  },

  ending_clock: {
    id: 'ending_clock', chapter: 4, chapterTitle: 'Your ending', kind: 'ending',
    kicker: 'Some things need a patient hand', title: 'The clock begins again',
    endingTitle: 'The keeper of tomorrow', endingSubtitle: 'The Clockwork Dawn',
    paragraphs: [
      'You place the crescent gear into the heart of the mechanism and turn the lantern’s handle. The clock resists, shudders, then moves. 5:18. 5:19. Every second returns like a small promise.',
      'The sky changes slowly from blue to silver to gold. Nera wakes to the ordinary miracle of time moving forward. The lantern goes dark, but a little warmth stays in your hands.',
      'Mara offers you the station keys. Not as a duty, she says, but as an invitation: someone should be here to welcome the next morning.'
    ],
    conditionalParagraphs: [
      { flag: 'curiosity', minimum: 1, text: 'The Queen’s letter is placed beside the clock, so no one forgets why the spell was made — or why it had to end.' },
      { flag: 'care', minimum: 1, text: 'The bell keeper promises to visit every morning. You will not have to keep watch alone.' }
    ],
    atmosphere: 'clockwork-morning',
    artwork: { key: 'ending-clockwork-sunrise', description: 'A grand brass clock turning at sunrise, with golden gears and the first sunlight entering the tower windows.', symbol: '⏰', caption: 'The Clockwork Dawn · every second is a beginning' },
    choices: []
  }
}
