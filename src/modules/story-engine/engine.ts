import type {
  StoryCondition,
  StoryDefinition,
  StoryPassage,
  StorySave,
  StoryQuestProgress
} from './types'

export function evaluateStoryCondition(
  condition: StoryCondition | undefined,
  save: StorySave
): boolean {
  if (!condition) return true

  switch (condition.type) {
    case 'all':
      return condition.conditions.every(item => evaluateStoryCondition(item, save))
    case 'any':
      return condition.conditions.some(item => evaluateStoryCondition(item, save))
    case 'not':
      return !evaluateStoryCondition(condition.condition, save)
    case 'flag':
      return (save.flags[condition.key] ?? false) === condition.equals
    case 'inventory':
      return save.inventory.includes(condition.item) === condition.contains
    case 'stat': {
      const value = save.stats[condition.key] ?? 0
      switch (condition.operator) {
        case 'gt': return value > condition.value
        case 'gte': return value >= condition.value
        case 'lt': return value < condition.value
        case 'lte': return value <= condition.value
        case 'eq': return value === condition.value
      }
    }
  }
}

export function getAvailableChoices(passage: StoryPassage, save: StorySave) {
  return passage.choices.filter(choice => evaluateStoryCondition(choice.condition, save))
}

function createQuestProgress(story: StoryDefinition): Record<string, StoryQuestProgress> {
  return Object.fromEntries(
    story.quests.map(quest => [
      quest.id,
      {
        status: 'locked' as const,
        objectives: Object.fromEntries(quest.objectives.map(objective => [objective.id, 0]))
      }
    ])
  )
}

function addUnique(items: string[], item: string) {
  return items.includes(item) ? items : [...items, item]
}

function applyPassageEffects(
  story: StoryDefinition,
  save: StorySave,
  passage: StoryPassage
): StorySave {
  if (save.visitedPassages.includes(passage.id)) return save

  let next: StorySave = {
    ...save,
    visitedPassages: [...save.visitedPassages, passage.id]
  }

  for (const effect of passage.effects) {
    switch (effect.type) {
      case 'set-flag':
        next = { ...next, flags: { ...next.flags, [effect.key]: effect.value } }
        break

      case 'increment-stat':
        next = {
          ...next,
          stats: {
            ...next.stats,
            [effect.key]: (next.stats[effect.key] ?? 0) + effect.amount
          }
        }
        break

      case 'add-item':
        next = { ...next, inventory: addUnique(next.inventory, effect.item) }
        break

      case 'chapter-started':
        next = {
          ...next,
          currentActId: effect.actId,
          currentChapterId: effect.chapterId
        }
        break

      case 'chapter-completed':
        next = {
          ...next,
          completedChapterIds: addUnique(next.completedChapterIds, effect.chapterId)
        }
        break

      case 'quest-started': {
        const current = next.quests[effect.questId]
        if (!current || current.status === 'locked') {
          next = {
            ...next,
            quests: {
              ...next.quests,
              [effect.questId]: current
                ? { ...current, status: 'active' }
                : { status: 'active', objectives: {} }
            }
          }
        }
        break
      }

      case 'quest-objective-updated': {
        const current = next.quests[effect.questId] ?? { status: 'active' as const, objectives: {} }
        const quest = story.quests.find(item => item.id === effect.questId)
        const objective = quest?.objectives.find(item => item.id === effect.objectiveId)
        const previous = current.objectives[effect.objectiveId] ?? 0
        const updated = objective
          ? Math.min(objective.count, previous + effect.delta)
          : previous + effect.delta
        next = {
          ...next,
          quests: {
            ...next.quests,
            [effect.questId]: {
              ...current,
              objectives: { ...current.objectives, [effect.objectiveId]: updated }
            }
          }
        }
        break
      }

      case 'quest-completed': {
        const current = next.quests[effect.questId] ?? { status: 'active' as const, objectives: {} }
        const quest = story.quests.find(item => item.id === effect.questId)
        const rewards = quest?.rewards
        next = {
          ...next,
          quests: {
            ...next.quests,
            [effect.questId]: { ...current, status: 'completed' }
          },
          score: next.score + (rewards?.score ?? 0),
          inventory: rewards?.item ? addUnique(next.inventory, rewards.item) : next.inventory
        }
        break
      }

      case 'relationship-changed':
        next = {
          ...next,
          relationships: {
            ...next.relationships,
            [effect.character]: (next.relationships[effect.character] ?? 0) + effect.delta
          }
        }
        break

      case 'achievement-unlocked':
        next = { ...next, achievements: addUnique(next.achievements, effect.achievementId) }
        break

      case 'checkpoint-reached':
        next = { ...next, checkpointId: effect.checkpointId }
        break

      case 'ending-discovered':
        next = {
          ...next,
          endingId: effect.endingId,
          discoveredEndings: addUnique(next.discoveredEndings, effect.endingId),
          completed: true,
          endingSceneId: passage.id
        }
        break
    }
  }

  if (passage.kind === 'ending') {
    next = {
      ...next,
      completed: true,
      endingSceneId: passage.id,
      endingId: passage.endingId ?? next.endingId
    }
  }

  return next
}

/** Applies entry effects once and immediately follows any automatic passages. */
export function enterStoryPassage(
  story: StoryDefinition,
  save: StorySave,
  passageId: string
): StorySave {
  let next = { ...save, currentSceneId: passageId }
  let guard = 0

  while (guard < 20) {
    guard += 1
    const passage = story.passages[next.currentSceneId]
    if (!passage) return next

    next = applyPassageEffects(story, next, passage)
    if (passage.kind !== 'auto' || !passage.nextPassage) return next

    next = {
      ...next,
      history: [...next.history, { sceneId: passage.id, choiceId: 'auto' }],
      currentSceneId: passage.nextPassage
    }
  }

  console.error('Automatic passage chain exceeded the safety limit.')
  return next
}

export function createInitialStorySave(story: StoryDefinition): StorySave {
  const base: StorySave = {
    schemaVersion: 3,
    currentSceneId: story.startPassageId,
    history: [],
    flags: { ...story.initialState.flags },
    stats: { ...story.initialState.stats },
    inventory: [...story.initialState.inventory],
    quests: createQuestProgress(story),
    relationships: {},
    achievements: [],
    currentActId: story.acts[0]?.id ?? '',
    currentChapterId: story.chapters[0]?.id ?? '',
    completedChapterIds: [],
    discoveredEndings: [],
    visitedPassages: [],
    score: 0,
    completed: false
  }

  return enterStoryPassage(story, base, story.startPassageId)
}

export function transitionStory(
  story: StoryDefinition,
  save: StorySave,
  passage: StoryPassage,
  choiceId: string
): StorySave | null {
  const choice = getAvailableChoices(passage, save).find(item => item.id === choiceId)
  if (!choice || !story.passages[choice.nextPassage]) return null

  const next: StorySave = {
    ...save,
    currentSceneId: choice.nextPassage,
    history: [...save.history, { sceneId: passage.id, choiceId: choice.id }]
  }

  return enterStoryPassage(story, next, choice.nextPassage)
}

export function getStoryProgress(passage: StoryPassage, totalChapters: number): number {
  if (passage.kind === 'ending') return 100
  return Math.min(95, Math.round(((passage.chapter - 1) / Math.max(totalChapters, 1)) * 95))
}

export type StoryValidationIssue = {
  code:
    | 'missing-start'
    | 'missing-target'
    | 'key-id-mismatch'
    | 'duplicate-choice'
    | 'invalid-chapter'
    | 'ending-has-choices'
    | 'auto-without-target'
    | 'unreachable-passage'
    | 'unknown-quest'
    | 'unknown-achievement'
  message: string
  passageId?: string
}

export function validateStoryDefinition(story: StoryDefinition): StoryValidationIssue[] {
  const issues: StoryValidationIssue[] = []
  if (!story.passages[story.startPassageId]) {
    issues.push({ code: 'missing-start', message: `Start passage "${story.startPassageId}" does not exist.` })
  }

  const questIds = new Set(story.quests.map(item => item.id))
  const achievementIds = new Set(story.achievements.map(item => item.id))

  for (const [key, passage] of Object.entries(story.passages)) {
    if (key !== passage.id) {
      issues.push({
        code: 'key-id-mismatch',
        passageId: passage.id,
        message: `Passage map key "${key}" does not match passage id "${passage.id}".`
      })
    }

    if (!Number.isInteger(passage.chapter) || passage.chapter < 1 || passage.chapter > story.totalChapters) {
      issues.push({
        code: 'invalid-chapter',
        passageId: passage.id,
        message: `Passage "${passage.id}" has an invalid chapter number.`
      })
    }

    if (passage.kind === 'ending' && passage.choices.length > 0) {
      issues.push({
        code: 'ending-has-choices',
        passageId: passage.id,
        message: `Ending "${passage.id}" must not have outgoing choices.`
      })
    }

    if (passage.kind === 'auto' && !passage.nextPassage) {
      issues.push({
        code: 'auto-without-target',
        passageId: passage.id,
        message: `Automatic passage "${passage.id}" has no next passage.`
      })
    }

    const choiceIds = new Set<string>()
    for (const choice of passage.choices) {
      if (choiceIds.has(choice.id)) {
        issues.push({
          code: 'duplicate-choice',
          passageId: passage.id,
          message: `Passage "${passage.id}" has duplicate choice id "${choice.id}".`
        })
      }
      choiceIds.add(choice.id)
      if (!story.passages[choice.nextPassage]) {
        issues.push({
          code: 'missing-target',
          passageId: passage.id,
          message: `Choice "${choice.id}" points to missing passage "${choice.nextPassage}".`
        })
      }
    }

    if (passage.nextPassage && !story.passages[passage.nextPassage]) {
      issues.push({
        code: 'missing-target',
        passageId: passage.id,
        message: `Passage "${passage.id}" points to missing passage "${passage.nextPassage}".`
      })
    }

    for (const effect of passage.effects) {
      if (effect.type === 'quest-started' || effect.type === 'quest-completed' || effect.type === 'quest-objective-updated') {
        if (!questIds.has(effect.questId)) {
          issues.push({
            code: 'unknown-quest',
            passageId: passage.id,
            message: `Passage "${passage.id}" references unknown quest "${effect.questId}".`
          })
        }
      }
      if (effect.type === 'achievement-unlocked' && !achievementIds.has(effect.achievementId)) {
        issues.push({
          code: 'unknown-achievement',
          passageId: passage.id,
          message: `Passage "${passage.id}" references unknown achievement "${effect.achievementId}".`
        })
      }
    }
  }

  const reachable = new Set<string>()
  const pending = [story.startPassageId]
  while (pending.length) {
    const id = pending.pop()!
    if (reachable.has(id)) continue
    reachable.add(id)
    const passage = story.passages[id]
    if (!passage) continue
    for (const choice of passage.choices) pending.push(choice.nextPassage)
    if (passage.nextPassage) pending.push(passage.nextPassage)
  }

  for (const id of Object.keys(story.passages)) {
    if (!reachable.has(id)) {
      issues.push({
        code: 'unreachable-passage',
        passageId: id,
        message: `Passage "${id}" cannot be reached from the story start.`
      })
    }
  }

  return issues
}
