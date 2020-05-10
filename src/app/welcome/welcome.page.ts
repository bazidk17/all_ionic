import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from '../firebase-auth.service';
import { Router } from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseOperationService } from '../firebase-operation.service';



@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public authObj: FirebaseAuthService, public router: Router, public operObj: FirebaseOperationService) { }

  data:any;
  email:any;
  namedata:any;

  ngOnInit() {
    this.email = localStorage.getItem('currentEmail');
    
    this.operObj.get_all_email_items(this.email).snapshotChanges().subscribe(result => {
      this.data = result;
    });

    this.operObj.get_email_info(this.email).snapshotChanges().subscribe(result => {
      this.namedata = result;
    });

  }
  gotoAdd() {
    localStorage.setItem('NewItem', 'True');
    this.router.navigate(["/item-add"]);

  }
  logout() {
    this.authObj.logout();
  }

  displayOne(){
    console.log("asdasd");
  }
}
