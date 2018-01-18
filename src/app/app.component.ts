import { AuthService } from "./shared/services/auth.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core";
import { ISubscription } from "rxjs/Subscription";
import { UserService } from "./shared/services/user.service";

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
      if (!user) {
        return;
      }
      this.userService.save(user);
      const returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) {
        return;
      }
      localStorage.removeItem("returnUrl");
      this.router.navigateByUrl(returnUrl);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
