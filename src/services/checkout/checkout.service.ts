import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../../common/purchase/purchase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  //Properties
  private purchaseUrl = "http://localhost:8080/api/checkout/purchase"


  constructor(private httpClient: HttpClient) { }

  //Custom Methods
  placeOrder(purchase: Purchase): Observable<any>{

    //passing the purchase to the specified url
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);

  }


}
