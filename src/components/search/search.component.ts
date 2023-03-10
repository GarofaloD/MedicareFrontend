import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  //searching method called by search button
  doSearch(searchValue: string){
    console.log(`value = ${searchValue}`)
    //route the data to the search route
    this.router.navigateByUrl(`/search/${searchValue}`)
  }


}
