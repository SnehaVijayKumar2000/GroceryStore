import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private auth : AuthService) { }

  loading : boolean = false;
  error : boolean = false;
  code : boolean = false;

  emailChangeRequest(submit : NgForm){

    this.loading = true;
    this.auth.firebaseAuth.sendPasswordResetEmail(submit.value['email'])
      .then(() => {
        this.loading = false;
        this.code = true;
      }).catch(() => {
        this.loading = false;
        this.error = true;
      })
  }


}
