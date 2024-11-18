let buttons = document.querySelectorAll(".calculator-button")
let num1 = [];
let num2 = [];
let hasOperator = false;
let operator = null;

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        // Print the id of the clicked button
        console.log(`The id of the button is ${button.id}`)
        console.log(`The content is ${button.textContent}`)

        // Create temperary variable
        if (button.id === 'number' && operator === false) {
            num1.push(button.textContent);
        } else if (operator === true) {
            num2.push(button.textContent);
        }

        // Change operator status 
        if (num1 !== null && button.id ==='symbol' && opeartor === null) {
            hasOperator = true;
            operator = button.textContent;
        } else if (num2 === null){
            num2 = num1;
            operate(num1,num2,symobl);
        } else {
            operate(num1,num2,symbol);
        }
        
    });
});

function operate(num1, num2, symbol) {

}