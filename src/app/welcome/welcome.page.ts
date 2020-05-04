import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public afAuth: AngularFireAuth, public route: Router) { }

  name:any;
  ngOnInit() {
    if (this.afAuth.currentUser) {
      this.name=this.afAuth.user;
    }
  }

  logout(){
    if (this.afAuth.currentUser) {
      this.afAuth.signOut()
        .then(() => {
          console.log("LOG Out");
          this.route.navigate(["/login"]);

        }).catch((error) => {
          console.log(error);
          
        });
    }
  }
}
