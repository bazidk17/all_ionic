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
  imgURL:any;
  task_id:string;
  edit:boolean;
  imagePath:File;
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
        this.imgURL = result.payload.get("imagePath");
        console.log(result);
      });
    }
  }
  

  newItem() {
    let email = localStorage.getItem('currentEmail');
    this.operObj.add_item(email,this.txttitle,this.txtdesc,this.imagePath);
    
  }
  gobackHome() {
    localStorage.setItem('NewItem', 'False');
    this.route.navigate(["/welcome"]);

  }

  updateItem(){
    this.operObj.update_item(this.id,this.txttitle,this.txtdesc,this.imagePath);
    this.route.navigate(["/welcome"]);
  }

  deleteItem(){
    this.operObj.delete_item(this.id);
    this.route.navigate(["/welcome"]);

  }

  preview(files) {
    if (files.length === 0)
      return;

    var reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
