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
  private baseUrl = 'http://localhost:8080/api/products'


  //CONSTRUCTOR
  constructor(private httpClient: HttpClient) { }

  //CUSTOM METHODS
  //GET ALL PRODUCTS
  public getAllProducts(productCategory: number): Observable<Product[]>{

    //url for category
    const searchUrl = `${this.baseUrl}search/findByCategoryId?id=${productCategory}`

    //Fetch the data
    //Now based on the modified search url
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
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
  _embedded:{
    products:Product[];
  }
}
