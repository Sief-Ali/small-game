import type { StoryPassageSource } from '../../../../src/modules/story-engine/types'

export const chapter01: Record<string, StoryPassageSource> = {
  "Act1_Ch1_01_Arrival": {
    "id": "Act1_Ch1_01_Arrival",
    "chapterId": "ch-1",
    "kind": "narrative",
    "backgroundKey": "bg-iron-street-dusk",
    "paragraphs": [
      "Rain beads on cast-iron streetlamps that have burned for four hundred winters. Above the rooftops, the sky hangs in a permanent bruise of violet and amber—the hour before sunrise, frozen mid-breath.",
      "Nobody in the city remembers what true daylight looks like, only the songs sung when the great clock tower on Meridian Ridge last chimed twelve. Tonight, the brass weathervanes along Iron Street hum with a low, metallic vibration as if the sky itself were testing a lock."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch1_02_MarketChoice",
        "label": "Step beneath the awning of the Night Market",
        "nextPassage": "Act1_Ch1_02_MarketChoice"
      }
    ],
    "effects": [
      {
        "type": "chapter-started",
        "actId": "act-1",
        "chapterId": "ch-1"
      }
    ],
    "meaningful": false
  },
  "Act1_Ch1_02_MarketChoice": {
    "id": "Act1_Ch1_02_MarketChoice",
    "chapterId": "ch-1",
    "kind": "choice",
    "backgroundKey": "bg-night-market",
    "paragraphs": [
      "Under canvas tarps strung between rusted cranes, merchants trade pressurized coal canisters, glass eyes, and scraps of pre-dusk parchment. A courier with brass-rimmed goggles watches you from beside a steaming noodle cart while steam vents hiss against wet cobblestones.",
      "What do you do first?"
    ],
    "choices": [
      {
        "id": "opt-ask-courier",
        "label": "Speak with Vesper, the goggle-wearing courier, about the Solar Pendulum",
        "nextPassage": "Act1_Ch1_03_AskCourier"
      },
      {
        "id": "opt-foundry-alley",
        "label": "Slip through the back alley toward the old foundry",
        "nextPassage": "Act1_Ch1_04_FoundryAlley"
      },
      {
        "id": "opt-gate-seal",
        "label": "Present a Meridian seal at the upper market gate",
        "nextPassage": "Act1_Ch1_05_GateSeal",
        "condition": {
          "type": "any",
          "conditions": [
            {
              "type": "flag",
              "key": "usedMeridianSeal",
              "equals": true
            },
            {
              "type": "stat",
              "key": "dawnProgress",
              "operator": "gte",
              "value": 15
            }
          ]
        }
      }
    ],
    "effects": [
      {
        "type": "quest-started",
        "questId": "q-find-pendulum"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-find-pendulum",
        "objectiveId": "obj-search-market",
        "delta": 1
      },
      {
        "type": "set-flag",
        "key": "inspectedMarket",
        "value": true
      }
    ],
    "meaningful": true,
    "choiceGroupId": "choice-market-approach"
  },
  "Act1_Ch1_03_AskCourier": {
    "id": "Act1_Ch1_03_AskCourier",
    "chapterId": "ch-1",
    "kind": "event",
    "backgroundKey": "bg-courier-stall",
    "paragraphs": [
      "\"You're chasing ghosts in copper,\" Vesper murmurs, sliding a heavy cipher key across the wet counter. \"The foundry men took the Solar Pendulum down after the last tremor. Keep your voice low—the Syndicate listens through the steam pipes.\""
    ],
    "choices": [
      {
        "id": "go-Act1_Ch1_03b_CourierWarning",
        "label": "Continue along the wet market row",
        "nextPassage": "Act1_Ch1_03b_CourierWarning"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "metVesper",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "trustWatch",
        "amount": 15
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 10
      },
      {
        "type": "add-item",
        "item": "Brass Cipher Key"
      },
      {
        "type": "relationship-changed",
        "character": "vesper",
        "delta": 15
      },
      {
        "type": "quest-started",
        "questId": "q-unseal-chronometer"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-unseal-chronometer",
        "objectiveId": "obj-cipher-key",
        "delta": 1
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-first-spark"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-iron-diplomat"
      }
    ],
    "meaningful": false
  },
  "Act1_Ch1_03b_CourierWarning": {
    "id": "Act1_Ch1_03b_CourierWarning",
    "chapterId": "ch-1",
    "kind": "narrative",
    "backgroundKey": "bg-courier-stall",
    "paragraphs": [
      "Vesper taps the teeth of the cipher key against a ceramic cup. \"The key opens the old observatory sub-niche, not the foundry gates. If you want in quiet, watch the shift-change bells at the crossroads.\""
    ],
    "choices": [
      {
        "id": "go-Act1_Ch1_06_Checkpoint",
        "label": "Head to Iron Street Crossroads",
        "nextPassage": "Act1_Ch1_06_Checkpoint"
      }
    ],
    "effects": [],
    "meaningful": false
  },
  "Act1_Ch1_04_FoundryAlley": {
    "id": "Act1_Ch1_04_FoundryAlley",
    "chapterId": "ch-1",
    "kind": "event",
    "backgroundKey": "bg-foundry-alley",
    "paragraphs": [
      "You bypass the main gate through a drainage arch smelling of ozone and tallow. A ledger left beside a cooling furnace lists every lamp post in the lower ward—and the exact hour each one was dimmed to save fuel."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch1_04b_AlleyClue",
        "label": "Inspect the furnace markings before moving on",
        "nextPassage": "Act1_Ch1_04b_AlleyClue"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "usedDrainageRoute",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "trustSyndicate",
        "amount": 15
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 5
      },
      {
        "type": "add-item",
        "item": "Oil Ration Ledger"
      },
      {
        "type": "relationship-changed",
        "character": "syndicate",
        "delta": 15
      },
      {
        "type": "quest-started",
        "questId": "q-keep-lanterns"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-keep-lanterns",
        "objectiveId": "obj-oil-ledger",
        "delta": 1
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-first-spark"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-iron-diplomat"
      }
    ],
    "meaningful": false
  },
  "Act1_Ch1_04b_AlleyClue": {
    "id": "Act1_Ch1_04b_AlleyClue",
    "chapterId": "ch-1",
    "kind": "narrative",
    "backgroundKey": "bg-foundry-alley",
    "paragraphs": [
      "Chalk marks beside the drainage grate show that the pendulum's counterweight was lowered into the foundry pit to keep the central turbine spinning."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch1_06_Checkpoint",
        "label": "Head to Iron Street Crossroads",
        "nextPassage": "Act1_Ch1_06_Checkpoint"
      }
    ],
    "effects": [
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 5
      }
    ],
    "meaningful": false
  },
  "Act1_Ch1_05_GateSeal": {
    "id": "Act1_Ch1_05_GateSeal",
    "chapterId": "ch-1",
    "kind": "conditional",
    "backgroundKey": "bg-market-gate",
    "paragraphs": [
      "The wardens part ranks at the sight of the Meridian seal, granting you unhurried passage toward the ridge while lanterns cast long amber reflections across the wet stone."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch1_06_Checkpoint",
        "label": "Head to Iron Street Crossroads",
        "nextPassage": "Act1_Ch1_06_Checkpoint"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "usedMeridianSeal",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 20
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
  "Act1_Ch1_06_Checkpoint": {
    "id": "Act1_Ch1_06_Checkpoint",
    "chapterId": "ch-1",
    "kind": "checkpoint",
    "backgroundKey": "bg-crossroads-lanterns",
    "paragraphs": [
      "At Iron Street Crossroads, iron signposts creak in the damp wind. Ahead lie the heavy smelting doors of the lower foundry and the winding switchbacks climbing toward the ridge."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch2_01_FoundryEntry",
        "label": "Descend into Chapter 2: The Foundry Below the Bell",
        "nextPassage": "Act1_Ch2_01_FoundryEntry"
      }
    ],
    "effects": [
      {
        "type": "checkpoint-reached",
        "checkpointId": "cp-iron-street",
        "label": "Iron Street Crossroads"
      },
      {
        "type": "chapter-completed",
        "actId": "act-1",
        "chapterId": "ch-1"
      }
    ],
    "meaningful": false,
    "checkpointId": "cp-iron-street"
  }
}
