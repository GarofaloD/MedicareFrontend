import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProductService} from "../services/product/product.service";
import {HttpClientModule} from "@angular/common/http";
import {ProductListComponent} from "../components/product-list/product-list.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
