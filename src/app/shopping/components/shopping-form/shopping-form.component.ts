import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { AuthService } from "../../../shared/services/auth.service";
import { Order } from "../../../shared/models/order";
import { OrderService } from "../../../shared/services/order.service";
import { ShoppingCart } from "../../../shared/models/shopping-cart";

@Component({
  selector: "shopping-form",
  templateUrl: "./shopping-form.component.html",
  styleUrls: ["./shopping-form.component.css"]
})
export class ShoppingFormComponent implements OnInit, OnDestroy {
  @Input("cart") cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      user => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async proceed() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(["/order-success", result.key]);
  }
}
