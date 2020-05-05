import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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


  constructor(public afAuth: AngularFireAuth,public route: Router) { }

  ngOnInit() {
  }
  gotoRegister(){
    this.route.navigate(["/home"]);
  }

  async login() {
    const { txtEmail, txtPassword } = this
    try{
      const res = await this.afAuth.signInWithEmailAndPassword(txtEmail,txtPassword)
      console.log("successful login");
      this.route.navigate(["/welcome"]);
    }
    catch(err){
      console.dir(err)
      if (err.code==="auth/user-not-found"){
        console.log("User not found");
      }
    }
  }
}
