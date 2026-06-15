import sharp from 'sharp'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const svgBuffer = readFileSync(resolve(root, 'public/favicon.svg'))

const icons = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192x192.png', size: 192 },
  { file: 'icon-512x512.png', size: 512 },
]

for (const { file, size } of icons) {
  const out = resolve(root, 'public/icons', file)
  await sharp(svgBuffer, { density: Math.ceil((size / 32) * 72) })
    .resize(size, size)
    .png()
    .toFile(out)
  console.log(`✓ ${file} (${size}×${size})`)
}
