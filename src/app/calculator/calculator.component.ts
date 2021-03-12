import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Queue } from '../queue';
import { User } from '../datatypes/user';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor(private userService: UserService) { }

  displayedText: string = "0";
  tempNumber: string = "0";
  stack: Queue = new Queue();
  steps: string = "0";
  shownResult: boolean = false;
  user: User;

  ngOnInit(): void {
    this.user = this.userService.currentUser;
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
    this.steps = this.stack.getContents(true) + ((this.tempNumber.length > 0) ? this.tempNumber : "") + "=";
    if (this.tempNumber.length > 0) this.stack.push(this.tempNumber);

    let result = this.stack.getResult();
    if (result !== 'Invalid input' && result !== 'NaN') this.userService.updateUsers(
      {
        username: this.user.username,
        time: new Date().getTime(),
        calculation: `${this.steps} ${result}`
      });
    this.displayedText = result;

    this.stack.empty();
    this.tempNumber = "";
    this.shownResult = true;
  }
}
