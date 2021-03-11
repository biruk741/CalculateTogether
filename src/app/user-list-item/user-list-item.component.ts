import { Component, Input, OnInit } from '@angular/core';
import { User } from '../datatypes/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  constructor(private userService : UserService) { }

  name : string;
  calculation : string;

  @Input() user : User;

  ngOnInit(): void {
    this.name = this.user.username;
    this.calculation = this.user.calculation;
  }

}
