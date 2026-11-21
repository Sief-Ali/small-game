import type { StoryScene } from '../../../../src/modules/story-engine/types'
import { flags, signals } from '../helpers'

export const chapter04: Record<string, StoryScene> = {
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
