const OPERATORS = ['+', '−', '×', '÷']


const keys = document.querySelectorAll('.key')

let displayString = ''
let calculatedSoFar = 0
let clickedEquals = false

const currentInput = document.querySelector('#calc-display > p')

Array.from(keys).forEach(key => {
    key.addEventListener('click', e => {
        const keyVal = key.textContent

        if (clickedEquals && keyVal !== 'AC') {
            return
        }

        if ('0123456789,'.includes(keyVal)) {
            displayString += key.textContent   
            currentInput.textContent = displayString 
        } else if (OPERATORS.includes(keyVal) && displayString) {
            let prevDisplayString = displayString.slice()

            switch(prevDisplayString[0]) {
                case '−':
                    calculatedSoFar -= getNumberFromString(prevDisplayString)
                    break
                case '×':
                    calculatedSoFar *= getNumberFromString(prevDisplayString)
                    break
                case '÷':
                    calculatedSoFar /= getNumberFromString(prevDisplayString)
                    break
                default:
                    calculatedSoFar += getNumberFromString(prevDisplayString)
            }

            displayString = keyVal
            currentInput.textContent = displayString 
        } else {
            switch(keyVal) {
                case 'AC':
                    calculatedSoFar = 0
                    displayString = ''
                    currentInput.textContent = ''
                    clickedEquals = false
                    break
                case '⇚':
                    displayString = displayString.slice(0, displayString.length-1)
                    currentInput.textContent = displayString    
                    break
                case '%':
                    break
                case '=':
                    clickedEquals = true

                    switch(displayString[0]) {
                        case '−':
                            calculatedSoFar -= getNumberFromString(displayString)
                            break
                        case '×':
                            calculatedSoFar *= getNumberFromString(displayString)
                            break
                        case '÷':
                            calculatedSoFar /= getNumberFromString(displayString)
                            break
                        default:
                            calculatedSoFar += getNumberFromString(displayString)
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

