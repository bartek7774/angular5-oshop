import { Component } from "@angular/core";
import { AuthService } from "../auth.service";
import { AppUser } from "../models/app-user";
import { OnInit } from "@angular/core";
import { ShoppingCartService } from "../shopping-cart.service";
import { ShoppingCartItem } from "../models/shopping-cart-item";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "../models/shopping-cart";
@Component({
  selector: "app-navbar",
  templateUrl: "./bs-navbar.component.html",
  styleUrls: ["./bs-navbar.component.css"]
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.authService.appUser$.subscribe(appUser => (this.appUser = appUser));
    this.cart$ = await this.shoppingCartService.getCart();
  }
  logout() {
    this.authService.logout();
  }
}
