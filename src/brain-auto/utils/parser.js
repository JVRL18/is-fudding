/**
 * Generates training data array of objects
 * @param {Array} arr 
 * @param {'fud'|'ok'} output 
 * @returns 
 */
export function parseTo(arr, output) {
    return arr.map(item => {
        return {
            input: item,
            output: output
        }
    })
}