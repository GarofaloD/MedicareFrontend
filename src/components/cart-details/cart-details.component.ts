import { Component } from '@angular/core';
import {CartItem} from "../../common/cart-item/cart-item";
import {CartService} from "../../services/cart/cart.service";

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {


  cartItems: CartItem[] = [];
  totalPrice: number = 0
  totalQuantity: number = 0

  constructor(private cartService: CartService) {

  }

  ngOnInit():void{
    this.listCartDetails()
  }

  listCartDetails(){

    //get the cart items
    this.cartItems = this.cartService.itemsInCart;

    //get the total price from cart service
    this.cartService.totalPrice.subscribe(data =>{
      this.totalPrice = data
    })

    //get the total quantity from cart service
    this.cartService.totalQuantity.subscribe(data =>{
      this.totalQuantity = data
    })

    //calculate totals
    this.cartService.calculateCartTotals()

  }

  //For additional buttons
  increaseProductQuantity(cartItem: CartItem){
    this.cartService.addToCart(cartItem)
  }

  decreaseProductQuantity(cartItem: CartItem){
    this.cartService.removeFromCart(cartItem)
  }

  removeProductFromCart(cartItem: CartItem){
    this.cartService.delete(cartItem)
  }


}
