//getting operands from the display
const display = document.getElementById('dText');
const keys = document.querySelectorAll('.keys');
const operators = ['-','*','/','+'];
let evaluated = false;

keys.forEach(key => {
    key.addEventListener('click', () => {
        const selected = key.textContent;

        if (display.textContent == 'ERROR' || evaluated === true) {
            //if error or result is displayed, clear display
            clearDisplay();
            evaluated = false;
        }

        //if number input
        if(!isNaN(selected)) display.textContent += selected;

        if(selected === 'C') {
            clearDisplay();
            return;
        }

        if (operators.includes(selected)) {
            const current = dText.textContent;

            if (selected === '-' && current === '') {
                display.textContent = '-';
                return;
            }
            
            // add op if not one at start only
            const hasOperator = operators.some(op => current.slice(1).includes(op));// checking after 1st char
            if (!hasOperator && current !== '' && current !== '-') display.textContent += selected;
            return;
        }

        if (selected === '<-') {
            const current = dText.textContent;
            if (current.length === 1) {
                display.textContent = '';
                return;
            }
            display.textContent = current.slice(0,-1);
            return;
        }

        //handle decimal
        if (selected === '.') {
            const current = dText.textContent;
            const hasDecimal = current.split('').some(char => char === '.');
            if (!hasDecimal) display.textContent += selected;
            return;
        }

        //handle equal
        if (selected === '=') {
            const exp = display.textContent;
            const operator = operators.find(op => exp.slice(1).includes(op));

            if(!operator) {
                display.textContent = 'ERROR';
                return;
            }

            const index = exp.indexOf(operator,1); //skip the first one
            const first = Number(exp.slice(0,index));
            const second = Number(exp.slice(index+1));
            let result = operate(first,second,operator);
            if (result === Infinity) {
                display.textContent = 'ERROR';
                return;
            }
            
            display.textContent = result.toFixed(2);
            evaluated = true;
            return;
        }
    })
})

function clearDisplay() {
    display.textContent = '';
}

function operate (operand1,operand2,operator) {
    if (isNaN(operand1) || isNaN(operand2)) {
    display.textContent = 'ERROR';
    return;
    }
    if (operator == '+') return (operand1 + operand2);
    if (operator == '-') return (operand1 - operand2);
    if (operator == '*') return (operand1 * operand2);
    if (operator == '/') return (operand1 / operand2);
    if (operator == '%') return (operand1 % operand2);
}

//keyboard support

document.addEventListener('keydown', (e) => {
    const key = e.key;
    const isNumber = !isNaN(key);
    const isOperator = operators.includes(key);
    const isDecimal = key === '.';
    const isEqual = key === '=' || key === 'Enter';
    const isDelete = key === 'Backspace';
    const isClear = key === 'c' || key === 'C' || key === 'Delete';

    if (isNumber || isOperator || isDecimal || isEqual || isDelete || isClear) {
        if (isNumber) {
            keys.forEach(k => {
                if (k.textContent === key) k.click();
            });
        } else if (isOperator) {
            keys.forEach(k => {
                if (k.textContent === key) k.click();
            });
        } else if (isDecimal) {
            keys.forEach(k => {
                if (k.textContent === '.') k.click();
            });
        } else if (isEqual) {
            keys.forEach(k => {
                if (k.textContent === '=') k.click();
            });
        } else if (isDelete) {
            keys.forEach(k => {
                if (k.textContent === '<-') k.click();
            });
        } else if (isClear) {
            keys.forEach(k => {
                if (k.textContent === 'C') k.click();
            });
        }
    }
});