import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product/product";
import {CartService} from "../../services/cart/cart.service";
import {CartItem} from "../../common/cart-item/cart-item";

@Component({
  selector: 'app-product-list',
  templateUrl: '/product-list.component.html',
  styleUrls: ['/product-list.component.css']
})
export class ProductListComponent implements OnInit{

    //PROPERTIES
    products : Product[] = []
    currentCategoryId: number = 1;
    currentCategoryName: string = ""
    searchEnabled: Boolean = false;

  //CONTRUCTOR
    constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

    ngOnInit():void{
      //this.handleSearchProducts()
      // this.listAllProducts();

      this.route.paramMap.subscribe(() =>{
        this.listAllProducts()
      })

    }


  //CUSTOM METHODS
  //List all the products
   public listAllProducts(){

      //checks if there is a keyword being passed > comes from the route configuration
      this.searchEnabled = this.route.snapshot.paramMap.has('keyword')
     console.log(`is searcheEnabled = ${this.searchEnabled}`)

     if(this.searchEnabled){
       this.handleSearchByKeyword();
     } else{
       this.handleListProducts();
     }



  }


  //Main listing of products
  handleListProducts(){
    //First, check if 'id' parameter is available
    //paramMap returns true or false
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

    //if a category is selected from the side menu
    if(hasCategoryId){
      //get the id from param string
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!
      console.log(`This is the current category id= ${this.currentCategoryId}`)

      // //get the name from the param string
      // this.currentCategoryId = +this.route.snapshot.paramMap.get('name')!
      // console.log(`This is the current category name= ${this.currentCategoryName}`)
    }
    else { //otherwise, take me to the basic path
      //not available
      this.currentCategoryId = 1;
      // this.currentCategoryName = 'Beauty';
    }


    //subscription to the Product service
    this.productService.getAllProducts(this.currentCategoryId).subscribe(
      data => { //parse the response
        this.products = data;
        console.log(data)
      }
    )
  }


  //SEARCH BY KEYWORD
  handleSearchByKeyword(){
    const searchKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log(`keyword into handleSearchByKeyword = ${searchKeyword}`)

    //search for the products using the keyword
    this.productService.searchProducts(searchKeyword).subscribe(data=>{
      this.products = data;
      console.log(`receiving data from service searching by keyword = ${this.products}`)
    })
  }



  addToCart(product: Product) {
    console.log(`Product name: ${product.name}, Product price: ${product.unitPrice}`)

    //create a cart item
    const cartItem = new CartItem(product);
    //Call the service and add an item to the cart
    this.cartService.addToCart(cartItem);

  }
}
