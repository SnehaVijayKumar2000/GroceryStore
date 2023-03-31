import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(
    private afs : AngularFirestore,
    private router : Router,
    private route : ActivatedRoute,
    private itemService : ItemsService) { }

    item : Item = {} as Item;

  ngOnInit(): void {

    if(this.route.snapshot.url[0] == null){
      this.router.navigate(['404']);
    }
    this.itemService.getItem(this.route.snapshot.url[0].toString()).then(item => {
      if(item != null) {
        this.item = item;
       }
    });
  }
}
