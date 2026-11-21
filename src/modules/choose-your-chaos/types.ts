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

export type GameSave = {
  name: string
  answers: Record<string, string>
  completed: boolean
}

export type Discovery = [tag: string, count: number]
