import {Component, Inject, OnInit} from '@angular/core';
import {OKTA_AUTH, OktaAuthStateService} from "@okta/okta-angular";
import OktaAuth from "@okta/okta-auth-js";

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{

  //PROPERTIES
  isAuthenticated: boolean = false;
  userFullName: string = '';


  //browser storage
  storage: Storage = sessionStorage;


  //CONSTRUCTOR
  constructor(private oktaAuthService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
  }

  ngOnInit(): void {

    //get details from the okta service
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
      }
    )


  }


  //AUX METHODS
  getUserDetails() {
    if(this.isAuthenticated){
      //get user details

      this.oktaAuth.getUser().then(
        (res) =>{
          this.userFullName = res.name as string;

        //get user details from response and save in browser storage
          let userEmail = res.email;
          this.storage.setItem('userEmail', JSON.stringify(userEmail))



        }
      )
    }
  }

  logout(){
    //close all previous sessions and associated data
    this.oktaAuth.signOut();
  }



}
