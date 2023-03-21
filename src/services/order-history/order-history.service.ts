import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductCategory} from "../../common/product-category/product-category";
import {OrderHistory} from "../../common/order-history/order-history";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  //PROPERTIES
   private baseUrl_checkOrders = 'http://localhost:8080/api/systemOrders';

   //CONSTRUCTOR
  constructor(private httpClient: HttpClient) { }

  //CUSTOM METHODS


  //Get all the orders from the backend
  getOrderHistory(userEmail: string):Observable<GetResponseOrderHistory>{

    let orderHistoryURL = `${this.baseUrl_checkOrders}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${userEmail}`

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryURL)

  }

}

//Get everything from inside the JSON response (_embedded)
interface GetResponseOrderHistory{

  _embedded:{
    systemOrders:OrderHistory[];
  }
}
