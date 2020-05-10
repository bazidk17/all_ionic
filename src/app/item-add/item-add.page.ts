import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FirebaseOperationService } from '../firebase-operation.service';


@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit {

  constructor(public route: Router, public operObj: FirebaseOperationService,public router:ActivatedRoute) { }
  txtdesc;
  txttitle;

  task_id:string;
  edit:boolean;
  id:any;

  ngOnInit() {
    let fate=localStorage.getItem('NewItem');
    if (fate=="False") {
      this.edit=false;
    }
    else{
      this.edit=true;
    }

    this.id = this.router.snapshot.paramMap.get('id')
    this.task_id = this.id;
    if (this.id) {
      this.operObj.getTask(this.id).snapshotChanges().subscribe(result => {
        this.txttitle = result.payload.get("title");
        this.txtdesc = result.payload.get("description");
        console.log(result);
      });
    }
  }
  

  newItem() {
    let value = {
      title: this.txttitle,
      description: this.txtdesc
    }
    let email = localStorage.getItem('currentEmail');
    this.operObj.add_item(email,value);
    
  }
  gobackHome() {
    localStorage.setItem('NewItem', 'False');
    this.route.navigate(["/welcome"]);

  }

  updateItem(){
    this.operObj.update_item(this.id,this.txttitle,this.txtdesc);
    this.route.navigate(["/welcome"]);
  }

  deleteItem(){
    this.operObj.delete_item(this.id);
    this.route.navigate(["/welcome"]);

  }
}
