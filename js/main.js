const OPERATORS = ['+', '−', '×', '÷', '^']
const MAX_DIGITS = 15
const MAX_DECIMALS = 9

const keys = document.querySelectorAll('.key')

let displayString = ''
let calculatedSoFar = 0
let clickedEquals = false

const currentInput = document.querySelector('#calc-display > .current-display-input')
const prevDisplayResult = document.querySelector('#calc-display > .prev-display-result')

Array.from(keys).forEach(key => {
    key.addEventListener('click', () => {
        const keyVal = Array.from(key.classList).includes('exponent-func') ? '^' : key.textContent

        if (clickedEquals && OPERATORS.includes(keyVal)) {
            const calculated = calculatedSoFar
            clearCalc()

            if (calculated !== 'Math error') {
                calculatedSoFar = calculated
                prevDisplayString = calculated
                prevDisplayResult.textContent = prevDisplayString
            }
        }

        if (clickedEquals && keyVal === '.') {
            clearCalc()
        }

        if (clickedEquals && ['⇚', '='].includes(keyVal)) {
            return
        }

        if ('0123456789'.includes(keyVal)) {
            if (clickedEquals) clearCalc()

            // if the number on the screen is 15 digits
            if (( OPERATORS.includes(displayString[0]) && displayString.length-1 === MAX_DIGITS ) ||
                ( !OPERATORS.includes(displayString[0]) && displayString.length === MAX_DIGITS  )) {
                    return
            }

            displayString += keyVal 
        } else if (OPERATORS.includes(keyVal) && (displayString || prevDisplayResult.textContent)) {
            let prevDisplayString = displayString.slice()

            // if we already had an operator in the input but decided to change it, skip these next lines
            if (!(prevDisplayString.length === 1 && OPERATORS.includes(prevDisplayString))) {
                calculateSoFar(prevDisplayString)
                prevDisplayResult.textContent = calculatedSoFar
            }

            displayString = keyVal
        } else {
            switch(keyVal) {
                case 'AC':
                    clearCalc()
                    return
                case '⇚':
                    displayString = displayString.slice(0, displayString.length-1)
                    break
                case '.':
                    if (displayString.includes('.')) return

                    if (!displayString) {
                        displayString = '0.'
                    } else if (OPERATORS.includes(displayString)) {
                        displayString = `${displayString}0.`
                    } else {
                        displayString += keyVal
                    }

                    break
                case '=':
                    if (!displayString) return

                    clickedEquals = true

                    prevDisplayResult.textContent = ''

                    // if we clicked '=' while only having an operator in the input, skip this line
                    if (!OPERATORS.includes(displayString)) {
                        calculateSoFar(displayString)
                    }

                    if (calculatedSoFar === Infinity) {
                        calculatedSoFar = 'Math error'
                    }
                    
                    displayString = calculatedSoFar.toString()
                    break
            }
        }

        currentInput.textContent = displayString
    })
})


function getNumberFromString(numStr) {
    return OPERATORS.includes(numStr[0]) ? +numStr.slice(1) : +numStr
}

function calculateSoFar(str) { // we calculate new result only when we click '=' or any operator
    const num = getNumberFromString(str)

    switch(str[0]) {
        case '−':
            calculatedSoFar -= num
            break
        case '×':
            calculatedSoFar *= num
            break
        case '÷':
            calculatedSoFar /= num
            break
        case '^':
            calculatedSoFar = calculatedSoFar ** num
            break
        default:
            calculatedSoFar += num
    }

    calculatedSoFar = Math.round(calculatedSoFar * (10 ** MAX_DECIMALS)) / (10 ** MAX_DECIMALS)
}

function clearCalc() {
    calculatedSoFar = 0
    displayString = ''
    currentInput.textContent = ''
    clickedEquals = false
    prevDisplayResult.textContent = ''
}

document.addEventListener('keydown', e => {
    // if we're tabbing through the page we don't want to use this at the same time
    if (document.activeElement?.classList.value.includes('key')) return

    const keyExceptions = { '+': 'plus', '-': 'minus', '*': 'multiply', '/': 'slash' }

    let pressed = e.key

    if (pressed in keyExceptions) {
        pressed = keyExceptions[pressed]
    }

    const key = document.querySelector(`.kbd-${pressed}`)

    if (key) {
        key.click()
    }
})