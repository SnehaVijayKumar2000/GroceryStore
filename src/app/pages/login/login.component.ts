import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public authService: AuthService, private router : Router) { } 

  isLoading = false;
  isError = false;
  hide = true;

  onSubmit(login: NgForm){
    this.isLoading = true;
    this.authService.loginUserWithPassword(login.value['email'], login.value['password']).then(res => {
      if(res){
        this.isLoading = false;

        if(this.authService.isUserEmailVerified){
          this.router.navigate(['']);
        }
        else {
          this.router.navigate(['verify-email']);
        }
        
      }
      else{
        this.isError = true;
        this.isLoading = false;
        login.reset();
      }
    });
  }
}
