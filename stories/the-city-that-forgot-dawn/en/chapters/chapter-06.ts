import type { StoryPassageSource } from '../../../../src/modules/story-engine/types'

export const chapter06: Record<string, StoryPassageSource> = {
  "Act3_Ch6_01_CourtEntry": {
    "id": "Act3_Ch6_01_CourtEntry",
    "chapterId": "ch-6",
    "kind": "narrative",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "Around the central sun-dial terrace gather voices from across the city: Vesper's couriers on the west ramp, Syndicate engineers by the steam vents, and the bell-ringers near the bronze tower."
    ],
    "choices": [
      {
        "id": "go-Act3_Ch6_02_CourtChoice",
        "label": "Step onto the sun-dial terrace",
        "nextPassage": "Act3_Ch6_02_CourtChoice"
      }
    ],
    "effects": [
      {
        "type": "chapter-started",
        "actId": "act-3",
        "chapterId": "ch-6"
      }
    ],
    "meaningful": false
  },
  "Act3_Ch6_02_CourtChoice": {
    "id": "Act3_Ch6_02_CourtChoice",
    "chapterId": "ch-6",
    "kind": "choice",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "The sun-dial gnomon casts a long, trembling shadow across twelve carved hours. Everyone looks to you before the final mechanism engages.",
      "How do you rally the terrace?"
    ],
    "choices": [
      {
        "id": "opt-rally-morning",
        "label": "Call for an open morning shared by every ward alike",
        "nextPassage": "Act3_Ch6_03_RallyMorning"
      },
      {
        "id": "opt-rally-twilight",
        "label": "Ask the city to honor the twilight that kept them warm for four centuries",
        "nextPassage": "Act3_Ch6_04_RallyTwilight"
      }
    ],
    "effects": [],
    "meaningful": true,
    "choiceGroupId": "choice-sundial-court"
  },
  "Act3_Ch6_03_RallyMorning": {
    "id": "Act3_Ch6_03_RallyMorning",
    "chapterId": "ch-6",
    "kind": "event",
    "backgroundKey": "bg-first-sunrise",
    "paragraphs": [
      "\"Four hundred winters is long enough to live by candlelight,\" you say. A murmur rises across the terrace as eyes turn east."
    ],
    "choices": [
      {
        "id": "go-Act3_Ch6_05_Checkpoint",
        "label": "Reach the Sun-Dial Court Sanctum",
        "nextPassage": "Act3_Ch6_05_Checkpoint"
      }
    ],
    "effects": [
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 15
      },
      {
        "type": "increment-stat",
        "key": "trustWatch",
        "amount": 10
      },
      {
        "type": "relationship-changed",
        "character": "vesper",
        "delta": 10
      }
    ],
    "meaningful": false
  },
  "Act3_Ch6_04_RallyTwilight": {
    "id": "Act3_Ch6_04_RallyTwilight",
    "chapterId": "ch-6",
    "kind": "event",
    "backgroundKey": "bg-gilded-twilight",
    "paragraphs": [
      "\"We built a life inside this amber hush—don't throw away what holds us together,\" you say. Heads nod along the iron railing."
    ],
    "choices": [
      {
        "id": "go-Act3_Ch6_05_Checkpoint",
        "label": "Reach the Sun-Dial Court Sanctum",
        "nextPassage": "Act3_Ch6_05_Checkpoint"
      }
    ],
    "effects": [
      {
        "type": "increment-stat",
        "key": "trustSyndicate",
        "amount": 10
      },
      {
        "type": "increment-stat",
        "key": "trustBellkeepers",
        "amount": 10
      },
      {
        "type": "relationship-changed",
        "character": "syndicate",
        "delta": 10
      }
    ],
    "meaningful": false
  },
  "Act3_Ch6_05_Checkpoint": {
    "id": "Act3_Ch6_05_Checkpoint",
    "chapterId": "ch-6",
    "kind": "checkpoint",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "The final lever stands ready before the great aperture."
    ],
    "choices": [
      {
        "id": "go-Act3_Ch7_01_AutoTransition",
        "label": "Enter Chapter 7: First Light or Endless Night",
        "nextPassage": "Act3_Ch7_01_AutoTransition"
      }
    ],
    "effects": [
      {
        "type": "checkpoint-reached",
        "checkpointId": "cp-sundial-court",
        "label": "Sun-Dial Court Sanctum"
      },
      {
        "type": "chapter-completed",
        "actId": "act-3",
        "chapterId": "ch-6"
      }
    ],
    "meaningful": false,
    "checkpointId": "cp-sundial-court"
  }
}
