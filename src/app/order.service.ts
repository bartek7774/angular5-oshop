import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { ShoppingCartService } from "./shopping-cart.service";
import "rxjs/add/operator/map";
import { Order } from "./models/order";
@Injectable()
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) {}

  getAll() {
    return this.db
      .list("/orders")
      .snapshotChanges()
      .map(orders => {
        return orders.map(p => {
          const obj = JSON.parse(JSON.stringify(p));
          return {
            key: obj.key,
            ...obj.payload
          };
        });
      });
  }

  async placeOrder(order) {
    const id = await this.db.list("/orders").push(order);
    this.shoppingCartService.clearCart();
    return id;
  }

  getOrderById(orderId: string) {
    return this.db.object("/orders/" + orderId).valueChanges<Order>();
  }

  getOrdersByUser(userId: string) {
    return this.db
      .list("/orders", ref => {
        return ref.orderByChild("userId").equalTo(userId);
      })
      .snapshotChanges()
      .map(orders => {
        return orders.map(p => {
          const obj = JSON.parse(JSON.stringify(p));
          return {
            key: obj.key,
            ...obj.payload
          };
        });
      });
  }
}
