export type StoryPassageKind =
  | 'narrative'
  | 'choice'
  | 'event'
  | 'conditional'
  | 'checkpoint'
  | 'auto'
  | 'ending'

export type StoryCondition =
  | { type: 'all' | 'any'; conditions: StoryCondition[] }
  | { type: 'not'; condition: StoryCondition }
  | { type: 'flag'; key: string; equals: boolean }
  | { type: 'inventory'; item: string; contains: boolean }
  | {
      type: 'stat'
      key: string
      operator: 'gt' | 'gte' | 'lt' | 'lte' | 'eq'
      value: number
    }

export type StoryChoice = {
  id: string
  label: string
  nextPassage: string
  condition?: StoryCondition
}

export type StoryEffect =
  | { type: 'set-flag'; key: string; value: boolean }
  | { type: 'increment-stat'; key: string; amount: number }
  | { type: 'add-item'; item: string }
  | { type: 'chapter-started' | 'chapter-completed'; actId: string; chapterId: string }
  | { type: 'quest-started' | 'quest-completed'; questId: string }
  | { type: 'quest-objective-updated'; questId: string; objectiveId: string; delta: number }
  | { type: 'relationship-changed'; character: string; delta: number }
  | { type: 'achievement-unlocked'; achievementId: string }
  | { type: 'checkpoint-reached'; checkpointId: string; label: string }
  | { type: 'ending-discovered'; endingId: string; title: string }

export type StoryArtwork = {
  key: string
  description: string
  symbol: string
  caption: string
}

export type StoryPassageSource = {
  id: string
  chapterId: string
  kind: StoryPassageKind
  backgroundKey: string
  paragraphs: string[]
  choices: StoryChoice[]
  effects: StoryEffect[]
  meaningful: boolean
  choiceGroupId?: string
  nextPassage?: string
  checkpointId?: string
  endingId?: string
}

export type StoryPassage = StoryPassageSource & {
  actId: string
  chapter: number
  kicker: string
  title: string
  atmosphere: string
  artwork: StoryArtwork
}

export type StoryAct = {
  id: string
  title: string
  chapters: string[]
}

export type StoryChapter = {
  id: string
  actId: string
  title: string
}

export type StoryQuestObjective = {
  id: string
  text: string
  count: number
}

export type StoryQuestDefinition = {
  id: string
  title: string
  description: string
  hidden: boolean
  objectives: StoryQuestObjective[]
  rewards?: { score?: number; item?: string }
}

export type StoryAchievementDefinition = {
  id: string
  title: string
  description: string
  hidden: boolean
  category: string
  scope: 'playthrough' | 'permanent'
}

export type StoryCheckpointDefinition = {
  id: string
  label: string
  actId: string
  chapterId: string
}

export type StoryEndingDefinition = {
  id: string
  title: string
  type: 'good' | 'neutral' | 'secret' | 'tragic' | string
}

export type StoryDefinition = {
  id: string
  title: string
  version: string
  languages: string[]
  startPassageId: string
  totalActs: number
  totalChapters: number
  tagColors: Record<string, string>
  acts: StoryAct[]
  chapters: StoryChapter[]
  quests: StoryQuestDefinition[]
  achievements: StoryAchievementDefinition[]
  checkpoints: StoryCheckpointDefinition[]
  endings: StoryEndingDefinition[]
  presentation: {
    theme: string
    defaultBackgroundKey: string
    ambientAudio?: string
  }
  initialState: {
    flags: Record<string, boolean>
    stats: Record<string, number>
    inventory: string[]
  }
  passages: Record<string, StoryPassage>
}

export type StoryQuestProgress = {
  status: 'locked' | 'active' | 'completed'
  objectives: Record<string, number>
}

export type StoryHistoryEntry = {
  sceneId: string
  choiceId: string
}

export type StorySave = {
  schemaVersion: 3
  currentSceneId: string
  history: StoryHistoryEntry[]
  flags: Record<string, boolean>
  stats: Record<string, number>
  inventory: string[]
  quests: Record<string, StoryQuestProgress>
  relationships: Record<string, number>
  achievements: string[]
  currentActId: string
  currentChapterId: string
  completedChapterIds: string[]
  checkpointId?: string
  discoveredEndings: string[]
  endingId?: string
  visitedPassages: string[]
  score: number
  completed: boolean
  endingSceneId?: string
}
