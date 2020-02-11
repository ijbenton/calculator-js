import { calc } from './calc';
import { ui } from './ui';
// Get UI selectors
const UISelectors = ui.getSelectors();

console.log(UISelectors);
console.log(calc);

// Number click events (handleNum)
document
  .querySelector(UISelectors.nineBtn)
  .addEventListener('click', handleNum);
document
  .querySelector(UISelectors.eightBtn)
  .addEventListener('click', handleNum);
document
  .querySelector(UISelectors.sevenBtn)
  .addEventListener('click', handleNum);
document.querySelector(UISelectors.sixBtn).addEventListener('click', handleNum);
document
  .querySelector(UISelectors.fiveBtn)
  .addEventListener('click', handleNum);
document
  .querySelector(UISelectors.fourBtn)
  .addEventListener('click', handleNum);
document
  .querySelector(UISelectors.threeBtn)
  .addEventListener('click', handleNum);
document.querySelector(UISelectors.twoBtn).addEventListener('click', handleNum);
document.querySelector(UISelectors.oneBtn).addEventListener('click', handleNum);
document
  .querySelector(UISelectors.zeroBtn)
  .addEventListener('click', handleNum);

document
  .querySelector(UISelectors.decimalBtn)
  .addEventListener('click', handleNum);

// Operator click events (handleOperator)
document
  .querySelector(UISelectors.divideBtn)
  .addEventListener('click', handleOperator);
document
  .querySelector(UISelectors.multiplyBtn)
  .addEventListener('click', handleOperator);
document
  .querySelector(UISelectors.subtractBtn)
  .addEventListener('click', handleOperator);
document
  .querySelector(UISelectors.addBtn)
  .addEventListener('click', handleOperator);

// Clear equation click event
document.querySelector(UISelectors.clearBtn).addEventListener('click', onClear);

// Equals sign click event
document
  .querySelector(UISelectors.equalsBtn)
  .addEventListener('click', handleEval);

function handleNum(e) {
  calc.handleNum(e);
}
function handleEval(e) {
  calc.handleEval(e);
}
function handleOperator(e) {
  calc.handleOperator(e);
}

function onClear() {
  calc.onClear();
}
