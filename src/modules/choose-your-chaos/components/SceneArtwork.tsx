import { useTranslation } from 'react-i18next'
import type { StoryPassage } from '../../story-engine/types'

type SceneArtworkProps = {
  scene: StoryPassage
}

export function SceneArtwork({ scene }: SceneArtworkProps) {
  const { t } = useTranslation()
  const passageKey = `story.passages.${scene.id}`

  return (
    <figure
      className="scene-artwork"
      data-artwork-key={scene.artwork.key}
      aria-label={t(`${passageKey}.artworkDescription`, {
        defaultValue: scene.artwork.description
      })}
    >
      <div className="artwork-sky" aria-hidden="true">
        <span className="artwork-moon"/>
        <span className="artwork-star star-a">✦</span>
        <span className="artwork-star star-b">✧</span>
        <span className="artwork-star star-c">·</span>
        <span className="artwork-symbol">{scene.artwork.symbol}</span>
        <span className="artwork-horizon"/>
        <span className="artwork-orb orb-a"/>
        <span className="artwork-orb orb-b"/>
      </div>
      <figcaption className="artwork-caption">
        <span className="caption-mark">✦</span>
        {t(`${passageKey}.artworkCaption`, { defaultValue: scene.artwork.caption })}
      </figcaption>
    </figure>
  )
}
