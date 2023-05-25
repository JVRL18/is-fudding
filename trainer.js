import { loadAutoBrain } from "./src/brain-auto/index.js"

async function learnData(usecache) {
    await loadAutoBrain(usecache)
    setTimeout(() => {
        learnData(false)
    }, 10 * 60 * 1000)
}
learnData(true)