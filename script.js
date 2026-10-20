const display = document.getElementById("display");

let currentInput = "0";
let firstNumber = null;
let currentOperator = null;
let waitingForSecondNumber = false;
let justCalculated = false;

function getOperatorSymbol(operator) {
    if (operator === "*") return "×";
    if (operator === "/") return "÷";
    if (operator === "-") return "−";
    if (operator === "+") return "+";
    return "";
}

function updateDisplay() {
    if (currentOperator !== null) {
        const symbol = getOperatorSymbol(currentOperator);

        if (waitingForSecondNumber) {
            display.value = `${firstNumber} ${symbol}`;
        } else {
            display.value = `${firstNumber} ${symbol} ${currentInput}`;
        }
    } else {
        display.value = currentInput;
    }
}

function appendValue(value) {
    // Handle operator buttons
    if (["+", "-", "*", "/"].includes(value)) {
        if (currentOperator !== null && !waitingForSecondNumber) {
            calculate();
        }

        firstNumber = Number(currentInput);
        currentOperator = value;
        waitingForSecondNumber = true;
        justCalculated = false;

        updateDisplay();
        return;
    }

    // Handle decimal point
    if (value === ".") {
        if (waitingForSecondNumber || justCalculated) {
            currentInput = "0.";
            waitingForSecondNumber = false;
            justCalculated = false;
        } else if (!currentInput.includes(".")) {
            currentInput += ".";
        }

        updateDisplay();
        return;
    }

    // Handle number buttons
    if (waitingForSecondNumber || justCalculated || currentInput === "Error") {
        currentInput = value;
        waitingForSecondNumber = false;
        justCalculated = false;
    } else if (currentInput === "0") {
        currentInput = value;
    } else {
        currentInput += value;
    }

    updateDisplay();
}

function calculate() {
    if (currentOperator === null || waitingForSecondNumber) {
        return;
    }

    const secondNumber = Number(currentInput);
    let result;

    switch (currentOperator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            result = secondNumber === 0
                ? "Error"
                : firstNumber / secondNumber;
            break;
    }

    currentInput = String(result);
    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
    justCalculated = true;

    updateDisplay();
}

function clearDisplay() {
    currentInput = "0";
    firstNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
    justCalculated = false;

    updateDisplay();
}

function deleteLast() {
    if (waitingForSecondNumber) {
        return;
    }

    if (justCalculated) {
        currentInput = "0";
        justCalculated = false;
    } else {
        currentInput = currentInput.slice(0, -1) || "0";
    }

    updateDisplay();
}