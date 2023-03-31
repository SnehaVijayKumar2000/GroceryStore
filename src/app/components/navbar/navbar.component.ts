// Import
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

// Navbar import
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private auth : AuthService) { }

  // Helper function to determine if the user is logged in.
  isAuthenticated() {
    return this.auth.isUserLoggedIn;
  }

  // Helper function to log the user out
  onLogoutClick(){
    this.auth.logoutUser();
  }
}
