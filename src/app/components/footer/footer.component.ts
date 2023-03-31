// Import
import { Component } from '@angular/core';

// Component Imports
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

// Footer Component Class Export
export class FooterComponent{

  constructor() { }

  // The current year
  year : Number = new Date().getFullYear();
}
