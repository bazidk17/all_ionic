import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public afAuth: AngularFireAuth, public route: Router, public toastController: ToastController) { }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000
    });
    toast.present();
  }

  async register(email, password) {
    try {
      const res = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log("regsitered");
      this.showToast('Account has been created!');
      this.route.navigate(["/login"]);
    }
    catch (err) {
      console.dir(err);
    }
  }

  async login(email, password) {
    try {
      const res = await this.afAuth.signInWithEmailAndPassword(email, password)
      console.log("successful login");
      this.showToast('Welcome, Have a nice day!');
      this.route.navigate(["/welcome"]);
    }
    catch (err) {
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        console.log("User not found");
        this.showToast('This email is not registered.');
      }
    }
  }

  logout() {
    if (this.afAuth.currentUser) {
      this.afAuth.signOut()
        .then(() => {
          console.log("LOG Out");
          this.showToast('See you again');
          this.route.navigate(["/login"]);
        }).catch((error) => {
          console.log(error);
        });
    }
  }

}
