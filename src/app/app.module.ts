import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { UserListItemComponent } from './user-list-item/user-list-item.component';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import { FormsModule } from '@angular/forms';

const firebaseConfig  = {
  apiKey: "AIzaSyBsUBRZPb4iP58Wjx-_Uyo-FJzIVikezcg",
  authDomain: "calculatetogether.firebaseapp.com",
  databaseURL: "https://calculatetogether-default-rtdb.firebaseio.com",
  projectId: "calculatetogether",
  storageBucket: "calculatetogether.appspot.com",
  messagingSenderId: "325928134961",
  appId: "1:325928134961:web:8ac30bcf2164d58f8c2810"
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CalculatorComponent,
    UserListItemComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
