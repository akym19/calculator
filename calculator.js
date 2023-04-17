const result = document.querySelector("#result");
const prevInputs = document.querySelector("#prevInputs");
const operatorBtns = document.querySelectorAll("[data-operator]");
const numbers = document.querySelectorAll('[data-number]');
const equals = document.getElementById('equals')
const clearBtn = document.querySelector('#clearBtn')
const deleteBtn = document.querySelector('#dlteBtn')

deleteBtn.addEventListener('click', dlte)
clearBtn.addEventListener('click', clear)
equals.addEventListener('click', evaluate)

let firstOperand;
let secondOperand;
let operator;
let operation;
let answer;

function clear(){
    prevInputs.textContent = '';
    result.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    operator = '';
}

function dlte(){
    prevInputs.textContent = prevInputs.textContent.slice(0,-1)
}

function add(a,b) {return a + b};
function subtract(a,b) {return a - b};
function multiply(a,b) {return a * b};
function divide(a,b) {
    if (b === 0){
        return "Math Error";
    }
    return Math.round(a / b * 100000) / 100000;
}

function operate(a,b,operator) {
    if (operator === '+') answer = add(a,b)
    if (operator === '-') answer = subtract(a,b)
    if (operator === '×') answer = multiply(a,b)
    if (operator === '÷') answer = divide(a,b)
    return answer;
}

function insertNums(input){
    prevInputs.textContent += input;
}

function setOperands(text){
    if (firstOperand == undefined){
        operation = text.split(' ');
        firstOperand = Number(operation[0]);
        secondOperand = Number(operation.slice(-1));
    } else {
        firstOperand = Number(result.textContent)
        operation = prevInputs.textContent.split(' ');
        secondOperand = Number(operation.slice(-1));
    }
    
}

function evaluate(){
    setOperands(prevInputs.textContent);
    result.textContent = operate(firstOperand,secondOperand,operator);
}

function keyPressed(e){
    if (e.key >= 0 && e.key <= 9) insertNums(e.key);
    if (e.key === '*') {insertNums(' × '); operator = '×'}
    if (e.key === '/') {insertNums(' ÷ '); operator = '÷'}
    if (e.key === '+') {insertNums(' + '); operator = '+'}
    if (e.key === '-') {insertNums(' - '); operator = '-'}
    if (e.key === 'Escape') clear();
    if (e.key === 'Backspace') dlte();
    if (e.key === '=' || e.key === 'Enter') {
        evaluate()
    }
}

function handleOperatorClicked() {
    let clickedOperator = this.textContent;
    operator = clickedOperator;
    insertNums(` ${this.textContent} `)
}

numbers.forEach(btn => btn.addEventListener('click', () => insertNums(btn.textContent)));
operatorBtns.forEach(btn => btn.addEventListener('click', handleOperatorClicked))
window.addEventListener('keydown', keyPressed)

// function keyPressed(event) {
//     const key = event.key;
//     if (/[0-9]/.test(key)) {
//         onNumberClick(key);
//     } else if (/[\+\-\*/]/.test(key)) {
//         const operatorButton = Array.from(operatorButtons).find(btn => btn.textContent === key);
//         if (operatorButton) {
//             onOperatorClick(operatorButton);
//         }
//     } else if (key === '.' || key === ',') {
//         appendPoint();
//     } else if (key === 'Backspace' || key === 'Delete') {
//         dlte();
//     } else if (key === 'Enter') {
//         // if (firstOperand && operator && result.textContent !== '0') {
//         if (firstOperand && operator) {
//             prevInputs.textContent += result.textContent + " = ";
//             secondOperand = Number(result.textContent);
//             result.textContent = operate(firstOperand, secondOperand, operator);
//         }
//     } else if (key === 'Escape') {
//         clear();
//     }
// }