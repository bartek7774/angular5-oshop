import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import "rxjs/add/operator/map";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.map(user => {
      if (user) {
        return true;
      }
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    });
  }
}
