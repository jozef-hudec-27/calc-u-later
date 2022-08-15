const OPERATORS = ['+', '−', '×', '÷']


const keys = document.querySelectorAll('.key')

let displayString = ''
let calculatedSoFar = 0
let clickedEquals = false

const currentInput = document.querySelector('#calc-display > .current-display-input')
const prevDisplayResult = document.querySelector('#calc-display > .prev-display-result')

Array.from(keys).forEach(key => {
    key.addEventListener('click', e => {
        const keyVal = key.textContent

        if (clickedEquals && keyVal !== 'AC') {
            return
        }

        if ('0123456789,'.includes(keyVal)) {
            displayString += key.textContent   
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
                    calculatedSoFar = 0
                    displayString = ''
                    currentInput.textContent = displayString
                    clickedEquals = false
                    prevDisplayResult.textContent = ''
                    break
                case '⇚':
                    displayString = displayString.slice(0, displayString.length-1)
                    currentInput.textContent = displayString    
                    break
                case '%':
                    break
                case '=':
                    clickedEquals = true
                    prevDisplayResult.textContent = ''

                    if (!(displayString.length === 1 && OPERATORS.includes(displayString))) {
                        calculateSoFar(displayString)
                    }
                    
                    displayString = calculatedSoFar
                    currentInput.textContent = displayString
                    break
            }
        }

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
        default:
            calculatedSoFar += num
    }
}
