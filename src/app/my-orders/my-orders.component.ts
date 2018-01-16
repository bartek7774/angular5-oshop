import { Component, OnInit } from "@angular/core";
import { OrderService } from "../order.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit {
  orders$;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.orders$ = this.authService.user$.switchMap(u =>
      this.orderService.getOrdersByUser(u.uid)
    );
  }
}
