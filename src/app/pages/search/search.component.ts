import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private router : Router,
    private itemService : ItemsService) { }

  allItems : Item[] = [];
  displayItems : Item[] = [];

  ngOnInit(): void {
    this.itemService.getAllItems().then(items => {
      this.allItems = items;
      this.displayItems = items;
    });
  }

  search(query : string):void{
    console.log(query);
    this.displayItems = this.allItems.filter(item => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
  }
}
  

