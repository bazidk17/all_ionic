import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public authObj: FirebaseAuthService, public route: Router, public afAuth: AngularFireAuth) { }

  name:any;
  ngOnInit() {
    if (this.afAuth.currentUser) {
      this.name=this.afAuth.user;
      console.log(this.name);
    }
  }
  gotoAdd(){
    this.route.navigate(["/item-add"]);

  }
  logout(){
    this.authObj.logout();
  }
}
