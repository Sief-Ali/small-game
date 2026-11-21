import { useEffect, useMemo, useState } from 'react'
import { challenges } from '../data/challenges'
import { emptySave, readGameSave, writeGameSave } from '../lib/storage'
import type { GameSave } from '../types'

export function useGame() {
  const [save, setSave] = useState<GameSave>(readGameSave)
  const [screen, setScreen] = useState<'home' | 'game' | 'result'>('home')
  const [index, setIndex] = useState(0)
  const [showReaction, setShowReaction] = useState(false)

  useEffect(() => {
    writeGameSave(save)
  }, [save])

  const challenge = challenges[index]
  const selected = save.answers[challenge?.id]
  const chosen = challenge?.choices.find(choice => choice.id === selected)

  const discoveries = useMemo(() => {
    const counts: Record<string, number> = {}
    Object.entries(save.answers).forEach(([challengeId, choiceId]) => {
      const level = challenges.find(item => item.id === challengeId)
      const choice = level?.choices.find(item => item.id === choiceId)
      choice?.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
  }, [save.answers])

  const answered = Object.keys(save.answers).length
  const progress = Math.round((answered / challenges.length) * 100)

  function choose(choiceId: string) {
    if (!challenge) return
    setSave(current => ({
      ...current,
      answers: { ...current.answers, [challenge.id]: choiceId },
      completed: false
    }))
    setShowReaction(true)
  }

  function next() {
    setShowReaction(false)
    if (index === challenges.length - 1) {
      setSave(current => ({ ...current, completed: true }))
      setScreen('result')
      return
    }
    setIndex(current => current + 1)
  }

  function start() {
    const firstUnanswered = challenges.findIndex(item => !save.answers[item.id])
    setIndex(firstUnanswered === -1 ? 0 : firstUnanswered)
    setShowReaction(false)
    setScreen('game')
  }

  function restart() {
    setSave({ ...emptySave })
    setIndex(0)
    setShowReaction(false)
    setScreen('game')
  }

  return {
    save,
    screen,
    setScreen,
    index,
    challenge,
    selected,
    chosen,
    discoveries,
    answered,
    progress,
    showReaction,
    choose,
    next,
    start,
    restart
  }
}
