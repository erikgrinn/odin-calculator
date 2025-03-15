# Odin Calculator

This project is a simple calculator built using HTML, CSS, and JavaScript. It demonstrates key coding concepts such as DOM manipulation, event handling, and basic arithmetic operations.

## Key Coding Concepts

### HTML Structure
The HTML file (`index.html`) defines the structure of the calculator. It includes:
- A display area to show the current input and result.
- Buttons for digits (0-9), operators (+, -, x, /), and special functions (AC, +/-, %, ., del, =).

### CSS Styling
The CSS file (`main.css`) provides the styling for the calculator. It includes:
- Flexbox layout to arrange the buttons and display area.
- Styling for buttons, display, and overall calculator appearance.
- Active states for buttons to provide visual feedback.

### JavaScript Functionality
The JavaScript file (`main.js`) contains the logic for the calculator. It includes:
- **Arithmetic Functions**: Functions to perform addition, subtraction, multiplication, and division.
```js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? "Impossible" : Math.round((a / b) * 10000) / 10000; }
```

- **Event Handling**: Event listeners for button clicks to handle digit input, operator selection, and special functions.
```js
digitButtons.forEach(button => {
    button.addEventListener('click', () => handleDigitClick(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperatorClick(button, button.textContent));
});

equalsButton.addEventListener('click', () => handleEqualsClick(equalsButton));
clearButton.addEventListener('click', () => clearCalculator());
signButton.addEventListener('click', () => toggleSign());
percentButton.addEventListener('click', () => convertToPercent());
delButton.addEventListener('click', () => deleteLastDigit());
```
### DOM Manipulation
The JavaScript code manipulates the DOM to update the display and handle user interactions.

- **Updating Display**: Function to update the display with the current value.

```js
function updateDisplay() {
    display.textContent = displayValue;
}
```

- **Handling Digit Clicks**: Function to handle digit button clicks and update the display value.

```js
function handleDigitClick(digit) {
    if (shouldResetDisplay) {
        displayValue = digit;
        shouldResetDisplay = false;
    } else {
        displayValue += digit;
    }
    updateDisplay();
}
```

## Conclusion
This project showcases the integration of HTML, CSS, and JavaScript to create a functional calculator. It demonstrates key concepts such as DOM manipulation, event handling, and basic arithmetic operations, providing a solid foundation for building interactive web applications. 
