import { Component } from "@angular/core";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "../models/product";
import "rxjs/add/operator/switchMap";
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  constructor(
    private route: ActivatedRoute,
    productService: ProductService
  ) {
    productService
      .getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get("category");
        this.filteredProducts = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }
}
