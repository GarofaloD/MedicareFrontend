import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {CartService} from "../../services/cart/cart.service";
import {CheckoutService} from "../../services/checkout/checkout.service";

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


  constructor(private formBuilder: FormBuilder, private cartService: CartService, private checkoutService: CheckoutService) {
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
      shippingAddress: this.formBuilder.group({
        address1: [''],
        address2: [''],
        city: [''],
        state: [''],
        zipcode: [''],
      }),
      //second form in the group: payment
      payment: this.formBuilder.group({
        creditCardNumber: [''],
        creditCardExpirationDate: [''],
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

  }

  onSubmit(){
    console.log("Handling the submit button")
    console.log(this.checkoutFormGroup.get('customer')?.value);

    //set up order
    let order = new Order()
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //get cart items
    const cartItems = this.cartService.itemsInCart;

    //create order items
    //--short way: map the array of items in the cart and create a new order item for each of the elements in the cart
    let itemsInOrder : OrderItem[] = cartItems.map(tempItemInCart => new OrderItem(tempItemInCart) )

    //set up purchase
    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.order = order;
    purchase.orderItems = itemsInOrder;

    this.checkoutService.setMessage(purchase)
    console.log(purchase)

  }



}
