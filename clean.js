import { readFileSync, writeFileSync } from 'fs'
import { registerToFud } from './src/utils/FuddingUtils.js'

const notFudFiles = await JSON.parse(readFileSync('./src/data2/notFud.json'))
const actualNotFudFiles = await JSON.parse(readFileSync('./src/data/notFud.json'))

const baseFud = []
const ignored = []
const cleanData = []

for (const word of notFudFiles) {
    let skip = false
    const fixedWord = word.toLowerCase()

    const badWords = ["scam", "dump", "rug"]
    const ignore = ["https://", "0x"]

    for (const t of ignore) {
        if (fixedWord.includes(t)) {
            skip = true
            ignored.push(fixedWord)
        }
    }

    if (!skip) {
        for (const t of badWords) {
            if (fixedWord.includes(t) && !baseFud.includes(t)) {
                baseFud.push(fixedWord)
                if (!actualNotFudFiles.includes(fixedWord)) {
                    await registerToFud(fixedWord)
                }
            }
        }
    }

    if (baseFud.includes(fixedWord) || ignored.includes(fixedWord)) continue

    cleanData.push(fixedWord)
}

writeFileSync('./src/data2/notFud.json', JSON.stringify(cleanData))