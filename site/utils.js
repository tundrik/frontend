const ESTATE = "estate"
const PROJECT = "project"
const DEMAND = "demand"

const RESIDENTIAL = "residential"
const HOUSE = "house"
const GROUND = "ground"
const COMMERCIAL = "commercial"

export function getCookie(key) {
    let b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)")
    return b ? b.pop() : null
}

export const formattedPhone = (value) => {
    let formattedInputValue = ""
    let inputNumbersValue = value.replace(/\D/g, "")
    if (!inputNumbersValue) {
        return ""
    }
    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
        if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue
        let firstSymbols = inputNumbersValue[0] === "8" ? "+7" : "+7"
        formattedInputValue = value = firstSymbols + " "

        if (inputNumbersValue.length > 1) {
            formattedInputValue += "" + inputNumbersValue.substring(1, 4)
        }

        if (inputNumbersValue.length >= 5) {
            formattedInputValue += " " + inputNumbersValue.substring(4, 7)
        }

        if (inputNumbersValue.length >= 8) {
            formattedInputValue += " " + inputNumbersValue.substring(7, 9)
        }

        if (inputNumbersValue.length >= 10) {
            formattedInputValue += " " + inputNumbersValue.substring(9, 11)
        }
    }
    return formattedInputValue
}

export const formattedPrice = (value) => {
    let inputNumbersValue = value.replace(/\D/g, "")
    if (!inputNumbersValue) {
        return ""
    }
    return inputNumbersValue.split('').reverse().map((el, index) => index % 3 !== 2 ? el : ` ${el}`).reverse().join('')
}

export { ESTATE, PROJECT, DEMAND, RESIDENTIAL, HOUSE, GROUND, COMMERCIAL }
