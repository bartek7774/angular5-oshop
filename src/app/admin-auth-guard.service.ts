import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/switchMap";

@Injectable()
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
  canActivate(): Observable<boolean> {
    return this.authService.appUser$.map(appUser => appUser.isAdmin);
  }
}
