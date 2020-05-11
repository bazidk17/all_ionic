import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';





@Injectable({
  providedIn: 'root'
})
export class FirebaseOperationService {

  constructor(public toastController: ToastController, private afs: AngularFirestore, public route: Router, private storage: AngularFireStorage) { }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  add_item(email, title, desc, image) {
    const imgtitle = new Date().getTime();
    const ref = this.storage.ref('images/' + imgtitle);

    ref.put(image).then(() => {
      ref.getDownloadURL().subscribe(imagePath => {
        const value = { title: title, description: desc, imagePath: imagePath };

        this.afs.collection("users")
          .doc(email)
          .collection("task")
          .add(value)
          .then(newtask => {
            console.log(newtask);
            this.showToast("Task Added!");
            localStorage.setItem('NewItem', 'False');
            this.route.navigate(["/welcome"]);
          });
      });
    });
    // try {

    //   this.afs.collection("users").doc(email).collection("task").add(value);
    //   this.showToast("Task Added!");
    //   localStorage.setItem('NewItem', 'False');

    //   this.route.navigate(["/welcome"]);
    // } catch (err) {
    //   console.dir(err);
    // }
  }

  get_all_email_items(email) {
    return this.afs.collection("users").doc(email).collection('task');
  }

  get_email_info(email) {
    return this.afs.collection("users").doc(email);

  }

  getTask(id: string) {
    const email = localStorage.getItem('currentEmail');
    localStorage.setItem('Edit', 'True');
    return this.afs.collection("users").doc(email).collection("task").doc(id);
  }

  delete_item(id: string) {
    const email = localStorage.getItem('currentEmail');
    this.showToast("Item deleted");
    return this.afs.collection("users").doc(email).collection("task").doc(id).delete();
  }

  update_item(id, title, desc, image) {
    const email = localStorage.getItem('currentEmail');

    const imgtitle = new Date().getTime();
    const ref = this.storage.ref('images/' + imgtitle);

    ref.put(image).then(() => {
      ref.getDownloadURL().subscribe(imagePath => {
        const value = { title: title, description: desc, imagePath: imagePath };

        this.afs.collection("users").doc(email).collection("task").doc(id).update(value);
        this.showToast("Item updated!");
      });
    });


    // let task = { title: title, description: desc };
    // this.showToast("Item updated!");
    // return this.afs.collection("users").doc(email).collection("task").doc(id).update(task);
  }
}
