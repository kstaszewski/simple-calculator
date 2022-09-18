class Calculator {
    constructor (prevOperationText, currentOperationText) {
        this.prevOperationText = prevOperationText;
        this.currentOperationText = currentOperationText;
        this.clear();
    };
    clear () {
        this.currentOperation = '';
        this.prevOperation = '';
        this.operation = undefined;
        this.isResult = false;
        this.updateState();
    }
    delete () {
        this.currentOperation = this.currentOperation.toString().slice(0, -1);
        this.updateState();
    }
    appendNumber (number) {
        if (this.isResult) this.clear();
        if (number === '.' && this.currentOperation.includes(".")) return;
        this.currentOperation = this.currentOperation.toString() + number.toString();
        this.updateState();
    }
    operationSelect (operation) {
        if (this.currentOperation === '') return;
        this.isResult = false;
        if (this.prevOperation !== '') this.compute();
        this.operation = operation;
        this.prevOperation = this.currentOperation;
        this.currentOperation = '';
        this.updateState();
    }
    compute (equalButtonClicked) {
        let computation;
        const prev = parseFloat(this.prevOperation);
        const current = parseFloat(this.currentOperation);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperation = computation;
        this.operation = undefined;
        this.prevOperation = '';
        if (equalButtonClicked) this.isResult = true;
        this.updateState();
    }
    updateState () {
        this.currentOperationText.innerText = this.currentOperation;
        if (this.operation != null) this.prevOperationText.innerText =
            `${this.prevOperation} ${this.operation}`;
        else this.prevOperationText.innerText = '';

    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operandButtons = document.querySelectorAll('[data-operand]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const equalButton = document.querySelector('[data-equal]');

const prevOperationText = document.querySelector('[data-prevOperations]');
const currentOperationText = document.querySelector('[data-currentOperations]');

const calculator = new Calculator(prevOperationText, currentOperationText);

numberButtons.forEach(button => button.addEventListener('click', (e) => calculator.appendNumber(e.target.value)));

operandButtons.forEach(button => button.addEventListener('click', (e) => calculator.operationSelect(e.target.value)));

equalButton.addEventListener('click', () => calculator.compute(true));

clearButton.addEventListener('click', () => calculator.clear());

deleteButton.addEventListener('click', () => calculator.delete());