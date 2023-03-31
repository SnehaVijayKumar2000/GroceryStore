import { CartItem } from "./cartItem.model";
import { Item } from "./item.model";
import { Address } from "./user.model";

export interface Transaction {
    address : Address,
    time : number,
    cart: CartItem[]
    total: number
}
