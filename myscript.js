let buttons = document.querySelectorAll(".calculator-button");
let display = document.querySelector(".display");
let num1 = '';
let num2 = '';
let operator = null;


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Calculate answer using operate 
        if (button.id === "equals" && num1 && num2 && operator) {
            // Run the answer
            let answer = operate(num1, num2, operator);

            // Reset the num1, num2, and opeartor
            resetCalculator(answer, operator);
            updateDisplay();
            debuggingLine(button.id); 
            return;
        } 

        // Handle clear functionality
        if (button.id === "clear" || num1 === 'Error') {
            clearCalculator();
            updateDisplay();
            debuggingLine(button.id); 
        }

        // Update num1 and num2
        if (button.id === "number"){
            if (operator === null) {
                num1 += button.textContent;
            } else {
                num2 += button.textContent;
            }
            updateDisplay();
            debuggingLine(button.id); 
            return;
        }

        // Handle Percentage
        if (button.id === "percent") {
            if (num1 && !operator) {
                num1 = percent(num1);
            } else if (num1 && operator) {
                num2 = percent(num2);
            }
            updateDisplay();
            debuggingLine(button.id); 
            return;
        }

        // Handle positive/negative toggle
        if (button.id === "pos-neg") {
            if (num1 && !operator) {
                num1 = pos_neg(num1);
            } else if (num1 && operator) {
                num2 = pos_neg(num2);
            }
            updateDisplay();
            debuggingLine(button.id); 
            return;
        }

        // Change operator status 
        if (button.id === "symbol") {
            if (num1 && num2 && operator) {
                // Calculate the result only both numbers and operator are set
                num1 = operate(num1, num2, operator);
                num2 = ''; // Reset num2
            }
            operator = button.textContent; // Set the new operator
            updateDisplay();
            debuggingLine(button.id); 
            return;
        }
    });
});


// Populate the display 
function updateDisplay() {
    if (num2) {
        display.innerHTML = num2; // Show current input if num2 is set
    } else {
        display.innerHTML = num1 || '0'; // Show num1 or 0 if empty
    }
}


function debuggingLine(id) {
    console.log(`
        The id of the button is ${id}
        num1 is ${num1}
        num2 is ${num2}
        operator is ${operator}`)  
}


function clearCalculator() {
    num1 = '';
    num2 = '';
    operator = null;
}


function resetCalculator(result) {
    console.log("Reset function ran");
    num1 = result.toString();
    num2 = '';
    operator = null;
}


function pos_neg(num) {
    console.log("pos-neg function ran");
    return(parseFloat(num) * (-1)).toString();
}


function percent(num) {
    console.log("percent function ran");
    return(parseFloat(num) / 100).toString();
}


function operate(num1, num2, symbol) {
    // Debugging line
    console.log("operate function ran");

    if (symbol === '+') {
        return (parseFloat(num1) + parseFloat(num2)).toString();
    } else if (symbol === '-') {
        return (parseFloat(num1) - parseFloat(num2)).toString();
    } else if (symbol === '*') {
        return (parseFloat(num1) * parseFloat(num2)).toString();
    } else if (symbol === '/') {
        if (parseFloat(num2) === 0) {
            return 'Error'; // Handle division by zero
        } else {
            return (parseFloat(num1) / parseFloat(num2)).toString();
        }
    } 
}