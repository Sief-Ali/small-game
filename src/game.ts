export type Choice = {
  id: string
  label: string
  emoji: string
  reaction: string
  tags: string[]
}
export type Challenge = {
  id: string
  title: string
  subtitle: string
  prompt: string
  emoji: string
  color: string
  choices: Choice[]
}

export const challenges: Challenge[] = [
  {
    id: 'zombie', title: 'The zombie situation', subtitle: 'A very normal Tuesday.',
    prompt: 'The zombie apocalypse starts. You have 10 seconds to grab ONE thing. Choose wisely-ish.',
    emoji: '🧟', color: 'peach',
    choices: [
      { id: 'pizza', label: 'A giant pizza', emoji: '🍕', reaction: 'Priorities are priorities. The zombies can wait until after lunch.', tags: ['foodie', 'comfort', 'chaotic'] },
      { id: 'bat', label: 'A baseball bat', emoji: '🏏', reaction: 'Practical. Prepared. Slightly concerning. We respect it.', tags: ['practical', 'bold'] },
      { id: 'phone', label: 'Your phone (3% battery)', emoji: '📱', reaction: 'You really said “if I go, my screen time goes with me.”', tags: ['social', 'optimistic'] },
      { id: 'cat', label: 'A suspiciously cute cat', emoji: '🐈', reaction: 'You have adopted a liability. It will probably be the team leader.', tags: ['soft-hearted', 'spontaneous'] }
    ]
  },
  {
    id: 'weekend', title: 'The perfect weekend', subtitle: 'No alarms. No responsibilities. Just vibes.',
    prompt: 'You have a completely free Saturday. What is the opening scene?',
    emoji: '🌤️', color: 'lavender',
    choices: [
      { id: 'sleep', label: 'Wake up whenever', emoji: '😴', reaction: 'A champion of rest. Your bed has officially filed a missing-person report.', tags: ['comfort', 'slow-living'] },
      { id: 'cafe', label: 'Cute café + good food', emoji: '🥐', reaction: 'A little treat enthusiast. Honestly, an excellent life philosophy.', tags: ['foodie', 'cozy'] },
      { id: 'explore', label: 'Go somewhere random', emoji: '🗺️', reaction: 'You enjoy a little plot twist in your calendar. Spontaneous energy detected.', tags: ['adventurous', 'spontaneous'] },
      { id: 'friends', label: 'See my favorite people', emoji: '🫶', reaction: 'People time recharges your battery. Your group chat is thriving.', tags: ['social', 'connection'] }
    ]
  },
  {
    id: 'millionaire', title: 'Rich for absolutely no reason', subtitle: 'Your accountant is not invited.',
    prompt: 'A mysterious stranger gives you $1,000,000. What gets your attention FIRST?',
    emoji: '💸', color: 'mint',
    choices: [
      { id: 'travel', label: 'Book a one-way adventure', emoji: '✈️', reaction: 'Passport ready before the money even clears. Main-character behavior.', tags: ['adventurous', 'experiences'] },
      { id: 'home', label: 'Build the dream home', emoji: '🏡', reaction: 'You know what you like: your own space, your own rules, excellent pillows.', tags: ['comfort', 'stability'] },
      { id: 'shopping', label: 'A completely unnecessary shopping spree', emoji: '🛍️', reaction: 'The “I’m just looking” era is officially over.', tags: ['aesthetic', 'spontaneous'] },
      { id: 'family', label: 'Make life easier for my people', emoji: '💛', reaction: 'Plot twist: the first luxury is seeing your people happy.', tags: ['generous', 'connection'] }
    ]
  },
  {
    id: 'pet', title: 'Choose your tiny roommate', subtitle: 'Rent is paid in snacks.',
    prompt: 'You can adopt ONE of these slightly suspicious creatures. Who moves in?',
    emoji: '🐾', color: 'blue',
    choices: [
      { id: 'duck', label: 'A duck with main-character energy', emoji: '🦆', reaction: 'It will follow you everywhere and judge every outfit. Iconic roommate.', tags: ['playful', 'chaotic'] },
      { id: 'dragon', label: 'A tiny dragon that sneezes glitter', emoji: '🐉', reaction: 'Your home is now a fire hazard with excellent ambiance.', tags: ['imaginative', 'playful'] },
      { id: 'cat', label: 'A cat that pays no rent', emoji: '🐈', reaction: 'You will serve this creature for the next 15 years. You know this.', tags: ['soft-hearted', 'comfort'] },
      { id: 'ghost', label: 'A friendly ghost who does chores', emoji: '👻', reaction: 'Finally, affordable domestic help. The ghost has excellent references.', tags: ['practical', 'imaginative'] }
    ]
  },
  {
    id: 'date', title: 'The awkward plot twist', subtitle: 'This is why we can’t have normal days.',
    prompt: 'You arrive at a cute café and discover there is a karaoke machine, a live audience, and your name on the sign-up list. What now?',
    emoji: '🎤', color: 'pink',
    choices: [
      { id: 'sing', label: 'Own the stage. Obviously.', emoji: '🎶', reaction: 'The crowd came for coffee and left with a concert memory.', tags: ['bold', 'playful', 'social'] },
      { id: 'duet', label: 'Recruit someone for a duet', emoji: '🎤', reaction: 'Never face public embarrassment alone. Teamwork makes the dream work.', tags: ['social', 'connection'] },
      { id: 'escape', label: 'Find the nearest emergency exit', emoji: '🏃', reaction: 'A tactical retreat. The audience will simply have to live with the mystery.', tags: ['reserved', 'practical'] },
      { id: 'bribe', label: 'Offer the DJ a snack to delete the list', emoji: '🍪', reaction: 'Negotiation skills: 10/10. The cookie economy is thriving.', tags: ['clever', 'comfort'] }
    ]
  }
]

export const tagLabels: Record<string, string> = {
  foodie: 'certified snack enthusiast', comfort: 'team cozy', chaotic: 'a little chaotic (respectfully)',
  practical: 'surprisingly practical', bold: 'secretly fearless', social: 'people-person energy',
  optimistic: 'optimism over battery percentage', soft-hearted: 'soft spot for cute things',
  spontaneous: 'plot-twist enjoyer', 'slow-living': 'professional relaxer', cozy: 'cozy-core',
  adventurous: 'curious explorer', connection: 'quality-time appreciator', experiences: 'memory collector',
  stability: 'comfort-zone architect', aesthetic: 'style curator', generous: 'big-hearted energy',
  playful: 'playful spirit', imaginative: 'creative little universe', reserved: 'low-key legend', clever: 'resourceful thinker'
}