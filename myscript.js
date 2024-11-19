let buttons = document.querySelectorAll(".calculator-button");
let display = document.querySelector(".display");
let num1 = '';
let num2 = '';
let operator = null;
let operator_previous = null;


buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Calculate answer using operate 
        if ((button.id === "equals" && ((num1 && num2 && operator))|| 
            (num1 && num2 && operator) && button.id !== 'number' 
            && button.id !== 'percent' && button.id !== 'pos-neg')
        ) {
            let answer = operate(num1,num2,operator);
            console.log(answer);

            // Reset the num1, num2, and opeartor
            num1 = answer;
            num2 = '';
            operator_previous = operator;
            operator = null;
        }

        // first condition: Clear out all variables
        if (button.id === "clear") {
            num1 = '';
            num2 = '';
            operator = null;
            operator_previous = null;
        }

        // Update num1 and num2
        if (button.id === "number"){
            if (operator === null) {
                num1 = num1 + button.textContent;
            } else {
                num2 = num2 + button.textContent;
            }
        }

        // Divide the numbers by 100
        if (button.id === "percent") {
            if (num1 && !operator) {
                num1 = percent(num1);
            } else if (num1 && operator) {
                num2 = percent(num2);
            }
        }

        // To change num +ve to -ve vice versa
        if (button.id === "pos-neg") {
            if (num1 && !operator) {
                num1 = pos_neg(num1);
            } else if (num1 && operator) {
                num2 = pos_neg(num2);
            }
        }

        // Change operator status 
        if (button.id === "symbol") {
            if (num1 !== null && num2 === '' && operator === null) {
                // Case 1: num1 exist
                operator = button.textContent;
            } else if (num1 !== null && operator !== null && operator_previous === null) {
                // Case 2: num1 and operator exist
                num2 = num1;
            } else if (num1 !== null && operator === null && operator_previous !== null) {
                // Case 3: num1 and previous operator exist
                num2 = num1;
                operator = operator_previous;
            } else if (num1 !== null && operator === null && operator_previous !== null) {
                // Case 4: num1, opeartor, previous operator exists
            }
        }

        // Populate the display 
        if (!operator) {
            display.innerHTML = num1;
        } else if (num1 && operator && !num2) {
            display.innerHTML = num1;
        } else if (num1 && operator && num2) {
            display.innerHTML = num2;
        } 

        // Debugging Line
        console.log(`
            The id of the button is ${button.id}
            num1 is ${num1}
            num2 is ${num2}
            operator is ${operator}
            operator-tmp is ${operator_previous}`)  
   
    });
});


function pos_neg(num) {
    console.log("pos-neg function ran");
    return(parseFloat(num) * (-1));
}


function percent(num) {
    console.log("percent function ran");
    return(parseFloat(num) / 100);
}

function operate(num1, num2, symbol) {
    // Debugging line
    console.log("operate function ran");

    if (symbol === '+') {
        return (parseFloat(num1, 10) + parseFloat(num2, 10));
    } else if (symbol === '-') {
        return (parseFloat(num1, 10) - parseFloat(num2, 10));
    } else if (symbol === '*') {
        return (parseFloat(num1, 10) * parseFloat(num2, 10));
    } else if (symbol === '/') {
        return (parseFloat(num1, 10) / parseFloat(num2, 10));
    } 
}