import {Customer} from "../customer/customer";
import {Address} from "../address/address";
import {Order} from "../order/order";
import {OrderItem} from "../order-item/order-item";

export class Purchase {

  customer! : Customer;
  address! : Address;
  systemOrder! : Order
  orderItems! : OrderItem[]


}
