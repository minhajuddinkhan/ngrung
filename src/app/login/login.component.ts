import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "./login.service";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { SocketsService } from "../sockets/sockets.service";

@Component({
  selector: "app-login",
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger("rotatedState", [
      state("default", style({ transform: "rotate(0)" })),
      state("rotated", style({ transform: "rotate(-360deg)" })),
      // transition("rotated => default", animate("1000ms ease-out"))
      transition("default => rotated", animate("1000ms ease-in"))
    ])
  ],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  state = "default";
  loginForm = new FormGroup({
    username: new FormControl("")
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private socketService: SocketsService
  ) {
    setInterval(() => {
      this.rotate();
    }, 3000);
  }

  ngOnInit() {
    this.socketService.onAuthenticate().subscribe(() => {
      this.navigateFromLogin();
    });
  }

  rotate() {
    this.state = this.state === "default" ? "rotated" : "default";
  }

  isConnectedToGame(player) {
    return player.in_game || player.is_host;
  }

  gotoTable(gameID: string) {
    this.router.navigateByUrl(`/game`);
  }
  gotoDashboard() {
    this.router.navigateByUrl("/dashboard");
  }

  navigateFromLogin() {
    // SHOULD SEND PLAYER INFORMATION ALONG WITH TOKEN.
    // SO THAT ANOTHER API CALL CAN BE AVOIDED.

    this.authService.whoami().subscribe(
      me => {
        this.isConnectedToGame(me)
          ? this.gotoTable(me.game_id)
          : this.gotoDashboard();
      },
      err => {
        console.log(err);
      }
    );
  }

  onLoginClick() {
    const { username } = this.loginForm.value;
    this.authService.authenticate(username).subscribe(
      (resp: any) => {
        this.authService.setToken(resp.token);
        this.socketService.authenticate();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.snackBar.open(
            "Sorry, Invalid credentials buddy.",
            "Can't Login",
            {
              duration: 3 * 1000
            }
          );
          return;
        }

        this.snackBar.open("something went wrong.", "oops", {
          duration: 3 * 1000
        });
      }
    );
  }
}
