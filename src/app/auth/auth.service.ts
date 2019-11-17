import { Injectable } from "@angular/core";

import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { AuthService } from "../login/login.service";
import { map } from "rxjs/operators";
import { Me } from "src/models/game";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  isConnectedToGame(me: Me) {
    return !!me.game_id;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.auth.whoami().pipe(
      map((me: Me) => {
        console.log(me);
        if (this.isConnectedToGame(me)) {
          this.router.navigateByUrl(`/game/${me.game_id}`);
          return false;
        }
        return true;
      })
    );
  }
}
