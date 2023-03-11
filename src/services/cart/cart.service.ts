import { Injectable } from '@angular/core';
import {CartItem} from "../../common/cart-item/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {


  itemsInCart: CartItem[] = []; //this is the shopping cart
  totalPrice: Subject<number> = new BehaviorSubject<number>(0)
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0)



  constructor() { }


  //ADDING PRODUCTS TO CART
  addToCart(cartItem: CartItem){
    //check if we already have the item in the cart
    let alreadyInCart: boolean = false
    // @ts-ignore
    let existingCartItem: CartItem = undefined; //undefined because we do not know if it exists

    //If there are items in the array...
    if(this.itemsInCart.length > 0){
      //find the item in the cart based on it


      for(let tempCartItem of this.itemsInCart) {
        //if the id of the item int the array is equals to what we are passing...
        if(tempCartItem.id === cartItem.id){
          existingCartItem = tempCartItem;
          break;
        }
      }

      //check if we found it > will change to true if existingCartItem stops being undefined
      alreadyInCart = (existingCartItem != undefined);
    }

    //if already in cart...
    if(alreadyInCart){
      //just increase the quantity of the item
      existingCartItem.quantity++;
    } else {
      //add the item to the array
      this.itemsInCart.push(cartItem)
    }

    //ONCE DONE, GIVE ME CART TOTALS
    this.calculateCartTotals();
  }

  public calculateCartTotals() {
    let totalPriceValue : number = 0;
    let totalQuantityValue: number = 0;

    for(let currentItemInCart of this.itemsInCart){
      totalPriceValue += currentItemInCart.quantity * currentItemInCart.unitPrice;
      totalQuantityValue += currentItemInCart.quantity;
    }

    //publish new values > next() will publish the event
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue)
    this.logCartData(totalPriceValue, totalQuantityValue);

  }


  private logCartData(totalPriceValue: number, totalQuantityValue: number) {

    for(let tempItemInCart of this.itemsInCart){
      const subTotalPrice = tempItemInCart.quantity * tempItemInCart.unitPrice
      console.log(`Item: ${tempItemInCart.name}, quantity: ${tempItemInCart.quantity}, unitPrice: ${tempItemInCart.unitPrice}, subTotalPrice: ${subTotalPrice}`)
    }

    console.log(`totalPrice : ${totalPriceValue}, totalQuantity: ${totalQuantityValue}`)
    console.log(`--------`)
  }










  removeFromCart(cartItem: CartItem){
    //reduce amount of this specific item
    cartItem.quantity--;

    if(cartItem.quantity == 0){
      this.delete(cartItem);
    } else {
      this.calculateCartTotals();
    }
  }


  //REMOVE FROM CART - AUX METHOD
  delete(cartItem: CartItem) {

    //find the item in the current cart
    const itemIndex = this.itemsInCart.findIndex( item => item.id === cartItem.id)

    //if the index is valid
    if(itemIndex > -1){
      //locate the item in the array and delete...
      this.itemsInCart.splice(itemIndex, 1)
      //once deleted, recalculate totals
      this.calculateCartTotals()
    }
  }




}
