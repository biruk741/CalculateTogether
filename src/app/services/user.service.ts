import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../datatypes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];
  currentUser: User;

  constructor(private db: AngularFireDatabase) { }

  loadUsers(fun?: (n: any[]) => any) {
    return this.db.list("users").valueChanges()
      .subscribe(data => {
        const sorted = this.sort(data as User[]);
        this.users = sorted;
        fun(sorted)
      })
  }

  async updateUsers(updatedUser: User) {
    console.log(JSON.stringify(this.users));
    return this.db.object(`users/${this.currentUser.username}`)
      .set(JSON.parse(JSON.stringify(updatedUser)))
  }

  login(x: User, callback: (d: any) => any) {
    return this.db.object(`users/${x.username}`).set(x).then(data => {
      this.currentUser = x
      callback(data);
    })
  }
  sort(users: User[]) {
    return users.sort((a, b) => a.time < b.time ? 1 : -1).slice(0, 10)
  }
}
