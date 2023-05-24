import { readFileSync, writeFileSync } from 'fs'

const mainData = await JSON.parse(readFileSync('./src/data/cachedData.json'))
const mainFudData = await JSON.parse(readFileSync('./src/data/isFud.json'))
const mainNotFudData = await JSON.parse(readFileSync('./src/data/notFud.json'))

writeFileSync('./src/data2/cachedData.json', JSON.stringify(mainData))
writeFileSync('./src/data2/isFud.json', JSON.stringify(mainFudData))
writeFileSync('./src/data2/notFud.json', JSON.stringify(mainNotFudData))