import { readFileSync, writeFileSync } from 'fs'

const readConfig = async (file) => await JSON.parse(readFileSync(`./src/data/${file}.json`, { encoding: 'utf-8' }))
const writeConfig = async (file, data) => writeFileSync(`./src/data/${file}.json`, JSON.stringify(data, null, 2))

export async function registerToFud(value) {
    const fudData = await readConfig('isFud')
    fudData.push(value)
    writeConfig('isFud', fudData)
}

export async function registerToNotFud(value) {
    const notFudData = await readConfig('notFud')
    notFudData.push(value)
    writeConfig('notFud', notFudData)
}