import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  txtEmail: any;
  txtPassword: any;


  constructor(public authObj: FirebaseAuthService,public route: Router) { }

  ngOnInit() {
  }
  gotoRegister(){
    this.route.navigate(["/home"]);
  }

  login() {
    this.authObj.login(this.txtEmail, this.txtPassword);
  }
}
