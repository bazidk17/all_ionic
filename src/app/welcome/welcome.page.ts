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

  ngOnInit() {
    this.operObj.get_all_items("qwe@gmail.com").snapshotChanges().subscribe(result => {

      this.data = result;
      result.forEach(one_data => {
        // console.log(one_data.payload.doc.id);
        console.log(one_data.payload.doc);
      })
      // console.log(tasks);
    });

  }
  gotoAdd() {
    this.router.navigate(["/item-add"]);

  }
  logout() {
    this.authObj.logout();
  }
}
