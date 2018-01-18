import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrderService } from "../../../shared/services/order.service";
import { Observable } from "rxjs/Observable";
import { Order } from "../../../shared/models/order";

@Component({
  selector: "app-order-details",
  templateUrl: "./order-details.component.html",
  styleUrls: ["./order-details.component.css"]
})
export class OrderDetailsComponent implements OnInit {
  order$: Observable<Order>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}
  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id) {
      this.order$ = this.orderService.getOrderById(id);
    }
  }
}
