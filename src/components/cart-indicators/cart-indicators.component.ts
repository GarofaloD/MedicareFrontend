import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart/cart.service";

@Component({
  selector: 'app-cart-indicators',
  templateUrl: './cart-indicators.component.html',
  styleUrls: ['./cart-indicators.component.css']
})
export class CartIndicatorsComponent implements OnInit{

  totalPrice: number = 0.00
  totalQuantity : number = 0

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.updateCartStatus();
  }


  //update totals and count of items
  private updateCartStatus() {

    //get total price from the cart service
    this.cartService.totalPrice.subscribe(data=>{
      this.totalPrice = data
    })

    //get the total quantity from cart service
    this.cartService.totalQuantity.subscribe(data=>{
      this.totalQuantity = data
    })


  }


}
