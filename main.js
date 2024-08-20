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

const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const signButton = document.getElementById('sign');
const percentButton = document.getElementById('percent')
const decimalButton = document.getElementById('decimal')

digitButtons.forEach(button => {
    button.addEventListener('click', () => handleDigitClick(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        firstNumber = parseFloat(displayValue);
        operator = button.textContent;
        displayValue = "0";
    });
});

equalsButton.addEventListener('click', () => {
    secondNumber = parseFloat(displayValue);
    const result = operate(operator, firstNumber, secondNumber);
    displayValue = String(result);
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayValue = "0";
    updateDisplay();
});
