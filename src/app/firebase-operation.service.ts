import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class FirebaseOperationService {

  constructor(public toastController: ToastController, private afs: AngularFirestore, public route: Router) { }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  add_item(email,value){
    try {
      this.afs.collection("users").doc(email).collection("task").add(value);
      this.showToast("Task Added!");
      this.route.navigate(["/welcome"]);
    } catch (err) {
      console.dir(err);
    }
  }

  get_all_items(email){
    return this.afs.collection("users").doc(email).collection('task');
  }

  
}
