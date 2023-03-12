import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CartService} from "../../services/cart/cart.service";
import {CheckoutService} from "../../services/checkout/checkout.service";
import {Router} from "@angular/router";
import {Order} from "../../common/order/order";
import {OrderItem} from "../../common/order-item/order-item";
import {Purchase} from "../../common/purchase/purchase";
import {Customer} from "../../common/customer/customer";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  // @ts-ignore
  checkoutFormGroup: FormGroup;
  totalPrice: number = 0
  totalQuantity: number = 0


  constructor(private formBuilder: FormBuilder, private cartService: CartService, private checkoutService: CheckoutService, private router: Router) {
  }

  ngOnInit():void{


    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      //first form in the group: customer
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      //second form in the group: payment
      address: this.formBuilder.group({
        address1: [''],
        address2: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      //second form in the group: payment
      payment: this.formBuilder.group({
        creditCardNumber: [''],
        nameOnCreditCard:[''],
        creditCardExpirationMonth: [''],
        creditCardExpirationYear: [''],
        creditCardSecurityCode: [''],
        creditCardZipCode: [''],
      })
    })




  }



  //get the data from the totals for the current cart
  private reviewCartDetails() {

    //get the total price
    this.cartService.totalPrice.subscribe(data =>{
      this.totalPrice = data

    })

    //get the total quantity
    this.cartService.totalQuantity.subscribe(data =>{
      this.totalQuantity = data
    })

    console.log(this.totalPrice)
    console.log(this.totalQuantity)

  }

  //submit the order
  onSubmit(){
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get('customer')?.value);

    //create purchase
    let purchase = new Purchase();

    //assemble purchase: customer & address
    purchase.customer = this.checkoutFormGroup.controls['customer'].value
    purchase.address = this.checkoutFormGroup.controls['address'].value;


    //create order
    let order = new Order()
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //get cart items from service and add them to the inner container
    let cartItems = this.cartService.itemsInCart;
    let itemsInOrder : OrderItem[] = cartItems.map(tempItemInCart => new OrderItem(tempItemInCart) )

    //assemble purchase: order & order items
    purchase.systemOrder = order;
    purchase.orderItems = itemsInOrder


    //submit the purchase to the backend
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response =>{
        alert(`Your order has been placed. Your tracking number: ${response.orderTracker}`)
        //clearing cart
        this.clearUserCart();
      },
      error:  error =>{
        alert(`There was a problem with your purchase: ${error.message}`)
      }
    })
    console.log(purchase)

  }


  private clearUserCart() {
    this.cartService.itemsInCart = [];
    this.cartService.totalQuantity.next( 0);
    this.cartService.totalPrice.next( 0);

    this.checkoutFormGroup.reset();

    this.router.navigateByUrl("/products")

  }




}
