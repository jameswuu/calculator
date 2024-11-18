let buttons = document.querySelectorAll(".calculator-button")
let num1 = '';
let num2 = '';
let operator = null;
let hasOperator = false;


buttons.forEach((button) => {
    button.addEventListener("click", () => {

        // Update num1 and num2
        if (button.id === "number") {
            if (hasOperator === false) {
                num1 = num1 + button.textContent;
            } else if (hasOperator === true) {
                num2 = num2 + button.textContent;
            }
        }

        // Change operator status 
        if (button.id === "symbol") {
            if (num1 !== null && operator === null) {
                hasOperator = true;
                operator = button.textContent;
            } else if (operator) {
                let answer = operate(num1,num2,operator);
                console.log(answer);
            }
        }
        
        // Debugging Line
        console.log(`
            The id of the button is ${button.id}
            num1 is ${num1}
            num2 is ${num2}
            opeartor is ${operator}`)     
    });
});

function operate(num1, num2, symbol) {
    // Debugging line
    console.log("operate function ran");

    if (symbol === '+') {
        return (parseInt(num1, 10) + parseInt(num2, 10));
    } else if (symbol === '-') {
        return (parseInt(num1, 10) + parseInt(num2, 10));
    } else if (symbol === '*') {
        return (parseInt(num1, 10) + parseInt(num2, 10));
    } else if (symbol === '/') {
        return (parseInt(num1, 10) + parseInt(num2, 10));
    } 
}