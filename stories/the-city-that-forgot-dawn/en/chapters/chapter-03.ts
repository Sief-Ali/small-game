import type { StoryPassageSource } from '../../../../src/modules/story-engine/types'

export const chapter03: Record<string, StoryPassageSource> = {
  "Act1_Ch3_01_ConduitStart": {
    "id": "Act1_Ch3_01_ConduitStart",
    "chapterId": "ch-3",
    "kind": "narrative",
    "backgroundKey": "bg-steam-conduit",
    "paragraphs": [
      "Pressurized pipes snake along arched brick tunnels, carrying voices and distant bell-tolls across the city. Halfway down the gallery stands the Belfry Landing, where the Chief Bell-Ringer tends the tuning forks."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch3_02_BelfryChoice",
        "label": "Approach the Belfry Landing",
        "nextPassage": "Act1_Ch3_02_BelfryChoice"
      }
    ],
    "effects": [
      {
        "type": "chapter-started",
        "actId": "act-1",
        "chapterId": "ch-3"
      },
      {
        "type": "quest-started",
        "questId": "q-bell-pact"
      }
    ],
    "meaningful": false
  },
  "Act1_Ch3_02_BelfryChoice": {
    "id": "Act1_Ch3_02_BelfryChoice",
    "chapterId": "ch-3",
    "kind": "choice",
    "backgroundKey": "bg-steam-conduit",
    "paragraphs": [
      "The Chief Bell-Ringer pauses beside a row of iron resonators. \"The clock hasn't chimed noon in four hundred years,\" she says. \"Some want the chime to wake the sun; others fear what happens when the bells stop counting the twilight.\"",
      "How do you answer?"
    ],
    "choices": [
      {
        "id": "opt-promise-chime",
        "label": "Promise to ring all twelve bells once the pendulum is restored",
        "nextPassage": "Act1_Ch3_03_PromiseChime"
      },
      {
        "id": "opt-hold-bells",
        "label": "Ask her to hold the bells steady until the lower wards are safe",
        "nextPassage": "Act1_Ch3_04_HoldBells"
      },
      {
        "id": "opt-compare-cipher",
        "label": "Show her the Brass Cipher Key to compare its markings with the bells",
        "nextPassage": "Act1_Ch3_05_CompareCipher",
        "condition": {
          "type": "inventory",
          "item": "Brass Cipher Key",
          "contains": true
        }
      }
    ],
    "effects": [],
    "meaningful": true,
    "choiceGroupId": "choice-belfry-pact"
  },
  "Act1_Ch3_03_PromiseChime": {
    "id": "Act1_Ch3_03_PromiseChime",
    "chapterId": "ch-3",
    "kind": "event",
    "backgroundKey": "bg-belfry-bells",
    "paragraphs": [
      "She nods slowly, chalking a bright mark across the bronze bell-yoke. \"Then the belfry will answer when the sky calls.\""
    ],
    "choices": [
      {
        "id": "go-Act2_Ch4_01_Ascent",
        "label": "Ascend toward Act II: The Clockwork Horizon",
        "nextPassage": "Act2_Ch4_01_Ascent"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "bellPactForged",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "trustBellkeepers",
        "amount": 20
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 15
      },
      {
        "type": "relationship-changed",
        "character": "bellkeepers",
        "delta": 20
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-bell-pact",
        "objectiveId": "obj-bell-parley",
        "delta": 1
      },
      {
        "type": "quest-completed",
        "questId": "q-bell-pact"
      }
    ],
    "meaningful": false
  },
  "Act1_Ch3_04_HoldBells": {
    "id": "Act1_Ch3_04_HoldBells",
    "chapterId": "ch-3",
    "kind": "event",
    "backgroundKey": "bg-steam-conduit",
    "paragraphs": [
      "\"Patience is heavy iron, too,\" she replies. \"We'll keep rhythm with the lamps until you give the word.\""
    ],
    "choices": [
      {
        "id": "go-Act2_Ch4_01_Ascent",
        "label": "Ascend toward Act II: The Clockwork Horizon",
        "nextPassage": "Act2_Ch4_01_Ascent"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "bellPactForged",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "trustBellkeepers",
        "amount": 10
      },
      {
        "type": "increment-stat",
        "key": "trustSyndicate",
        "amount": 10
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 10
      },
      {
        "type": "relationship-changed",
        "character": "bellkeepers",
        "delta": 10
      },
      {
        "type": "relationship-changed",
        "character": "syndicate",
        "delta": 10
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-bell-pact",
        "objectiveId": "obj-bell-parley",
        "delta": 1
      },
      {
        "type": "quest-completed",
        "questId": "q-bell-pact"
      }
    ],
    "meaningful": false
  },
  "Act1_Ch3_05_CompareCipher": {
    "id": "Act1_Ch3_05_CompareCipher",
    "chapterId": "ch-3",
    "kind": "event",
    "backgroundKey": "bg-belfry-bells",
    "paragraphs": [
      "The notches on the Brass Cipher Key match the harmonic teeth of the sixth bell. \"So the old astronomers left a key with the couriers,\" she whispers in awe."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch4_01_Ascent",
        "label": "Ascend toward Act II: The Clockwork Horizon",
        "nextPassage": "Act2_Ch4_01_Ascent"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "bellPactForged",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "trustBellkeepers",
        "amount": 15
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 20
      },
      {
        "type": "relationship-changed",
        "character": "bellkeepers",
        "delta": 15
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-bell-pact",
        "objectiveId": "obj-bell-parley",
        "delta": 1
      },
      {
        "type": "quest-completed",
        "questId": "q-bell-pact"
      }
    ],
    "meaningful": false
  }
}
