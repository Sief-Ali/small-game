import { spawnSync } from 'node:child_process'
import { mkdirSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const storiesRoot = join(root, 'stories')
const outputRoot = join(root, 'public', 'stories')
const tweego = process.env.TWEEGO_BIN || 'tweego'

function run(args) {
  const result = spawnSync(tweego, args, {
    cwd: root,
    encoding: 'utf8',
    env: process.env
  })

  if (result.error) {
    throw new Error(`Unable to run Tweego (" ${tweego} "). Install Tweego and ensure it is on PATH. ${result.error.message}`)
  }

  if (result.status !== 0) {
    throw new Error([result.stdout, result.stderr].filter(Boolean).join('\n').trim() || `Tweego exited with code ${result.status}`)
  }

  return [result.stdout, result.stderr].filter(Boolean).join('\n')
}

const formats = run(['--list-formats-csv'])
const hasSugarCube = formats
  .split(/\r?\n/)
  .some(line => line.split(',', 1)[0] === 'sugarcube-2')

if (!hasSugarCube) {
  throw new Error(
    'Tweego is installed, but SugarCube 2 was not found. Install the SugarCube 2 story format in a Tweego storyformats directory. See docs/story-authoring.md.'
  )
}

const stories = readdirSync(storiesRoot, { withFileTypes: true })
  .filter(entry => entry.isDirectory())

let compiledCount = 0

for (const story of stories) {
  const storyDirectory = join(storiesRoot, story.name)
  const locales = readdirSync(storyDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())

  for (const locale of locales) {
    const sourceDirectory = join(storyDirectory, locale.name)
    const outputFile = join(outputRoot, story.name, locale.name, 'index.html')
    mkdirSync(dirname(outputFile), { recursive: true })

    run([
      '--format=sugarcube-2',
      '--output', outputFile,
      sourceDirectory
    ])

    compiledCount += 1
    process.stdout.write(`Compiled ${story.name}/${locale.name} -> ${outputFile}\n`)
  }
}

if (compiledCount === 0) {
  throw new Error('No story locale directories were found under stories/.')
}

process.stdout.write(`Compiled ${compiledCount} story locale(s).\n`)
