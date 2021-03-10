import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <span *ngIf="!isEquals" (click)="onClick()">{{type}}</span>
    <span *ngIf="isEquals" id="equals" (click)="onClick()">{{type}}</span>
  `,
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor() { }
  @Input() type = "7";
  @Input() isEquals = false;
  @Output() clicked = new EventEmitter();

  ngOnInit(): void {
  }

  onClick(){
    this.clicked.emit(this.type)
  }
}
