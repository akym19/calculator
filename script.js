function add(a,b) {return a + b};
function subtract(a,b) {return a - b};
function multiply(a,b) {return a * b};
function divide(a,b) {
    if (b === 0){
        return "Math Error";
    }
    return Math.round(a / b * 100000) / 100000;
};

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const prevInputs = document.querySelector("#prevInputs");
const result = document.querySelector('#result');
const equalsButton = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");
const clearButton = document.querySelector("#clearBtn")
const deleteButton = document.querySelector('#dlteBtn')

let firstOperand;
let secondOperand;
let operator;
let displayvalue;

function operate(a,b,operator) {
    if (operator === '+') return add(a,b);
    if (operator === '-') return subtract(a,b);
    if (operator === '×') return multiply(a,b);
    if (operator === '÷') return divide(a,b);
}

function onNumberClick(number) {
    if (result.textContent === '0'){
        result.textContent = '';
    }
    result.textContent += number;
}

function clear(){
    prevInputs.textContent = '';
    result.textContent = '0';
}

function onOperatorClick(button) {
    operator = button.textContent;
    displayvalue = result.textContent;
    firstOperand = Number(displayvalue);
    prevInputs.textContent = displayvalue + ` ${operator} `;
    result.textContent = '0';
}

function appendPoint(){
    if (!result.textContent.includes('.')) {
        result.textContent += '.';
    }
}

function dlte() {
    result.textContent = result.textContent.length === 1 ? '0' : result.textContent.slice(0, -1);
} 

function keyPressed(event) {
    const key = event.key;
    if (!isNaN(Number(key))) {
        onNumberClick(key);
    } else if (key === '+' || key === '-') {
        onOperatorClick({ textContent: key });
    } else if (key === '*' || key === '/') {
        onOperatorClick({ textContent: key === '*' ? '×' : '÷' });
    } else if (key === '.' || key === ',') {
        appendPoint();
    } else if (key === 'Enter' || key === '=') {
        equalsButton.click();
    } else if (key === 'Backspace') {
        dlte();
    } else if (key === 'Escape') {
        clear();
    }
}

numberButtons.forEach(btn => btn.addEventListener('click', () => onNumberClick(btn.textContent)));
operatorButtons.forEach(btn => btn.addEventListener('click', () => onOperatorClick(btn)));
decimal.addEventListener('click', appendPoint)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', dlte)
equalsButton.addEventListener('click', () => {
    if (firstOperand && operator){
        prevInputs.textContent += result.textContent  + " = ";
        secondOperand = Number(result.textContent);
        result.textContent = operate(firstOperand,secondOperand,operator);
    }
})

window.addEventListener('keydown', keyPressed)
