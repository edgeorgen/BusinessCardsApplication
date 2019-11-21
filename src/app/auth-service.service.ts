import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  user: User;
  signedIn: string;

  constructor(public afAuth: AngularFireAuth,
              public router: Router
              ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        const myid = this.user.uid;
        localStorage.setItem('uid', JSON.stringify(myid));
      } else {
        localStorage.setItem('user', null);
      }
    });

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('uid');
    this.router.navigate(['sign-in']);
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['webcam']);
    } catch (error) {
      window.alert(error.message);
    }
  }

  async createUser(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log(result.user);
    } catch (error) {
      window.alert(error.message);
    }
  }

  logTest() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      return false;
    } else {
      return true;
    }

  }



}
