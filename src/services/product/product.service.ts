import { Injectable } from '@angular/core';
import {Product} from "../../common/product/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //PROPERTIES
  private baseUrl = 'https://localhost:8080/api/products'


  //CONSTRUCTOR
  constructor(private httpClient: HttpClient) { }

  //CUSTOM METHODS
  //GET ALL PRODUCTS
  public getMainProductList(): Observable<Product[]>{
    return this.httpClient.get<GetResponseProducts>(this.baseUrl).pipe(
      map(response => response.products)
    )
  }


  //GET INDIVIDUAL PRODUCT
  public getProduct(productId: number):Observable<Product>{ //returning only one product

    //url for individual products
    const prodURL = `${this.baseUrl}/${productId}`

    return this.httpClient.get<Product>(prodURL)
  }


}







//unwrap json from SpringData REST
interface GetResponseProducts{
  products:Product[];
}
