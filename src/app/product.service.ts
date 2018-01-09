import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/take";
import "rxjs/add/operator/map";
import { Product } from "./models/product";

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }
  getAll() {
    return this.db
      .list("/products")
      .snapshotChanges()
      .map(prods => {
        return prods.map(p => {
          const obj = JSON.parse(JSON.stringify(p));
          return {
            key: obj.key,
            title: obj.payload.title,
            price: obj.payload.price,
            category: obj.payload.category,
            imageUrl: obj.payload.imageUrl
          };
        });
      });
  }
  get(productId) {
    return this.db.object("/products/" + productId).valueChanges();
  }
  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }
  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }
}
