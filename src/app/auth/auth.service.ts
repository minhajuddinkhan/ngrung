import { Injectable } from "@angular/core";

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "../login/login.service";
import { map, catchError } from "rxjs/operators";
import { Me } from "src/models/game";
import { of } from "rxjs";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  isConnectedToGame(me: Me) {
    return !!me.game_id;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.whoami().pipe(
      catchError(err => {
        if (err.status === 401) {
          this.router.navigateByUrl("/login");
          return of([]);
        }
      }),
      map((me: Me) => {
        if (this.isConnectedToGame(me)) {
          this.router.navigateByUrl(`/game/${me.game_id}`);
          return false;
        }
        return true;
      })
    );
  }
}
