let buttons = document.querySelectorAll(".calculator-button");
let display = document.querySelector(".display");
let num1 = '';
let num2 = '';
let operator = null;

// For keydown listener 
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            // Handle numbers
            console.log(`Number ${event.key} is pressed`);
            addNumber(event.key);
            updateDisplay();
            debuggingLine(event.key); 
            break;
            
        case '+':
        case '-':
        case '*':
        case '/':
            // Handle operator input
            console.log(`Operator ${event.key} is pressed`);
            updateOperator(event.key);
            updateDisplay();
            debuggingLine(event.key); 
            break;

        case 'Enter':
            // Handle equals
            console.log(`Enter is pressed`);
            if (num1 && num2 && operator) {
                // Run the answer
                let answer = operate(num1, num2, operator);
    
                // Reset the num1, num2, and opeartor
                resetCalculator(answer);
                updateDisplay();
                debuggingLine(event.key); 
            } 
            break;

        case 'Escape':
            // Handle clear
            console.log(`Escape is pressed`);
            clearCalculator();
            updateDisplay();
            debuggingLine(event.key); 
            break;

        case '.':
            // Handle decimal point
            console.log(`Dot is pressed`);
            adddot();
            updateDisplay();
            debuggingLine(event.key); 
            break;

        default:
            break; // Ignore other keys
    }
})


// For button pressed listener
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Calculate answer using operate 
        if (button.id === "equals" && num1 && num2 && operator) {
            // Run the answer
            let answer = operate(num1, num2, operator);

            // Reset the num1, num2, and opeartor
            resetCalculator(answer);
            updateDisplay();
            debuggingLine(button.textContent); 
            return;
        } 

        // Handle clear functionality
        if (button.id === "clear" || num1 === 'Error') {
            clearCalculator();
            updateDisplay();
            debuggingLine(button.textContent); 
        }

        // Update num1 and num2
        if (button.classList.contains("number")){
            addNumber(button.textContent);
            updateDisplay();
            debuggingLine(button.textContent); 
            return;
        }

        // Handle Decimal 
        if (button.id === "dot") {
            adddot();
            updateDisplay();
            debuggingLine(button.textContent); 
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
            debuggingLine(button.textContent); 
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
            debuggingLine(button.textContent); 
            return;
        }

        // Change operator status 
        if (button.classList.contains("symbol")) {
            updateOperator(button.textContent);
            updateDisplay();
            debuggingLine(button.textContent); 
            return;
        }
    });
});



function updateDisplay() {
    if (num2) {
        display.innerHTML = num2; // Show current input if num2 is set
    } else {
        display.innerHTML = num1 || '0'; // Show num1 or 0 if empty
    }
}

function debuggingLine(element) {
    console.log(`
        The content of the button is ${element}
        num1 is ${num1}
        num2 is ${num2}
        operator is ${operator}`)  
}

function clearCalculator() {
    num1 = '';
    num2 = '';
    operator = null;
}

function addNumber(current_num) {
    if (operator === null) {
        num1 += current_num;
    } else {
        num2 += current_num;
    }
}

function adddot() {
    if (!operator) {
        // Check if '.' is not already in num1
        if (!num1.includes('.')) {
            num1 += '.';
        }
    } else {
        // Check if '.' is not already in num2
        if (!num2.includes('.')) {
            num2 += '.';
        }
    }
}

function resetCalculator(result) {
    console.log("Reset function ran");
    num1 = formatResult(result).toString();
    num2 = '';
    operator = null;
}

function pos_neg(num) {
    console.log("pos-neg function ran");
    return(parseFloat(num) * (-1)).toString();
}

function percent(num) {
    console.log("percent function ran");
    return(formatResult(parseFloat(num) / 100).toString());
}

function updateOperator(current_operator) {
    if (num1 && num2 && operator) {
        // Calculate the result only both numbers and operator are set
        num1 = operate(num1, num2, operator);
        num2 = ''; // Reset num2
    }
    operator = current_operator; // Set the new operator
}

function operate(num1, num2, symbol) {
    // Debugging line
    console.log("operate function ran");

    let solution;
    switch (symbol) {
        case '+':
            solution = (parseFloat(num1) + parseFloat(num2));
            break;
        case '-':
            solution = (parseFloat(num1) - parseFloat(num2));
            break;
        case '*':
            solution = (parseFloat(num1) * parseFloat(num2));
            break;
        case '/':
            if (parseFloat(num2) === 0) {
                return 'Error';
            }
            solution = (parseFloat(num1) / parseFloat(num2));
            break;
        default: //To handle any other unexpected cases
            return 'Error';
    }

    return formatResult(solution);
}

function formatResult(num) {
    // Limit the answer within certain range 
    let beforeFormatted = Number(num);
    if (beforeFormatted >= 1e99 || beforeFormatted <= -1e99) {
        return 'Error'
    }

     // Convert to scientific notation
    if (beforeFormatted >= 1e8 || beforeFormatted <= -1e8) {
        return beforeFormatted.toExponential(2);
    }
 
    // Have a fixed decimal places
    let formatted = beforeFormatted.toFixed(10);

    // Convert to a number to remove trailing zeros
    return parseFloat(formatted).toString();
}