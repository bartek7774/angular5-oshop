import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../../shared/services/category.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ProductService } from "../../../shared/services/product.service";
import "rxjs/add/operator/take";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product = {};
  id;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getAll();
  }
  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id) {
      this.productService
        .get(this.id)
        .take(1)
        .subscribe(p => (this.product = p));
    }
  }
  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(["/admin/products"]);
  }
  delete() {
    if (!confirm("Are you sure?")) {
      return;
    }
    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }
}
