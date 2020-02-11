import { ui } from './ui';

// Calculations class
class calculations {
  constructor() {
    this.lastClicked = '';
    this.operators = 0;
    this.display = '0';
    this.equation = '0';
  }

  handleNum(e) {
    const display = document.querySelector('#display');
    const equation = document.querySelector('#equation');
    console.log(this.display, this.equation, this.lastClicked, this.operators);
    // Clear display and equation if starting from initial value or after evaluated
    // Dont allow zeroes at beginning of equation
    if (
      (this.display === '0' &&
        e.target.value !== '0' &&
        e.target.value !== '.') ||
      this.lastClicked === '='
    ) {
      this.clearDisplay();
      this.clearEquation();
      this.display = e.target.value;
      this.equation = e.target.value;
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }

    // If decimal point is entered and there is not already a decimal point in the number
    // Append the decimal to the number on the display and equation
    else if (
      (e.target.value === '.' && this.display.indexOf('.') === -1) ||
      ((this.lastClicked === '+' ||
        this.lastClicked === '*' ||
        this.lastClicked === '/' ||
        this.lastClicked === '-') &&
        e.target.value === '0')
    ) {
      this.display += e.target.value;
      this.equation += e.target.value;
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    } else if (this.lastClicked === '0') {
      this.clearDisplay();
      console.log(this.equation);
      this.equation =
        this.equation.substring(0, this.equation.length - 1) + e.target.value;
      this.display = e.target.value;
      this.lastClicked = e.target.value;
      this.operators = 1;

      equation.textContent = this.equation;
      display.textContent = this.display;
    }
    // If calculator is not in initial value and value is not a decimal
    // When number is entered append the number to the rest of the equation and display
    // MAX numbers allowed on display is 21
    else if (
      e.target.value !== '.' &&
      this.display !== '0' &&
      this.display.length < 21
    ) {
      this.display += e.target.value;
      this.equation += e.target.value;
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    e.preventDefault();
  }

  handleOperator(e) {
    const display = document.querySelector('#display');
    const equation = document.querySelector('#equation');
    // If operator is entered when Calculator is in it's initial value
    if (this.display === '0' || this.equation === '0') {
      this.clearDisplay();
      this.clearEquation();

      this.display = e.target.value;
      this.equation = e.target.value;
      this.lastClicked = e.target.value;
      this.operators = 1;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    // If an equation was just evaluated only clear the display so operators can be performed on
    // previous equation's result
    else if (this.lastClicked === '=') {
      this.clearDisplay();
      this.display = e.target.value;
      this.equation =
        this.equation.substring(
          this.equation.indexOf('=') + 1,
          this.equation.length
        ) + e.target.value;
      this.lastClicked = e.target.value;
      this.operators = 1;

      display.textContent = this.display;
      equation.textContent = this.equation;
      // If a subtraction/negative operator is entered and lastClicked is not a subtraction/negative operator
      // Append the subtraction/negative operator to the first operator
    } else if (
      e.target.value === '-' &&
      (this.lastClicked === '+' ||
        this.lastClicked === '*' ||
        this.lastClicked === '/')
    ) {
      this.clearDisplay();
      this.equation += e.target.value;
      this.display = e.target.value;
      this.lastClicked = e.target.value;
      this.operators = 2;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    // If 2 or more operators are entered consecutively, the operation performed should be the last operator entered
    else if (
      this.lastClicked === '-' &&
      this.operators === 2 &&
      e.target.value !== '-'
    ) {
      this.clearDisplay();
      this.equation =
        this.equation.substring(0, this.equation.length - 2) + e.target.value;
      this.display = e.target.value;
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    // If an operator is entered after another operator (excluding negative sign)
    // Remove last operator and append the current operator
    else if (
      (e.target.value === '+' ||
        e.target.value === '*' ||
        e.target.value === '/') &&
      (this.lastClicked === '+' ||
        this.lastClicked === '*' ||
        this.lastClicked === '/' ||
        this.lastClicked === '-')
    ) {
      this.clearDisplay();
      this.equation =
        this.equation.substring(0, this.equation.length - 1) + e.target.value;
      this.display = e.target.value;
      this.lastClicked = e.target.value;
      this.operators = 1;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    // Append operator straight to the display/equation if lastClicked is not an operator
    else if (
      (e.target.value === '+' ||
        e.target.value === '*' ||
        e.target.value === '/' ||
        e.target.value === '-') &&
      this.lastClicked !== '+' &&
      this.lastClicked !== '*' &&
      this.lastClicked !== '/' &&
      this.lastClicked !== '-'
    ) {
      this.clearDisplay();
      this.equation += e.target.value;
      this.display = e.target.value;
      this.lastClicked = e.target.value;
      this.operators = 1;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    e.preventDefault();
  }

  handleEval(e) {
    const display = document.querySelector('#display');
    const equation = document.querySelector('#equation');
    // If equation ends with an operator, remove it from the equation before evaluating
    let trimmedEquation = '';
    // testRegex is used to make sure equation operators are in order before evaluating
    let testRegex = /^([*\/]{1,}[+-]*)+([\d.]*[-+*\/]*)*([\d.]*[-+*\/]{1,}[\d.]*)*$|(^[.=]+$)/;
    // If equation ends with 2 operators take them off before evaluating
    if (
      (this.equation.endsWith('+-') ||
        this.equation.endsWith('*-') ||
        this.equation.endsWith('/-')) &&
      this.lastClicked !== '=' &&
      testRegex.test(this.equation) === false
    ) {
      trimmedEquation = this.equation.substring(0, this.equation.length - 2);
      let answer =
        Math.round(1000000000000 * eval(trimmedEquation)) / 1000000000000;
      this.equation = `${trimmedEquation} = ${answer}`;
      this.display = answer;
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    // If equation ends with 1 operator take it off before evaluating
    else if (
      (this.equation.endsWith('+') ||
        this.equation.endsWith('-') ||
        this.equation.endsWith('*') ||
        this.equation.endsWith('/')) &&
      this.lastClicked !== '=' &&
      testRegex.test(this.equation) === false
    ) {
      trimmedEquation = this.equation.substring(0, this.equation.length - 1);
      let answer =
        Math.round(1000000000000 * eval(trimmedEquation)) / 1000000000000;
      this.equation = `${trimmedEquation} = ${answer}`;
      this.display = answer;
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    // If equation is written properly and testRegex passes
    else if (
      this.lastClicked !== '=' &&
      testRegex.test(this.equation) === false
    ) {
      let answer =
        Math.round(1000000000000 * eval(this.equation)) / 1000000000000;
      this.equation = `${this.equation} = ${answer}`;
      this.display = answer;
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    } else if (this.lastClicked !== '=') {
      this.equation = 'Error';
      this.display = '0';
      this.lastClicked = e.target.value;

      display.textContent = this.display;
      equation.textContent = this.equation;
    }
    e.preventDefault();
  }

  clearDisplay() {
    this.display = '0';
    document.querySelector('#display').textContent = '0';
  }
  clearEquation() {
    this.equation = '0';
    document.querySelector('#equation').textContent = '0';
  }
  onClear() {
    this.clearDisplay();
    this.clearEquation();
  }
}

export const calc = new calculations();
