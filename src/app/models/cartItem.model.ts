import { Item  } from "./item.model";

export class CartItem{
    constructor(item : Item, id : string){
      this.item = item;  
      this.id = id;
    }
    item:Item;
    quantity:number = 0;
    id: string;

    get price():number{
        return this.item.price * this.quantity;
    }
}