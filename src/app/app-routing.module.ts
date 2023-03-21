import {Injector, NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "../components/product-list/product-list.component";
import {ProductDetailsComponent} from "../components/product-details/product-details.component";
import {CartDetailsComponent} from "../components/cart-details/cart-details.component";
import {CheckoutComponent} from "../components/checkout/checkout.component";
//import {OktaCallbackComponent} from "@okta/okta-angular";
import {LoginComponent} from "../components/login/login.component";

//OKTA
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG, OktaAuthGuard
} from "@okta/okta-angular";

import {OktaAuth} from '@okta/okta-auth-js';
import appConfig from "../config/app-config";
import {MembersLandingPageComponent} from "../components/members-landing-page/members-landing-page.component";
import {OrderHistoryComponent} from "../components/order-history/order-history.component";

const oktaConfig = appConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

//redirect to login if not authenticated - Aux method
function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
  const router = injector.get(Router);
  router.navigate(['/login'])
}


const routes: Routes = [
  {path: 'order-history', component:OrderHistoryComponent, canActivate: [OktaAuthGuard], data:{onAuthRequired: sendToLoginPage}}, //if authenticated, we'll get to this page, otherwise it should take us to /login
  {path: 'members', component:MembersLandingPageComponent, canActivate: [OktaAuthGuard], data:{onAuthRequired: sendToLoginPage}}, //if authenticated, we'll get to this page, otherwise it should take us to /login

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
