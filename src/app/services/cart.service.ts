import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem.model';
import { Item } from 'src/app/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items:CartItem[] = [];

    get totalPrice(): number{
        let totalPrice = 0;
        this.items.forEach(item => {
            totalPrice += item.price;
        });

        return totalPrice;
    }

  async getItemQuantity(item: Item, id : string): Promise<number> {
    let cartItem = this.items.find(value => value.id === id);

    if(cartItem){
      console.log(cartItem.quantity);
      return cartItem.quantity;
    }
    else{
      return 0;
    }
  }
  
  increaseCart(item: Item, id : string):void{
    let cartItem = this.items.find(value => value.id === id);
    if(!cartItem){
      cartItem = new CartItem(item, id);
      this.items.push(cartItem);
    }
    cartItem.quantity++;

    console.log(this.items);
  }

  removeFromCart(item : Item, id : string): void{
    let cartItem = this.items.find(value => value.id === id);
    if(!cartItem) return;
    if(cartItem.quantity > 1){
      cartItem.quantity--;
    } else {
      this.items.splice(this.items.indexOf(cartItem), 1);
    }
  }

  getCartItems():CartItem[]{
    return this.items;
  }

  emptyCart(): void{
    this.items = [];
  }
}
