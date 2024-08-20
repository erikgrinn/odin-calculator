// operations

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
        return "Error: Division by 0";
    }
    return a / b;
}

function percent(a) {
    return a/100
}

// decide which operation based on operator, return result of operation
let firstNumber = null;
let secondNumber = null;
let operator = null;

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
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

let result = 0

// display
const display = document.getElementById("display");
let displayValue = display.textContent;

function updateDisplay() {
    display.textContent = displayValue;
}

function handleDigitClick(digit) {
    if (displayValue === "0") {
        displayValue = digit;
    } else {
        displayValue += digit;
    }
    updateDisplay();
}

function handleOperaticClick(button, selectedOperator) {
    button.style.cssText = 'background-color: #aaa;'
    if (firstNumber === null) {
        firstNumber = parseFloat(displayValue);  // Store the first number
    } else if (operator) {
        secondNumber = parseFloat(displayValue);  // Store the second number
        firstNumber = operate(operator, firstNumber, secondNumber);  // Perform the operation
        displayValue = String(firstNumber);
        updateDisplay();
        console.log(button)
    }
    operator = selectedOperator;  // Update the operator
    displayValue = "0";
    
}


digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleDigitClick(button.textContent)
        operatorButtons.forEach(button => button.style.cssText = 'background-color: #f1f1f1;') //inline, overwrites
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperaticClick(button, button.textContent));
});

equalsButton.addEventListener('click', () => {
    operatorButtons.forEach(button => button.style.cssText = 'background-color: #f1f1f1;') //inline, will overwrites
    secondNumber = parseFloat(displayValue);
    result = operate(operator, firstNumber, secondNumber);
    firstNumber = result
    secondNumber = null
    displayValue = String(firstNumber);
    updateDisplay();
});

signButton.addEventListener('click', () => {
    console.log(displayValue)
    if (displayValue.charAt(0) !== '-') {
    displayValue = '-' + displayValue.slice(0)
    } else {
        displayValue = displayValue.slice(1)
    } 
    updateDisplay()
})

clearButton.addEventListener('click', () => {
    operatorButtons.forEach(button => button.style.cssText = 'background-color: #f1f1f1;') //inline, will overwrites
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayValue = "0";
    updateDisplay();
});
