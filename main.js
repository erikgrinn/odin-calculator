function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Impossible";
    }
    return Math.round((a / b)*10000)/10000;
}

// decide which operation based on operator, return result of operation
function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const signButton = document.getElementById('sign');
const percentButton = document.getElementById('percent')
const decimalButton = document.getElementById('decimal')
const delButton = document.getElementById('delete')

const display = document.querySelector("span");
let displayValue = display.textContent;

function updateDisplay() {
    display.textContent = displayValue;
}

function handleDigitClick(digit) {
    if (shouldResetDisplay) {
        displayValue = digit;  
        shouldResetDisplay = false;
    } else {
        if (displayValue === '0' && '.') {
            displayValue = digit;  
        } else {
            displayValue += digit;  
        }
    }
    updateDisplay();
}

// handling various uses of operator clicks
let firstNumber = null;
let secondNumber = null;
let operator = null;
let shouldResetDisplay = false;
function handleOperatorClick(button, selectedOperator) {
    button.style.opacity = '0.75'
    if (firstNumber === null) {
        firstNumber = parseFloat(displayValue); 
        shouldResetDisplay = true;
    } else if (shouldResetDisplay) {
            operatorButtons.forEach(opButton => {
                if (opButton.textContent !== selectedOperator) {
                    opButton.style.opacity = '1'
                }
            })
    } else {
        secondNumber = parseFloat(displayValue);  
        firstNumber = operate(operator, firstNumber, secondNumber);  
        secondNumber = null
        displayValue = String(firstNumber);
        updateDisplay();
        shouldResetDisplay = true;
    }
    operator = selectedOperator; // for selecting operator instead of equals

}

function handleEqualsClick(equalsButton) {
    operatorButtons.forEach(button => button.style.opacity = '1') 
    if (!shouldResetDisplay) {
        secondNumber = parseFloat(displayValue);
        result = operate(operator, firstNumber, secondNumber);
        displayValue = String(result);
        updateDisplay();
        firstNumber = result
        shouldResetDisplay = true;
    } else if (shouldResetDisplay) {
        result = operate(operator,firstNumber, secondNumber)
        displayValue = String(result)
        updateDisplay()
        firstNumber = result
    }
}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleDigitClick(button.textContent)
        operatorButtons.forEach(button => button.style.opacity = '1') 
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperatorClick(button, button.textContent));
});

equalsButton.addEventListener('click', () => handleEqualsClick(equalsButton))


signButton.addEventListener('click', () => {
    if (displayValue.charAt(0) !== '-') {
    displayValue = '-' + displayValue.slice(0)
    } else {
        displayValue = displayValue.slice(1)
    } 
    updateDisplay()
})

percentButton.addEventListener('click', () => {
    let clicked = null
    if (!clicked) {
        displayValue = divide(displayValue, 100)
        updateDisplay()
        clicked = 1
    }
    else if (clicked) {
        display = displayValue * 100
        updateDisplay()
        clicked = null
    }
})

delButton.addEventListener('click', () => {
    displayValue = displayValue.substring(0, displayValue.length - 1)
    updateDisplay()
})

clearButton.addEventListener('click', () => {
    operatorButtons.forEach(button => button.style.opacity = '1')
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayValue = "0";
    shouldResetDisplay = true;
    updateDisplay();
});

