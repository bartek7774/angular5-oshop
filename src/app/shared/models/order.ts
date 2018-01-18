import { ShoppingCart } from "./shopping-cart";

export class Order {
  dataPlaced: number;
  items: any[];
  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    this.dataPlaced = new Date().getTime();
    this.items = shoppingCart.items.map(item => {
      return {
        product: {
          title: item.product.title,
          imageUrl: item.product.price,
          price: item.product.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }
}
