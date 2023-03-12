import {CartItem} from "../cart-item/cart-item";

export class OrderItem {

  imageUrl: string;
  quantity: number;
  unitPrice: number;
  productId: number;


  //we'll build the order based on this
  constructor(cartItem: CartItem) {

    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.unitPrice;
    this.productId = cartItem.id;

  }

}
