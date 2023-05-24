import { loadAutoBrain } from "./src/brain-auto/index.js"

loadAutoBrain(false)

setInterval(() => { loadAutoBrain(false) }, 5 * 60 * 1000)