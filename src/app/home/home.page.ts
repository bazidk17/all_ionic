import { Component } from '@angular/core';

import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../firebase-auth.service';

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

  constructor(public authObj: FirebaseAuthService,
    public route: Router,
  ) { }

  gotoLogin() {
    this.route.navigate(["/login"]);
  }

  register() {
    this.authObj.register(this.txtemail,this.txtpassword,this.txtname,this.txtphone);
  }
}
