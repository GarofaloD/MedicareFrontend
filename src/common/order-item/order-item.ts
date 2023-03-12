import {CartItem} from "../cart-item/cart-item";

export class OrderItem {

  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: number;
  name: string

  //we'll build the order based on this
  constructor(cartItem: CartItem) {

    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
    this.name = cartItem.name;

  }


}
