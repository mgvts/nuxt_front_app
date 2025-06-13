import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const sizes = [192, 512]
const inputFile = path.join(process.cwd(), 'public', 'favicon-light.svg')
const outputDir = path.join(process.cwd(), 'public', 'pwa')

async function generateIcons() {
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true })

    // Generate PNG icons
    for (const size of sizes) {
      await sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
    }

    // Generate apple touch icon
    await sharp(inputFile)
      .resize(180, 180)
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'))

    console.log('PWA icons generated successfully!')
  }
  catch (error) {
    console.error('Error generating PWA icons:', error)
    process.exit(1)
  }
}

generateIcons()
