import type { StoryPassageSource } from '../../../../src/modules/story-engine/types'

export const chapter05: Record<string, StoryPassageSource> = {
  "Act2_Ch5_01_DomeApproach": {
    "id": "Act2_Ch5_01_DomeApproach",
    "chapterId": "ch-5",
    "kind": "narrative",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "Above the vault, curved glass ribs of the Meridian Dome frame the twilight sky like a ribbed lantern. Far below, the city looks like a constellation of amber sparks."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch5_02_ShutterChoice",
        "label": "Inspect the dome shutters",
        "nextPassage": "Act2_Ch5_02_ShutterChoice"
      }
    ],
    "effects": [
      {
        "type": "chapter-started",
        "actId": "act-2",
        "chapterId": "ch-5"
      }
    ],
    "meaningful": false
  },
  "Act2_Ch5_02_ShutterChoice": {
    "id": "Act2_Ch5_02_ShutterChoice",
    "chapterId": "ch-5",
    "kind": "choice",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "The great dome shutters respond to manual counter-gears. Opening them wide lets the unshielded sky press directly against the observatory lenses.",
      "What do you do at the dome controls?"
    ],
    "choices": [
      {
        "id": "opt-unlatch-shutters",
        "label": "Unlatch all primary shutters to clear the eastern glass",
        "nextPassage": "Act2_Ch5_03_UnlatchShutters"
      },
      {
        "id": "opt-diffuse-louvers",
        "label": "Keep half-louvers angled to diffuse the incoming light",
        "nextPassage": "Act2_Ch5_04_DiffuseLouvers"
      }
    ],
    "effects": [],
    "meaningful": true,
    "choiceGroupId": "choice-dome-shutters"
  },
  "Act2_Ch5_03_UnlatchShutters": {
    "id": "Act2_Ch5_03_UnlatchShutters",
    "chapterId": "ch-5",
    "kind": "event",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "The heavy shutters swing back with a resonant ring. Cold wind sweeps across the glass floor as the eastern horizon brightens along the edge."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch5_05_Checkpoint",
        "label": "Reach the Meridian Dome Apex",
        "nextPassage": "Act2_Ch5_05_Checkpoint"
      }
    ],
    "effects": [
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
  "Act2_Ch5_04_DiffuseLouvers": {
    "id": "Act2_Ch5_04_DiffuseLouvers",
    "chapterId": "ch-5",
    "kind": "event",
    "backgroundKey": "bg-gilded-twilight",
    "paragraphs": [
      "The louvers settle into an angled lattice, turning harsh sky-glare into a steady, golden wash across the observatory instruments."
    ],
    "choices": [
      {
        "id": "go-Act2_Ch5_05_Checkpoint",
        "label": "Reach the Meridian Dome Apex",
        "nextPassage": "Act2_Ch5_05_Checkpoint"
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
  "Act2_Ch5_05_Checkpoint": {
    "id": "Act2_Ch5_05_Checkpoint",
    "chapterId": "ch-5",
    "kind": "checkpoint",
    "backgroundKey": "bg-horizon-dawn",
    "paragraphs": [
      "At the apex of the dome, the brass astrolabe aligns with the horizon line."
    ],
    "choices": [
      {
        "id": "go-Act3_Ch6_01_CourtEntry",
        "label": "Advance into Act III: Sovereign of the First Ray",
        "nextPassage": "Act3_Ch6_01_CourtEntry"
      }
    ],
    "effects": [
      {
        "type": "checkpoint-reached",
        "checkpointId": "cp-meridian-apex",
        "label": "Meridian Dome Apex"
      },
      {
        "type": "chapter-completed",
        "actId": "act-2",
        "chapterId": "ch-5"
      }
    ],
    "meaningful": false,
    "checkpointId": "cp-meridian-apex"
  }
}
