export type StoryFlag =
  | 'curiosity'
  | 'kindness'
  | 'courage'
  | 'care'
  | 'community'
  | 'wonder'

export type StorySignal =
  | 'connection'
  | 'adventure'
  | 'comfort'
  | 'independence'
  | 'generosity'
  | 'curiosity'
  | 'novelty'
  | 'stability'

export type StoryArtwork = {
  key: string
  description: string
  symbol: string
  caption: string
}

export type StoryCondition = {
  flag: StoryFlag
  minimum: number
  text: string
}

export type StoryQuestionDefinition = {
  key: string
  category: string
  note?: string
}

export type StoryChoice = {
  id: string
  label: string
  detail: string
  icon: string
  nextScene: string
  flags?: Partial<Record<StoryFlag, number>>
  signals?: Partial<Record<StorySignal, number>>
}

export type StoryScene = {
  id: string
  chapter: number
  chapterTitle: string
  kind: 'story' | 'event' | 'question' | 'ending'
  kicker: string
  title: string
  paragraphs: string[]
  atmosphere: string
  artwork: StoryArtwork
  choices: StoryChoice[]
  conditionalParagraphs?: StoryCondition[]
  question?: StoryQuestionDefinition
  endingTitle?: string
  endingSubtitle?: string
}

export type StoryHistoryEntry = {
  sceneId: string
  choiceId: string
}

export type StorySave = {
  currentSceneId: string
  history: StoryHistoryEntry[]
  flags: Record<StoryFlag, number>
  signals: Partial<Record<StorySignal, number>>
  completed: boolean
  endingSceneId?: string
}
