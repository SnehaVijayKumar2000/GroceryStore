import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userState : any;
  private success : boolean = false;

  constructor(
    public firebaseAuth : AngularFireAuth,
    private afs : AngularFirestore,
    public router : Router) {
      this.firebaseAuth.authState.subscribe(user => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
        } else {
          localStorage.setItem('user', JSON.stringify(null));
        }
      }) 
    }

  async createUserWithPassword(email: string, password: string, user : User) : Promise<boolean>{ 

    var success = false;

    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {

        if(res.user != null){
          this.updateUserData(res.user.uid, user)
          this.sendVerificationEmail()
          success = true;
        }
        else{
          success = false;
        }
        
      })
      .catch(err => {
        success = false;
      });

      return success;
  }

  sendVerificationEmail() {
    if(!this.isUserEmailVerified) {
      this.firebaseAuth.currentUser
        .then(user => {
          user?.sendEmailVerification();
      })
    }
  }

  async loginUserWithPassword(email: string, password: string) : Promise<boolean> {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(() =>{
        this.success = true;
      })
      .catch(err => {
        this.success = false;
      });
      return this.success;
  }

  logoutUser(){
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }

  get isUserLoggedIn() : boolean {
    return JSON.parse(localStorage.getItem('user') ?? "null") != null;
  }

  get isUserEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? "null");

    if(user != null)
      return user.emailVerified;
    else
      return false;
  }

  private async updateUserData(uid : string, user : User) : Promise<Boolean> {
    
    const data = {
      address : {
        address_1: user.address.address_1,
        city : user.address.city,
        province : user.address.province,
        postalCode : user.address.postalCode
      },
      fName : user.fName,
      lName : user.lName,
      email : user.email
    }

    console.log(uid, user);

    await this.afs.collection("users").doc(uid).set(data)
      .then(() => {
        console.log("User created.");
        return true;
      }).catch(err => {
        console.log(err);
        return false;
      })

    return false;
  }

  getUser() : User {
    const user = JSON.parse(localStorage.getItem('user') ?? "null");
    return user;
  }
}
