import type { StoryPassageSource } from '../../../../src/modules/story-engine/types'

export const chapter04: Record<string, StoryPassageSource> = {
  "Act2_Ch4_01_Ascent": {
    "id": "Act2_Ch4_01_Ascent",
    "chapterId": "ch-4",
    "kind": "narrative",
    "backgroundKey": "bg-meridian-climb",
    "paragraphs": [
      "The air grows thin and cold as you climb past shuttered sun-dials and frozen aqueducts. High above, the observatory dome gleams like a silver blister against the bruised sky."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch4_02_Checkpoint",
        "label": "Reach the Observatory Vault Threshold",
        "nextPassage": "Act2_Ch4_02_Checkpoint"
      }
    ],
    "effects": [
      {
        "type": "chapter-completed",
        "actId": "act-1",
        "chapterId": "ch-3"
      },
      {
        "type": "chapter-started",
        "actId": "act-2",
        "chapterId": "ch-4"
      }
    ],
    "meaningful": false
  },
  "Act2_Ch4_02_Checkpoint": {
    "id": "Act2_Ch4_02_Checkpoint",
    "chapterId": "ch-4",
    "kind": "checkpoint",
    "backgroundKey": "bg-vault-door",
    "paragraphs": [
      "Before you stand the bronze doors of the Observatory Vault, engraved with overlapping rings of solstice and equinox."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch4_03_VaultChoice",
        "label": "Step inside the vault chamber",
        "nextPassage": "Act2_Ch4_03_VaultChoice"
      }
    ],
    "effects": [
      {
        "type": "checkpoint-reached",
        "checkpointId": "cp-vault-threshold",
        "label": "Observatory Vault Threshold"
      }
    ],
    "meaningful": false,
    "checkpointId": "cp-vault-threshold"
  },
  "Act2_Ch4_03_VaultChoice": {
    "id": "Act2_Ch4_03_VaultChoice",
    "chapterId": "ch-4",
    "kind": "choice",
    "backgroundKey": "bg-vault-door",
    "paragraphs": [
      "The Solar Pendulum mount waits inside a glass-and-bronze chamber. A warning chime echoes along the catwalk: starting the pendulum will draw heavy load from the city's streetlamps unless balanced carefully.",
      "How do you proceed?"
    ],
    "choices": [
      {
        "id": "opt-engage-pendulum",
        "label": "Engage the Solar Pendulum now and let the grid adapt",
        "nextPassage": "Act2_Ch4_04_EngagePendulum"
      },
      {
        "id": "opt-divert-reserve",
        "label": "Divert reserve oil power first, then mount and start the pendulum",
        "nextPassage": "Act2_Ch4_05_DivertReserve",
        "condition": {
          "type": "inventory",
          "item": "Oil Ration Ledger",
          "contains": true
        }
      },
      {
        "id": "opt-hidden-archive",
        "label": "Unlock the hidden archive niche behind the main console",
        "nextPassage": "Act2_Ch4_06_HiddenArchive",
        "condition": {
          "type": "inventory",
          "item": "Brass Cipher Key",
          "contains": true
        }
      }
    ],
    "effects": [],
    "meaningful": true,
    "choiceGroupId": "choice-vault-entry"
  },
  "Act2_Ch4_04_EngagePendulum": {
    "id": "Act2_Ch4_04_EngagePendulum",
    "chapterId": "ch-4",
    "kind": "event",
    "backgroundKey": "bg-pendulum-spin",
    "paragraphs": [
      "Heavy counterweights groan awake. For a breathless minute the streetlamps flicker down to embers—then the pendulum swings wide and true."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch5_01_DomeApproach",
        "label": "Continue into Chapter 5: Meridian Glass & Brass",
        "nextPassage": "Act2_Ch5_01_DomeApproach"
      }
    ],
    "effects": [
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 25
      },
      {
        "type": "increment-stat",
        "key": "trustSyndicate",
        "amount": -10
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-find-pendulum",
        "objectiveId": "obj-align-escapement",
        "delta": 1
      },
      {
        "type": "quest-completed",
        "questId": "q-find-pendulum"
      },
      {
        "type": "relationship-changed",
        "character": "syndicate",
        "delta": -10
      }
    ],
    "meaningful": false
  },
  "Act2_Ch4_05_DivertReserve": {
    "id": "Act2_Ch4_05_DivertReserve",
    "chapterId": "ch-4",
    "kind": "event",
    "backgroundKey": "bg-reserve-power",
    "paragraphs": [
      "The reserve ledger's routing codes hold the lamps steady while the pendulum gathers momentum. Every street below stays lit as the brass arm sweeps its arc."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch5_01_DomeApproach",
        "label": "Continue into Chapter 5: Meridian Glass & Brass",
        "nextPassage": "Act2_Ch5_01_DomeApproach"
      }
    ],
    "effects": [
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 35
      },
      {
        "type": "increment-stat",
        "key": "trustWatch",
        "amount": 10
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-find-pendulum",
        "objectiveId": "obj-align-escapement",
        "delta": 1
      },
      {
        "type": "quest-completed",
        "questId": "q-find-pendulum"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-keep-lanterns",
        "objectiveId": "obj-stabilize-feeder",
        "delta": 1
      },
      {
        "type": "quest-completed",
        "questId": "q-keep-lanterns"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-unbroken-lamp"
      }
    ],
    "meaningful": false
  },
  "Act2_Ch4_06_HiddenArchive": {
    "id": "Act2_Ch4_06_HiddenArchive",
    "chapterId": "ch-4",
    "kind": "event",
    "backgroundKey": "bg-secret-vault",
    "paragraphs": [
      "Behind a sliding brass panel lies a chronometer etched with the original dawn coordinates—proof that the sky wasn't cursed, only timed to wait."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch5_01_DomeApproach",
        "label": "Continue into Chapter 5: Meridian Glass & Brass",
        "nextPassage": "Act2_Ch5_01_DomeApproach"
      }
    ],
    "effects": [
      {
        "type": "set-flag",
        "key": "hasVaultCipher",
        "value": true
      },
      {
        "type": "set-flag",
        "key": "readArchiveLog",
        "value": true
      },
      {
        "type": "increment-stat",
        "key": "dawnProgress",
        "amount": 25
      },
      {
        "type": "add-item",
        "item": "Founders Chronometer"
      },
      {
        "type": "quest-objective-updated",
        "questId": "q-unseal-chronometer",
        "objectiveId": "obj-archive-log",
        "delta": 1
      },
      {
        "type": "quest-completed",
        "questId": "q-unseal-chronometer"
      },
      {
        "type": "achievement-unlocked",
        "achievementId": "ach-shadow-archivist"
      }
    ],
    "meaningful": false
  }
}
