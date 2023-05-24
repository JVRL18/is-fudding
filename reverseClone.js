import { readFileSync, writeFileSync } from 'fs'

const autoNotFudData = await JSON.parse(readFileSync('./src/data2/notFud.json'))

let toFixed = []
for (const word of autoNotFudData) {
    if (!toFixed.includes(word.toLowerCase())){
        toFixed.push(word.toLowerCase())
    }
}

writeFileSync('./src/data/notFud.json', JSON.stringify(toFixed))