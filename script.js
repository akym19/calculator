const result = document.querySelector("#result");
const prevInputs = document.querySelector("#prevInputs");
const operators = document.querySelector(".operator");
const numbers = document.querySelectorAll('[data-number]');
const equals = document.getElementById('equals')
const clearBtn = document.querySelector('#clearBtn')

let firstOperand;
let secondOperand;
let operator;

function clear(){
    prevInputs.textContent = '0';
    result.textContent = '0';
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
    if (operator === '+') return add(a,b)
    if (operator === '-') return subtract(a,b)
    if (operator === '×') return multiply(a,b)
    if (operator === '÷') return divide(a,b)
}

function insertNums(input){
    if (prevInputs.textContent === '0'){
        prevInputs.textContent = '';
    }
    prevInputs.textContent += input;
}

function setOperands(text){
    if (result.textContent === '0' && prevInputs.textContent === '0'){
        operation = text.split(' ');
        firstOperand = Number(operation[0]);
        secondOperand = Number(operation.slice(-1));
    } else {
        firstOperand = Number(result.textContent)
        operation = prevInputs.textContent.split(' ');
        secondOperand = Number(operation.slice(-1));
    }
    
}

function keyPressed(e){
    if (e.key >= 0 && e.key <= 9) insertNums(e.key);
    if (e.key === '*') {insertNums(' × '); operator = '×'}
    if (e.key === '/') {insertNums(' ÷ '); operator = '÷'}
    if (e.key === '+') {insertNums(' + '); operator = '+'}
    if (e.key === '-') {insertNums(' - '); operator = '-'}
    if (e.key === 'Escape') clear();
    if (e.key === '=' || e.key === 'Enter') {
        setOperands(prevInputs.textContent);
        result.textContent = operate(firstOperand,secondOperand,operator);
    }
}

numbers.forEach(btn => btn.addEventListener('click', () => insertNums(btn.textContent)));
window.addEventListener('keydown', keyPressed)