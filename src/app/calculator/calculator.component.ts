import { Component, OnInit } from '@angular/core';
import { Stack } from '../stack';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  displayedText = "0";
  tempNumber = "0";
  stack: Stack<String> = new Stack(100);

  ngOnInit(): void {
  }

  clicked(type) {
    console.log(type);

    if ("+=-/XC".includes(type)) switch (type) {
      case "+": case "-": case "/": case "X": {
        this.stack.push(this.tempNumber);
        this.stack.push(type);
        this.tempNumber = "";
        this.displayedText = "0"
        break;
      }
      case "C": {
        this.update(false);

        break;
      }
      case "=": this.calculate();
    }

    else {
      if (this.displayedText === "0") {
        this.displayedText = ""; this.tempNumber = "";
      }
      this.update(true, type)
    }

  }
  update(increment, val?) {
    if (increment) {
      this.displayedText += val;
      this.tempNumber += val;
    }
    else {
      this.displayedText = "0";
      this.tempNumber = "0";
      this.stack.empty()
    }
  }
  calculate() {
    this.displayedText = "RESULT";
    if (this.tempNumber.length > 0) this.stack.push(this.tempNumber);
    this.stack.printContents();
  }
}
