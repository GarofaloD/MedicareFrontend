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

  //CONTRUCTOR
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit():void{
    //this.handleSearchProducts()
    this.listAllProducts();

    // this.route.paramMap.subscribe(() =>{
    //   this.listProductsByCategory()
    // })

  }


  //CUSTOM METHODS
  //List all the products
 public listAllProducts(){
    //subscription to the Product service
    this.productService.getAllProducts().subscribe(
      data => { //parse the response
        this.products = data;
        console.log(data)
      }
    )
  }

  addToCart(product: Product) {

  }
}
