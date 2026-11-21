export type StoryRuntimeEvent =
  | { source: 'choose-your-chaos'; type: 'runtime-ready' }
  | {
      source: 'choose-your-chaos'
      type: 'passage-displayed'
      passage: string
      tags: string[]
      historyLength: number
    }
  | {
      source: 'choose-your-chaos'
      type: 'choice-selected'
      targetPassage: string
      label: string
    }

export function isStoryRuntimeEvent(value: unknown): value is StoryRuntimeEvent {
  if (!value || typeof value !== 'object') return false

  const event = value as Record<string, unknown>
  if (event.source !== 'choose-your-chaos' || typeof event.type !== 'string') return false

  switch (event.type) {
    case 'runtime-ready':
      return true
    case 'passage-displayed':
      return (
        typeof event.passage === 'string' &&
        Array.isArray(event.tags) &&
        event.tags.every(tag => typeof tag === 'string') &&
        typeof event.historyLength === 'number'
      )
    case 'choice-selected':
      return typeof event.targetPassage === 'string' && typeof event.label === 'string'
    default:
      return false
  }
}
