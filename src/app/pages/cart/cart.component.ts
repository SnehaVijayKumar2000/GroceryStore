import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  constructor(
    private cartService: CartService,
    private afs : AngularFirestore,
    private authService : AuthService,
    public snackBar : MatSnackBar) { }

  total = this.cartService.totalPrice;
  cartItems = this.cartService.getCartItems();
  isLoading : boolean = false;
  isError : boolean = false;
  isSuccess: boolean = false;

  displayedColumns = ['name', 'price', 'quantity', 'subtotal', 'remove'];

  ngOnInit(): void {

  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.item, cartItem.id);
    this.setCart();
  }

  addToCart(cartItem:CartItem){
    this.cartService.increaseCart(cartItem.item, cartItem.id);
    this.setCart();
  }

  checkout(form : NgForm){

    this.isLoading = true;

    const data = {
      address: {
        address_1: form.value.address,
        city: form.value.city,
        province: form.value.province,
        postalCode: form.value.postalCode
      }, 
      time: new Date().getTime(),
      cart: this.cartItems.map(item => {
        return {item:item.item, quantity:  item.quantity};
      }),
      total: this.total
    }
    
    this.isLoading = true;
    this.afs.collection('users').doc(this.authService.getUser().uid).collection('transactions').add(data).then(res => {
        this.isError = false;
        this.isLoading = false;
        this.isSuccess = true;
        this.cartService.emptyCart();
        this.snackBar.open('Transaction Submitted', 'Close', {
          duration: 2000,
        });
  
      }).catch(err => {
        this.isError = true;
        this.isLoading = false;
      });
  }
  setCart(){
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.totalPrice;
  }

}
