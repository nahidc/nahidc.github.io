let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

// 1. Determines whether the button clicked was a symbol or number  
// 2. Displays the buffer on screen
function buttonClick(value) {
    debugger;
    if(isNaN(value)) {
        handleSymbol(value);
    }
    else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

// 1. "C" -> Resets the calculations
// 2. "=" -> If there is no operation beforehand, does nothing. 
// Otherwise, redirects to flushOperation() with the current number pressed, setting the buffer to the total sum before resetting.
// 3. If it's an arthmetic operation then redirects to handleMath() with the operator pressed
function handleSymbol(symbol) {
    switch(symbol) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            break;
        case "=":
            if(previousOperator === null) {
                // need two numbers to do math
                return;
            }
            handleMath(buffer);
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if(buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length-1);
            }
            break;
        case "+":
        case "−":
        case "×":
        case "÷":
            handleMath(symbol);
            break;
    }
}

// 1. If there is no pre-number pressed beforehand then don't do anything.
// 2. If there is a number pressed beforehand then store then...
// if there's no previous value stored in runningTotal, set it to that value
// else add that new value to the old value by using the previous operator pressed before
// 3. Set the symbol pressed to previousOperator and reset the buffer (so user can enter a new number)
function handleMath(symbol) {
    if(buffer === "0") {
        // do nothing
        return;
    }

    const intBuffer = +buffer;
    if(runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer = "0";
}

// Computes the values using the new value and old operator pressed to sum to the runningTotal
function flushOperation(intBuffer) {
    switch (previousOperator) {
        case "+":
            runningTotal += intBuffer;
            break;
        case "−":
            runningTotal -= intBuffer;
            break;
        case "×":
            runningTotal *= intBuffer;
            break;
        case "÷":
            runningTotal /= intBuffer;
            break;
    }
}

// 1. If you haven't inputted any numbers (besides 0) then set buffer to the number pressed.
// 2. Otherwise concatenates the current inputted numbers to number pressed.
function handleNumber(numStr) {
    if (buffer === "0") {
        buffer = numStr;
    } else {
        buffer += numStr;
    }
}

// Finds the source of the button that was clicked and passes the value into buttonClick()
function init() {
    document.querySelector(".calc-buttons")
        .addEventListener("click", function(event) {
            if(event.target.tagName === "BUTTON") {
                buttonClick(event.target.innerText);
            }
        })
}

init();