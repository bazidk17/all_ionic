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
      localStorage.setItem('NewItem', 'False');

      this.route.navigate(["/welcome"]);
    } catch (err) {
      console.dir(err);
    }
  }

  get_all_email_items(email){
    return this.afs.collection("users").doc(email).collection('task');
  }

  get_email_info(email){
    return this.afs.collection("users").doc(email);

  }

  getTask(id: string) {
    const email = localStorage.getItem('currentEmail');
    localStorage.setItem('Edit','True');
    return this.afs.collection("users").doc(email).collection("task").doc(id);
  }

  delete_item(id: string){
    const email = localStorage.getItem('currentEmail');
    this.showToast("Item deleted");
    return this.afs.collection("users").doc(email).collection("task").doc(id).delete();
  }

  update_item(id,title,desc){
    const email = localStorage.getItem('currentEmail');
    let task = { title: title, description: desc };
    this.showToast("Item updated!");
    return this.afs.collection("users").doc(email).collection("task").doc(id).update(task);
  }
}
