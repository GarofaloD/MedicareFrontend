import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProductService} from "../services/product/product.service";
import {HttpClientModule} from "@angular/common/http";
import {ProductListComponent} from "../components/product-list/product-list.component";
import {
  ProductCategoryMenuComponent
} from "../components/product-category-menu/product-category-menu/product-category-menu.component";
import {SearchComponent} from "../components/search/search.component";
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {CartIndicatorsComponent} from "../components/cart-indicators/cart-indicators.component";
import {CartDetailsComponent} from "../components/cart-details/cart-details.component";
import {CheckoutComponent} from "../components/checkout/checkout.component";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from "../components/login/login.component";
import {LoginStatusComponent} from "../components/login-status/login-status.component";

//OKTA
import{
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from "@okta/okta-angular";

import {OktaAuth} from '@okta/okta-auth-js';
import appConfig from "../config/app-config";

const oktaConfig = appConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);




@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartIndicatorsComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService,{provide: OKTA_CONFIG, useValue: { oktaAuth }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
