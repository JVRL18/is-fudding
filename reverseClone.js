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

const autoNotFudData = await JSON.parse(readFileSync('./src/data2/notFud.json'))
const currentNotFudData = await JSON.parse(readFileSync('./src/data/notFud.json'))

let toFixed = []
for (const word of currentNotFudData.concat(autoNotFudData)) {
    const ignore = ["https://", "0x"]

    let ignored = false
    for (const item of ignore) {
        if (word.includes(item)) ignored = true
    }
    if (ignored) continue

    if (!toFixed.includes(word.toLowerCase())) {
        toFixed.push(word.toLowerCase())
    }
}

writeFileSync('./src/data/notFud.json', JSON.stringify(toFixed))