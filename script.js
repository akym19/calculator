const result = document.querySelector("#result");
const prevInputs = document.querySelector("#prevInputs");
const operators = document.querySelector(".operator");
const btns = document.querySelectorAll('.btn');
const equals = document.getElementById('equals')

let firstOperand;
let secondOperand;
let operator;
let answer;
let operation;

function add(a,b) {return a + b}
function subtract(a,b) {return a - b}
function multiply(a,b) {return a * b}
function divide(a,b) {
    if (b === 0){
        return "Math Error"
    }
    return Math.round(a / b * 100000) / 100000
}

function insertNums(number) {
    if (prevInputs.textContent === '0'){
        prevInputs.textContent = '';
    }
    prevInputs.textContent += number;
}

function operate(a,b,operator) {
    if (operator === '+') answer = add(a,b)
    if (operator === '-') answer = subtract(a,b)
    if (operator === '×') answer = multiply(a,b)
    if (operator === '÷') answer = divide(a,b)
    result.textContent = answer;
}

function checkOperands(text){
    if (answer === undefined){
        operation = text.split(operator)
        firstOperand = Number(operation[0])
        secondOperand = Number(operation[1])
        operate(firstOperand,secondOperand,operator)
    } else {
        firstOperand = Number(answer)
        operation = text.split(operator)
        secondOperand = Number(operation.slice(-1))
        operate(firstOperand,secondOperand,operator)
    }
}

function keyPressed(e){
    if (e.key >= 0 && e.key <= 9) insertNums(e.key);
    if (e.key === '*') {insertNums('×'); operator = '×'}
    if (e.key === '/') {insertNums('÷'); operator = '÷'}
    if (e.key === '+') {insertNums('+'); operator = '+'}
    if (e.key === '-') {insertNums('-'); operator = '-'}
    if (e.key === '=' || e.key === 'Enter') {checkOperands(prevInputs.textContent)}
}

btns.forEach(btn => btn.addEventListener('click', () => insertNums(btn.textContent)));
window.addEventListener('keydown', keyPressed)