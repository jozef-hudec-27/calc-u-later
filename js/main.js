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
    key.addEventListener('click', e => {
        const keyVal = Array.from(key.classList).includes('exponent-func') ? '^' : key.textContent

        if (clickedEquals && keyVal !== 'AC' && '0123456789'.includes(keyVal) === false) {
            return
        }

        if ('0123456789,'.includes(keyVal)) {
            if (clickedEquals) clearCalc()

            // if the number on the screen is 15 digits
            if (( OPERATORS.includes(displayString[0]) && displayString.length-1 === MAX_DIGITS ) ||
                ( !OPERATORS.includes(displayString[0]) && displayString.length === MAX_DIGITS  )) {
                    return
            }

            displayString += keyVal 
            currentInput.textContent = displayString 
        } else if (OPERATORS.includes(keyVal) && (displayString || prevDisplayResult.textContent)) {
            let prevDisplayString = displayString.slice()

            if (!(prevDisplayString.length === 1 && OPERATORS.includes(prevDisplayString))) {
                calculateSoFar(prevDisplayString)
                prevDisplayResult.textContent = calculatedSoFar
            }

            displayString = keyVal
            currentInput.textContent = displayString 
        } else {
            switch(keyVal) {
                case 'AC':
                    clearCalc()
                    break
                case '⇚':
                    displayString = displayString.slice(0, displayString.length-1)
                    currentInput.textContent = displayString    
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

                    currentInput.textContent = displayString
                    break
                case '=':
                    clickedEquals = true

                    prevDisplayResult.textContent = ''

                    if (!(displayString.length === 1 && OPERATORS.includes(displayString))) {
                        calculateSoFar(displayString)

                        if (calculatedSoFar === Infinity) {
                            calculatedSoFar = 'Math error'
                        }
                    }
                    
                    displayString = calculatedSoFar
                    currentInput.textContent = displayString
                    break
            }
        }

    })
})


function getNumberFromString(numStr) {
    if (( numStr.length === 1 && numStr === '.' ) ||
        ( numStr.length === 2 && OPERATORS.includes(numStr[0]) && numStr[1] === '.' )) return 0
    
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
    currentInput.textContent = displayString
    clickedEquals = false
    prevDisplayResult.textContent = ''
}