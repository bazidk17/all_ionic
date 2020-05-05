import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  txtname;
  txtpassword;
  txtphone;
  txtemail;

  constructor(public afAuth: AngularFireAuth,
    public route: Router,
  ) { }

  gotoLogin(){
    this.route.navigate(["/login"]);
  }

  async register() {
    const { txtname, txtpassword, txtphone, txtemail } = this
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(txtemail, txtpassword);
      console.log("regsitered");
      this.gotoLogin();

    }
    catch (err) {
      console.dir(err);
    }
  }
}
