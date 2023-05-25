import { readFileSync, writeFileSync } from 'fs'

const readConfig = async (file) => await JSON.parse(readFileSync(`./src/data/${file}.json`, { encoding: 'utf-8' }))
const writeConfig = async (file, data) => writeFileSync(`./src/data/${file}.json`, JSON.stringify(data))

export async function registerToFud(value) {
    const fudData = await readConfig('isFud')
    fudData.push(value)

    const toFixed = []
    for (const word of fudData) {
        if (!toFixed.includes(word.toLowerCase())) {
            toFixed.push(word.toLowerCase())
        }
    }
    writeConfig('isFud', toFixed)
}

export async function registerToNotFud(value) {
    const notFudData = await readConfig('notFud')
    notFudData.push(value)

    const toFixed = []
    for (const word of notFudData) {
        if (!toFixed.includes(word.toLowerCase())) {
            toFixed.push(word.toLowerCase())
        }
    }
    writeConfig('notFud', toFixed)
}