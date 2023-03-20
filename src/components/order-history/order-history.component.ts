import {Component, OnInit} from '@angular/core';
import {OrderHistory} from "../../common/order-history/order-history";
import {OrderHistoryService} from "../../services/order-history/order-history.service";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{


  //PROPERTIES
  orderHistoryList : OrderHistory[] =[];

  //Browser history
  storage: Storage = sessionStorage;



  constructor(private orderHistoryService: OrderHistoryService) {
  }

  ngOnInit(): void {
    this.handleOrderHistory()
  }


  //CUSTOM METHODS
  handleOrderHistory(){

    //get the email from the storage - userEmail is the key in the key|value pair in storage
    let storedUserEmail = JSON.parse(this.storage.getItem('userEmail')!);

    this.orderHistoryService.getOrderHistory(storedUserEmail).subscribe(data=> {
        this.orderHistoryList = data._embedded.systemOrders
      }
    )


  }


}
