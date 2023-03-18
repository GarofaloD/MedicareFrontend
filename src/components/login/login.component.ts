import {Component, Inject, OnInit} from '@angular/core';
//okta config
import appConfig from "../../config/app-config";
import {OKTA_AUTH} from "@okta/okta-angular";
import OktaAuth from "@okta/okta-auth-js";
import OktaSignIn from "@okta/okta-signin-widget";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //PROPERTIES
  oktaSignInData: any;


  //CONSTRUCTOR
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    //base widget config
    this.oktaSignInData = new OktaSignIn({
      logo:'src/favicon.ico',
      baseUrl: appConfig.oidc.issuer.split('/oauth2')[0],
      clientId: appConfig.oidc.clientId,
      redirectUri: appConfig.oidc.redirectUri,
      authParams:{
        //proof key
        pkce: true,
        issuer: appConfig.oidc.issuer,
        scopes: appConfig.oidc.scopes
      }
    })

  }

  ngOnInit(): void {
    //clear all previous info
    this.oktaSignInData.remove();
    //render widget
    this.oktaSignInData.renderEl({
      //render component with this id, as configured on login.component.html
      el: '#okta-sign-in-widget'
    },
      (response: any) =>{
        if(response.status === 'SUCCESS'){
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) =>{
        throw error;
      }
    );
  }


}
