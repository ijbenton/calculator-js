// UI Controller
class UI {
  constructor() {
    this.UISelectors = {
      equation: '#equation',
      display: '#display',
      clearBtn: '#clear',
      divideBtn: '#divide',
      multiplyBtn: '#multiply',
      subtractBtn: '#subtract',
      addBtn: '#add',
      decimalBtn: '#decimal',
      nineBtn: '#nine',
      eightBtn: '#eight',
      sevenBtn: '#seven',
      sixBtn: '#six',
      fiveBtn: '#five',
      fourBtn: '#four',
      threeBtn: '#three',
      twoBtn: '#two',
      oneBtn: '#one',
      zeroBtn: '#zero',
      equalsBtn: '#equals'
    };
  }

  getSelectors() {
    console.log(this.UISelectors);
    return this.UISelectors;
  }
}

export const ui = new UI();
