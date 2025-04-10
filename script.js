let num1;
let num2;
let operator;
const keys = document.querySelectorAll('.keys');
let display = document.querySelector('#display');
let dText = document.querySelector('.dText');
const operators = ['/','*','-','+'];

Array.from(keys).forEach(key => {
    key.addEventListener('click' , e => {
        let selected = key.textContent;
        if (dText.textContent == 'ERROR') clear();
        if (!isNaN(Number(selected))) {
            if (/^0+$/.test(dText.textContent)) { //iff only zeroes are there, clear
                clear();
            }
            dText.textContent += key.textContent;
        }
        if (selected == 'C') clear();
        if (operators.includes(selected)) {
            if (!operators.some(op => dText.textContent.includes(op))){
                dText.textContent += selected;
            }
        }
        if (selected == '=') {
            if (dText.textContent == '') dText.textContent = 'ERROR';
            const index = dArray().findIndex(op => operators.includes(op));
            if (index != -1) {
            op = getOperator();
            firstNum = getValue().slice(0,index);
            console.log(firstNum)
            secondNum = getValue().slice(index+1);
            dText.textContent = operate(parseInt(firstNum),parseInt(secondNum),op);
            }
        }
    })
});

function getOperator() {
    const operator = dArray().find(op => operators.includes(op));
    return operator;
}

function getValue() {
    return dText.textContent;
}

function dArray() {
    const dArray = Array.from(getValue());
    return dArray;
}

function clear() {
    dText.textContent = '';
}

function operate(num1,num2,operator) {
    const operators = ['+','-','/','*'];
    if (!operators.includes(operator)){
        if (num1) return num1;
        if (num2) return num2;
    };
    if (operators.includes(operator)) {
        if (isNaN(num1) || isNaN(num2)) return 'ERROR';
        if (operator == '+') return (num1 + num2);
        if (operator == '-') return (num1 - num2);
        if (operator == '/') return (num1 / num2).toFixed(3);
        if (operator == '*') return (num1 * num2);
    }
}