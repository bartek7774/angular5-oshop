import { ShoppingCartItem } from "./models/shopping-cart-item";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Product } from "./models/product";
import { Observable } from "rxjs/Observable";
import { ShoppingCart } from "./models/shopping-cart";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";

@Injectable()
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .map(
        (cart: {
          created: string;
          items: { [productId: string]: ShoppingCartItem };
        }) => {
          if (!cart) {
            return new ShoppingCart();
          }
          return new ShoppingCart(cart.items);
        }
        // (cart: {
        //   created: string;
        //   items: { [productId: string]: ShoppingCartItem };
        // }) => new ShoppingCart(cart.items)
      );
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object(`/shopping-carts/${cartId}/items`).remove();
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      created: new Date().getTime()
    });
  }
  private getItem(cartId: string, productId: string) {
    return this.db
      .object(`/shopping-carts/${cartId}/items/${productId}`)
      .snapshotChanges();
  }
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private getItemRef(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const refCart = this.getItemRef(cartId, product.key);

    const item$ = this.getItem(cartId, product.key);
    item$.take(1).subscribe(item => {
      const cartItem = JSON.parse(JSON.stringify(item.payload));
      const quantity = (cartItem ? (cartItem.quantity as number) : 0) + change;
      if (cartItem && quantity === 0) {
        refCart.remove();
      } else {
        refCart.update({ product: product, quantity });
      }
    });
  }
}
