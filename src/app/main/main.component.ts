import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../datatypes/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  users: User[];
  loggedIn: boolean = false;
  username: string = "";
  invalid: boolean = false;

  constructor(private userService: UserService) { }



  ngOnInit(): void {
    this.userService.loadUsers(data => {
      this.users = data;
      console.log(data);

    });

  }
  login() {
    const user: User = {
      username: this.username,
      calculation: "",
      time: new Date().getTime()
    };

    if (this.username.length > 1) this.userService.login(
      user, () => {
        this.loggedIn = true;
        this.invalid = false;
      });
    else {
      this.invalid = true;
    }
  }

}
