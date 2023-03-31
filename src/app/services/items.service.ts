import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {


  constructor(
    private afs : AngularFirestore,
    private router : Router) { }

  public async getItem(id : string) : Promise<Item | null> {

    const data = JSON.parse(localStorage.getItem('items') || '{}');
    let item : Item = data[id]

    if(item == null){
      this.updateDB()
        .then(res => {
          const data = JSON.parse(localStorage.getItem('items') || '{}');
          item = data[id]

          /*
          if(item == null) {
            this.router.navigate(['404']);
          }*/
        })
    }
    return item;
  }

  public async updateDB() : Promise<boolean> {

    let documents : { [key: string]: any } = {}

    await this.afs.collection<Item>('items').ref.get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          documents[doc.id] = doc.data();
        })
    });
    localStorage.setItem('items', JSON.stringify(documents));
    return true;
  }

  async getAllItems() : Promise<Item[]> {
    const data = JSON.parse(localStorage.getItem('items') || '{}');

    let items : Item[] = []

    for(var i in data){

      const item = {
        id: i,
        name: data[i].name,
        price: data[i].price,
        discription: data[i].discription,
        photo_ref: data[i].photo_ref,
        tags: data[i].tags
      }
      items.push(item)
    }
    return items;
  }
}