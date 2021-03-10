import { Component, OnInit } from '@angular/core';
import { Queue } from '../queue';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  displayedText: string = "0";
  tempNumber: string = "0";
  stack: Queue = new Queue();
  steps: string = "0";
  shownResult: boolean = false;

  ngOnInit(): void {
  }

  clicked(type: string) {
    console.log(type);

    if ("+=-/XC".includes(type)) switch (type) {
      case "+": case "-": case "/": case "X": {
        this.stack.push(this.tempNumber);
        this.stack.push(type);
        this.tempNumber = "";
        this.displayedText = "0";
        this.steps = this.stack.getContents(true);
        break;
      }
      case "C": {
        this.clear();
        break;
      }
      case "=": this.calculate();
    }

    else {
      if (this.shownResult) {
        this.shownResult = false;
        this.clear();
      }
      this.update(type)
    }

  }
  update(val: string) {
    if (this.displayedText === "0") {
      this.displayedText = ""; this.tempNumber = "";
    }
    this.displayedText += val;
    this.tempNumber += val;
  }
  clear() {
    this.stack.empty();
    this.displayedText = "0";
    this.tempNumber = "0"
    this.steps = "0";
  }
  calculate() {
    this.steps = this.stack.getContents() + ((this.tempNumber.length > 0) ? this.tempNumber : "") + "=";
    if (this.tempNumber.length > 0) this.stack.push(this.tempNumber);
    this.stack.printContents();
    this.displayedText = this.stack.getResult();
    this.stack.empty();
    this.tempNumber = "";
    this.shownResult = true;
  }
}
