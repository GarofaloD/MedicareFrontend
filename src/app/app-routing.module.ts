import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "../components/product-list/product-list.component";
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {CartDetailsComponent} from "../components/cart-details/cart-details.component";
import {CheckoutComponent} from "../components/checkout/checkout.component";
//import {OktaCallbackComponent} from "@okta/okta-angular";
import {LoginComponent} from "../components/login/login.component";

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




const routes: Routes = [
  {path: 'login/callback', component:OktaCallbackComponent}, //once auth, user will be redirected here
  {path: 'login', component:LoginComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path: 'cart-details', component:CartDetailsComponent},
  {path: 'products/:id', component:ProductDetailsComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'search/:keyword', component:ProductListComponent},
 // {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
