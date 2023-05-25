import brain from 'brain.js'
import { readFileSync, writeFileSync } from 'fs'
import { parseTo } from './utils/parser.js'

export const saveBrainTrainingData = async (data) => {
    writeFileSync('./src/data/cachedData.json', JSON.stringify(data));
}

export const loadBrain = async (useCached) => {
    //Ai model type
    const net = new brain.recurrent.LSTM()

    if (!useCached) {
        const readData = async (file) => await JSON.parse(readFileSync(`./src/data/${file}.json`))

        const data1 = await readData('isFud')
        const data2 = await readData('notFud')

        const trainingData = parseTo(data1, 'fud').concat(parseTo(data2, 'ok'))

        net.train(trainingData, { log: true, errorThresh: 0.011, iterations: 500 })

        const data = net.toJSON()
        saveBrainTrainingData(data)

        return net
    }

    const trainingData = await JSON.parse(readFileSync(`./src/data/cachedData.json`))

    net.fromJSON(trainingData)

    return net
}