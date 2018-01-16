import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireAuthModule, AngularFireAuth } from "angularfire2/auth";
import { FormsModule } from "@angular/forms";
import { DataTableModule } from './data-table';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from "./app.component";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./login/login.component";
import { environment } from "../environments/environment";
import { AuthService } from "./auth.service";
import { AuthGuardService } from "./auth-guard.service";
import { UserService } from "./user.service";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AdminAuthGuardService } from "./admin-auth-guard.service";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { CategoryService } from "./category.service";
import { ExtractPipe } from "./extract.pipe";
import { ProductService } from "./product.service";
import { CustomFormsModule } from "ng2-validation";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from "./shopping-cart.service";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from "./order.service";
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingFormComponent } from './shopping-form/shopping-form.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ExtractPipe,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShoppingFormComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "", component: ProductsComponent },
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      { path: "login", component: LoginComponent },

      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "order-details/:id",
        component: OrderDetailsComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "order-success/:id",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "my-orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: "admin/products/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      }
    ]),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
