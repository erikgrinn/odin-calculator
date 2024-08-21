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
let shouldResetDisplay = false;

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

// let result = 0

// display
const display = document.getElementById("display");
let displayValue = display.textContent;

function updateDisplay() {
    display.textContent = displayValue;
}

function handleDigitClick(digit) {
    if (shouldResetDisplay) {
        displayValue = digit;  // Start fresh with the new digit
        shouldResetDisplay = false;
    } else {
        if (displayValue === "0") {
            displayValue = digit;  // Replace initial "0" with the digit
        } else {
            displayValue += digit;  // Append digit to the current display value
        }
    }
    updateDisplay();
}

function handleOperatorClick(button, selectedOperator) {
    button.style.cssText = 'background-color: #aaa;'
    if (firstNumber === null) {
        firstNumber = parseFloat(displayValue);  // Store the first number
        operator = selectedOperator;
        shouldResetDisplay = true;
    } else if (operator !== selectedOperator && shouldResetDisplay) {
            operatorButtons.forEach(opButton => {
                if (opButton.textContent !== selectedOperator) {
                    opButton.style.cssText = 'background-color: #f1f1f1;'
                    operator = selectedOperator
                }
            })
    } else {
        secondNumber = parseFloat(displayValue);  // Store the second number
        firstNumber = operate(operator, firstNumber, secondNumber);  // Perform the operation
        secondNumber = null
        displayValue = String(firstNumber);
        updateDisplay();
        operator = selectedOperator;
        shouldResetDisplay = true;
    }
}

function handleEqualsClick(equalsButton) {
    // if (!shouldResetDisplay){
        operatorButtons.forEach(button => button.style.cssText = 'background-color: #f1f1f1;') //inline, overwrites
        secondNumber = parseFloat(displayValue);
        result = operate(operator, firstNumber, secondNumber);
        displayValue = String(result);
        updateDisplay();
        firstNumber = null
        secondNumber = null
        shouldResetDisplay = true;

    // } else if (shouldResetDisplay) {
    //     result = operate(lastOperator, firstNumber, lastSecondNumber)
    //     console.log(shouldResetDisplay, firstNumber, secondNumber, result)

    //     displayValue = String(result)
    //     updateDisplay()
    // }

}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleDigitClick(button.textContent)
        operatorButtons.forEach(button => button.style.cssText = 'background-color: #f1f1f1;') //inline, overwrites
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

clearButton.addEventListener('click', () => {
    operatorButtons.forEach(button => button.style.cssText = 'background-color: #f1f1f1;') //inline, will overwrites
    firstNumber = null;
    secondNumber = null;
    operator = null;
    displayValue = "0";
    shouldResetDisplay = true;
    updateDisplay();

});
