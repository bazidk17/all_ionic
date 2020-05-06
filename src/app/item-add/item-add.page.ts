import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseOperationService } from '../firebase-operation.service';


@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit {

  constructor(public route: Router, public operObj: FirebaseOperationService) { }
  txtdesc;
  txttitle;

  ngOnInit() {
  }

  newItem() {
    let value = {
      title: this.txttitle,
      description: this.txtdesc
    }
    let email = "qwe@gmail.com";
    this.operObj.add_item(email,value);


  }
  gobackHome() {
    this.route.navigate(["/welcome"]);

  }
}
