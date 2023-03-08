import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product/product";

@Component({
  selector: 'app-product-list',
  templateUrl: '/product-list.component.html',
  styleUrls: ['/product-list.component.css']
})
export class ProductListComponent implements OnInit{

  //PROPERTIES
  products : Product[] = []
  currentCategoryId: number = 1;

  //CONTRUCTOR
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

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


   //First, check if 'id' parameter is available
   //paramMap returns true or false
   const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id')

   if(hasCategoryId){
     //get the id from param string
     this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!
   }
   else {
     //not available
     this.currentCategoryId = 1;
   }


    //subscription to the Product service
    this.productService.getAllProducts(this.currentCategoryId).subscribe(
      data => { //parse the response
        this.products = data;
        console.log(data)
      }
    )

  }


  addToCart(product: Product) {

  }
}
