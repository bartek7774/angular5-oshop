import { Component } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { AppUser } from "../../../shared/models/app-user";
import { OnInit } from "@angular/core";
import { ShoppingCartService } from "../../../shared/services/shopping-cart.service";
import { ShoppingCartItem } from "../../../shared/models/shopping-cart-item";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "../../../shared/models/shopping-cart";
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
