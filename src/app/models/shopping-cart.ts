import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem } = {}) {
    for (const productId in itemsMap) {
      if (itemsMap.hasOwnProperty(productId)) {
        const item = itemsMap[productId];
        this.items.push(new ShoppingCartItem(item.product, item.quantity));
      }
    }
  }
  getQuantity(product: Product) {
    const item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
  get totalPrice() {
    return this.items.reduce((sum, item) => {
      sum += item.totalPrice;
      return sum;
    }, 0);
  }
  get totalItemsCount() {
    let count = 0;
    for (const item in this.itemsMap) {
      if (this.itemsMap.hasOwnProperty(item)) {
        count += this.itemsMap[item].quantity;
      }
    }
    return count;
  }
}
