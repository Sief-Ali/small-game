import type { StoryPassageSource } from '../../../../src/modules/story-engine/types'

export const chapter02: Record<string, StoryPassageSource> = {
  "Act1_Ch2_01_FoundryEntry": {
    "id": "Act1_Ch2_01_FoundryEntry",
    "chapterId": "ch-2",
    "kind": "narrative",
    "backgroundKey": "bg-foundry-floor",
    "paragraphs": [
      "Inside the foundry, slag channels glow like veins of molten copper beneath vaulted iron ribs. Suspended over the main casting pit hangs the Solar Pendulum—its bronze bob scarred by decades of heat."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch2_02_PendulumGantry",
        "label": "Approach the pendulum gantry",
        "nextPassage": "Act1_Ch2_02_PendulumGantry"
      }
    ],
    "effects": [
      {
        "type": "chapter-started",
        "actId": "act-1",
        "chapterId": "ch-2"
      }
    ],
    "meaningful": false
  },
  "Act1_Ch2_02_PendulumGantry": {
    "id": "Act1_Ch2_02_PendulumGantry",
    "chapterId": "ch-2",
    "kind": "choice",
    "backgroundKey": "bg-foundry-floor",
    "paragraphs": [
      "A foreman's whistle blows twice. Two Syndicate riggers are preparing to weld the pendulum assembly permanently into the furnace cradle to boost lamp pressure for the night shift.",
      "How do you recover the Solar Pendulum Core?"
    ],
    "choices": [
      {
        "id": "opt-negotiate-riggers",
        "label": "Negotiate with the riggers using your knowledge of the city's lamps",
        "nextPassage": "Act1_Ch2_03_NegotiateRiggers"
      },
      {
        "id": "opt-override-winch",
        "label": "Override the gantry winch from the control catwalk",
        "nextPassage": "Act1_Ch2_04_OverrideWinch"
      },
      {
        "id": "opt-trade-ledger",
        "label": "Offer a guaranteed oil allocation from the ledger in exchange for the core",
        "nextPassage": "Act1_Ch2_05_TradeLedger",
        "condition": {
          "type": "inventory",
          "item": "Oil Ration Ledger",
          "contains": true
        }
      }
    ],
    "effects": [],
    "meaningful": true,
    "choiceGroupId": "choice-foundry-recovery"
  },
  "Act1_Ch2_03_NegotiateRiggers": {
    "id": "Act1_Ch2_03_NegotiateRiggers",
    "chapterId": "ch-2",
    "kind": "event",
    "backgroundKey": "bg-foundry-floor",
    "paragraphs": [
      "You show the riggers that over-welding the pendulum risks snapping the main drive shaft. Grumbling, they uncouple the Solar Pendulum Core and step back as the hoist lifts it clear."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch2_06_Checkpoint",
        "label": "Reach the Deep Foundry Furnace Deck",
        "nextPassage": "Act1_Ch2_06_Checkpoint"
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
        "key": "trustSyndicate",
        "amount": 10
      },
      {
        "type": "add-item",
        "item": "Solar Pendulum Core"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-find-pendulum",
        "objectiveId": "obj-recover-pendulum",
        "delta": 1
      },
      {
        "type": "relationship-changed",
        "character": "syndicate",
        "delta": 10
      }
    ],
    "meaningful": false
  },
  "Act1_Ch2_04_OverrideWinch": {
    "id": "Act1_Ch2_04_OverrideWinch",
    "chapterId": "ch-2",
    "kind": "event",
    "backgroundKey": "bg-foundry-alley",
    "paragraphs": [
      "You throw the emergency release lever on the catwalk. The winch clanks free and hauls up the Solar Pendulum Core before the riggers can lock the brake."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch2_06_Checkpoint",
        "label": "Reach the Deep Foundry Furnace Deck",
        "nextPassage": "Act1_Ch2_06_Checkpoint"
      }
    ],
    "effects": [
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 10
      },
      {
        "type": "increment-stat",
        "key": "trustSyndicate",
        "amount": -15
      },
      {
        "type": "add-item",
        "item": "Solar Pendulum Core"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-find-pendulum",
        "objectiveId": "obj-recover-pendulum",
        "delta": 1
      },
      {
        "type": "relationship-changed",
        "character": "syndicate",
        "delta": -15
      }
    ],
    "meaningful": false
  },
  "Act1_Ch2_05_TradeLedger": {
    "id": "Act1_Ch2_05_TradeLedger",
    "chapterId": "ch-2",
    "kind": "event",
    "backgroundKey": "bg-reserve-power",
    "paragraphs": [
      "Seeing exact reserve figures from the ration ledger, the riggers realize the lower lamps won't go dark if they release the core cleanly. They hand it over without a struggle."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch2_06_Checkpoint",
        "label": "Reach the Deep Foundry Furnace Deck",
        "nextPassage": "Act1_Ch2_06_Checkpoint"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "foundrySabotageAvoided",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 20
      },
      {
        "type": "increment-stat",
        "key": "trustSyndicate",
        "amount": 15
      },
      {
        "type": "add-item",
        "item": "Solar Pendulum Core"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-find-pendulum",
        "objectiveId": "obj-recover-pendulum",
        "delta": 1
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-keep-lanterns",
        "objectiveId": "obj-stabilize-feeder",
        "delta": 1
      },
      {
        "type": "relationship-changed",
        "character": "syndicate",
        "delta": 15
      }
    ],
    "meaningful": false
  },
  "Act1_Ch2_06_Checkpoint": {
    "id": "Act1_Ch2_06_Checkpoint",
    "chapterId": "ch-2",
    "kind": "checkpoint",
    "backgroundKey": "bg-foundry-floor",
    "paragraphs": [
      "With the Solar Pendulum Core secured, the roar of the foundry fades behind heavy blast doors leading into the city's steam conduits."
    ],
    "choices": [
      {
        "id": "go-Act1_Ch3_01_ConduitStart",
        "label": "Enter Chapter 3: Whispers in the Steam Conduit",
        "nextPassage": "Act1_Ch3_01_ConduitStart"
      }
    ],
    "effects": [
      {
        "type": "checkpoint-reached",
        "checkpointId": "cp-foundry-floor",
        "label": "Deep Foundry Furnace Deck"
      },
      {
        "type": "chapter-completed",
        "actId": "act-1",
        "chapterId": "ch-2"
      }
    ],
    "meaningful": false,
    "checkpointId": "cp-foundry-floor"
  }
}
