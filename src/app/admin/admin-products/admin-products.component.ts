import { ProductService } from "./../../product.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Product } from "../../models/product";
import { DataTableResource } from "../../data-table/index";
@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscrition: Subscription;

  itemResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;
  limit = 6;

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.subscrition = this.productService.getAll().subscribe(prods => {
      this.products = prods.map(p => {
        const obj = JSON.parse(JSON.stringify(p));
        return {
          key: obj.key,
          title: obj.payload.title,
          price: obj.payload.price,
          category: obj.payload.category,
          imageUrl: obj.payload.iamgeUrl
        };
      });
      this.initializeTable(this.products);
    });
  }
  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }
  private initializeTable(products: Product[]) {
    this.itemResource = new DataTableResource(products);
    this.itemResource.query({ offset: 1 }).then(items => (this.items = items));
    this.itemResource.count().then(count => (this.itemCount = count));
    this.reloadItems({ offset: 0, limit: this.limit });
  }
  reloadItems(params) {
    if (!this.itemResource) {
      return;
    }
    this.itemResource.query(params).then(items => (this.items = items));
  }
  filter(query: string) {
    const filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
    console.log(filteredProducts.length);
    this.limit =
      filteredProducts.length < this.limit && filteredProducts.length !== 0
        ? filteredProducts.length
        : 6;
    this.initializeTable(filteredProducts);
  }
}
