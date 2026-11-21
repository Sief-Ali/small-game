import type { StoryScene } from '../types'

type SceneArtworkProps = {
  scene: StoryScene
}

export function SceneArtwork({ scene }: SceneArtworkProps) {
  return (
    <figure
      className="scene-artwork"
      data-artwork-key={scene.artwork.key}
      aria-label={scene.artwork.description}
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
        {scene.artwork.caption}
      </figcaption>
    </figure>
  )
}
