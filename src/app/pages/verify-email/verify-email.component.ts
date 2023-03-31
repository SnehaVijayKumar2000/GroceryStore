import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {

  constructor(
    public auth : AuthService,
    public snackBar : MatSnackBar) { }

    

  sendVerificationEmail() {
    this.auth.sendVerificationEmail();
    let snackBarRef = this.snackBar.open('Verification Email Resent', 'Close');
  }

  get isVerified() : boolean {
    return this.auth.isUserEmailVerified;
  }
}
