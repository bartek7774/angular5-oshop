import { AuthService } from "./auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: ISubscription;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        const returnUrl = localStorage.getItem("returnUrl") || "/";
        this.router.navigateByUrl(returnUrl);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
