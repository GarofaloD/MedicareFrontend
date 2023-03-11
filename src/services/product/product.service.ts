import { Injectable } from '@angular/core';
import {Product} from "../../common/product/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {ProductCategory} from "../../common/product-category/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //PROPERTIES
  private baseUrl = 'http://localhost:8080/api/products'
  //Categories
  private categoriesUrl = 'http://localhost:8080/api/product-category'

  //CONSTRUCTOR
  constructor(private httpClient: HttpClient) { }

    //CUSTOM METHODS
    //GET ALL PRODUCTS
    public getAllProducts(productCategory: number): Observable<Product[]>{

      //url for category
      const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${productCategory}`

      //Fetch the data
      //Now based on the modified search url
      return this.getProductsFromBackend(searchUrl);

    }


    //GET INDIVIDUAL PRODUCT
    public getSingleProduct(productId: number):Observable<Product>{ //returning only one product

      //url for individual products
      const prodURL = `${this.baseUrl}/${productId}`

      return this.httpClient.get<Product>(prodURL)

    }


  //GET CATEGORIES AND DATA ASSOCIATED
  public getProductCategories(): Observable<ProductCategory[]>{

    //Fetch the categories
    return this.httpClient.get<GetResponseProductCategory>(this.categoriesUrl).pipe(
      map(response => response._embedded.productCategory)
    )

  }

  //SEARCH FOR PRODUCTS BY KEYWORD
  public searchProducts(searchKeyword: string): Observable<Product[]>{
    //url based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchKeyword}`
    console.log(`search with keyword url being passed to the rest-api = ${searchUrl} `)
    return this.getProductsFromBackend(searchUrl);
  }


  //BASE AUX METHOD
  private getProductsFromBackend(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }


}







//unwrap json using data rest (embedded) - Product
interface GetResponseProducts{
  _embedded:{
    products:Product[];
  }
}

//unwrap json using data rest (embedded) - Category
interface GetResponseProductCategory{

  _embedded:{
    productCategory:ProductCategory[];
  }
}
