import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from 'src/app/models/transaction.model';
import { Address, User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private afs : AngularFirestore,
    private authService : AuthService,
    public snackBar : MatSnackBar) { }

  hide: boolean = true;
  isError: boolean = false;
  isLoading: boolean = false;

  transaction: Transaction[] = [];
  user : User = {
    address: {} as Address,
  } as User;

  ngOnInit(): void {

    this.getUserInfo().then(res => {
      this.user = res as User;
    });

    this.getTransactions().then(res => {
      this.transaction = res as Transaction[];
    });
  }

  infoSubmit(form: NgForm){

    const data = {
      fName: form.value['fName'],
      lName: form.value['lName'],
      address: {
        address_1: form.value['address'],
        city: form.value['city'],
        postalCode: form.value['postalCode'],
        province: form.value['province']
      }
    }

    console.log(data);

    this.isLoading = true;
    this.afs.collection('users').doc(this.authService.getUser().uid).update(data).then(res => {
      this.isError = false;
      this.isLoading = false;

      this.snackBar.open('Account Information Updated', 'Close', {
        duration: 2000,
      });

    }).catch(err => {
      this.isError = true;
      this.isLoading = false;
    });
  }


  async getTransactions() : Promise<Transaction[]> {

    let documents : Transaction[] = [];

    var user = this.authService.getUser();

    if(user){
      var userRef = this.afs.collection('users').doc(user.uid);
      var transactions = await userRef.collection('transactions').ref.get();
      transactions.forEach(doc => {
        documents.push(doc.data() as Transaction);
      });
    }
    return documents;
  }

  async getUserInfo() : Promise<User | undefined> {

    var user = this.authService.getUser();

    if(user){
      var userRef = this.afs.collection('users').doc(user.uid);
      var userInfo = await userRef.ref.get();
      return userInfo.data() as User;
    }
    return undefined;
  }

  public toDate(time: number) : string {
     return new Date(time).toLocaleDateString('en-GB',)+" "+new Date(time).toLocaleTimeString('en-GB', )
    
  }
}
