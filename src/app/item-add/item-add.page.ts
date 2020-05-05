import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.page.html',
  styleUrls: ['./item-add.page.scss'],
})
export class ItemAddPage implements OnInit {

  constructor(public route: Router) { }

  ngOnInit() {
  }
  newItem(){
    
  }
  gobackHome(){
    this.route.navigate(["/welcome"]);

  }
}
