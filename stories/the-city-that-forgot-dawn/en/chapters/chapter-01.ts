import type { StoryScene } from '../../../../src/modules/choose-your-chaos/types'
import { flags, signals } from '../helpers'

export const chapter01: Record<string, StoryScene> = {
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
  }
}
