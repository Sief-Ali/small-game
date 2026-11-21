import type { StoryPassageSource } from '../../../../src/modules/story-engine/types'

export const chapter07: Record<string, StoryPassageSource> = {
  "Act3_Ch7_01_AutoTransition": {
    "id": "Act3_Ch7_01_AutoTransition",
    "chapterId": "ch-7",
    "kind": "auto",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [],
    "choices": [],
    "effects": [
      {
        "type": "chapter-started",
        "actId": "act-3",
        "chapterId": "ch-7"
      }
    ],
    "meaningful": false,
    "nextPassage": "Act3_Ch7_02_FinalChoice"
  },
  "Act3_Ch7_02_FinalChoice": {
    "id": "Act3_Ch7_02_FinalChoice",
    "chapterId": "ch-7",
    "kind": "choice",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "The shutters of the great aperture stand open. Dawn progress stands at {{stats.dawnProgress}}%.",
      "Choose how the city meets the coming light:"
    ],
    "choices": [
      {
        "id": "opt-release-dawn",
        "label": "Release the full solar arc and welcome morning",
        "nextPassage": "Ending_TrueDawn",
        "condition": {
          "type": "stat",
          "key": "dawnProgress",
          "operator": "gte",
          "value": 45
        }
      },
      {
        "id": "opt-preserve-dusk",
        "label": "Lock the shutters and preserve the familiar twilight",
        "nextPassage": "Ending_EternalDusk"
      },
      {
        "id": "opt-archive-frequency",
        "label": "Tune the chronometer to the hidden archive frequency",
        "nextPassage": "Ending_DarkArchive",
        "condition": {
          "type": "flag",
          "key": "hasVaultCipher",
          "equals": true
        }
      },
      {
        "id": "opt-force-eclipse",
        "label": "Force the uncalibrated drive to maximum load",
        "nextPassage": "Ending_AshEclipse",
        "condition": {
          "type": "all",
          "conditions": [
            {
              "type": "stat",
              "key": "dawnProgress",
              "operator": "lt",
              "value": 35
            },
            {
              "type": "not",
              "condition": {
                "type": "flag",
                "key": "hasVaultCipher",
                "equals": true
              }
            }
          ]
        }
      }
    ],
    "effects": [],
    "meaningful": true,
    "choiceGroupId": "choice-final-horizon"
  },
  "Ending_TrueDawn": {
    "id": "Ending_TrueDawn",
    "chapterId": "ch-7",
    "kind": "ending",
    "backgroundKey": "bg-first-sunrise",
    "paragraphs": [
      "Pale gold spills across the iron roofs, turning rain into silver and lanterns into quiet memory. For the first time in four hundred years, shadows stretch toward the west as dawn arrives in earnest.",
      "Ending Unlocked: When the Sky Remembers"
    ],
    "choices": [],
    "effects": [
      {
        "type": "ending-discovered",
        "endingId": "end-true-dawn",
        "title": "When the Sky Remembers"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-dawn-bringer"
      },
      {
        "type": "chapter-completed",
        "actId": "act-3",
        "chapterId": "ch-7"
      }
    ],
    "meaningful": false,
    "endingId": "end-true-dawn"
  },
  "Ending_EternalDusk": {
    "id": "Ending_EternalDusk",
    "chapterId": "ch-7",
    "kind": "ending",
    "backgroundKey": "bg-gilded-twilight",
    "paragraphs": [
      "The shutters settle back into place. Amber light hums steadily over the cobblestones—safe, predictable, and forever suspended at the edge of morning.",
      "Ending Unlocked: The Gilded Twilight"
    ],
    "choices": [],
    "effects": [
      {
        "type": "ending-discovered",
        "endingId": "end-eternal-dusk",
        "title": "The Gilded Twilight"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-master-of-twilight"
      },
      {
        "type": "chapter-completed",
        "actId": "act-3",
        "chapterId": "ch-7"
      }
    ],
    "meaningful": false,
    "endingId": "end-eternal-dusk"
  },
  "Ending_DarkArchive": {
    "id": "Ending_DarkArchive",
    "chapterId": "ch-7",
    "kind": "ending",
    "backgroundKey": "bg-secret-vault",
    "paragraphs": [
      "Guided by the founders' chronometer, the dome opens onto a quiet, starry vault of recorded centuries—keeping the city's true history safe until its people are ready to wake.",
      "Ending Unlocked: Vault of Unspoken Hours"
    ],
    "choices": [],
    "effects": [
      {
        "type": "ending-discovered",
        "endingId": "end-dark-archive",
        "title": "Vault of Unspoken Hours"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-shadow-archivist"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-master-of-twilight"
      },
      {
        "type": "chapter-completed",
        "actId": "act-3",
        "chapterId": "ch-7"
      }
    ],
    "meaningful": false,
    "endingId": "end-dark-archive"
  },
  "Ending_AshEclipse": {
    "id": "Ending_AshEclipse",
    "chapterId": "ch-7",
    "kind": "ending",
    "backgroundKey": "bg-foundry-alley",
    "paragraphs": [
      "Strained beyond calibration, the great gear shudders and locks with a dull iron thud. Ash drifts from the cooling vents as twilight settles back over a silent belfry, leaving another cycle for the city to rebuild.",
      "Ending Unlocked: Cinders Beneath the Bell"
    ],
    "choices": [],
    "effects": [
      {
        "type": "ending-discovered",
        "endingId": "end-ash-eclipse",
        "title": "Cinders Beneath the Bell"
      },
      {
        "type": "chapter-completed",
        "actId": "act-3",
        "chapterId": "ch-7"
      }
    ],
    "meaningful": false,
    "endingId": "end-ash-eclipse"
  }
}
