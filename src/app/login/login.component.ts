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
export class LoginComponent {
  state = "default";
  loginForm = new FormGroup({
    username: new FormControl("")
  });

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    setInterval(() => {
      this.rotate();
    }, 3000);
  }

  rotate() {
    this.state = this.state === "default" ? "rotated" : "default";
  }

  isConnectedToGame(player) {
    return player.in_game || player.is_host;
  }

  navigateToJoinGame(gameID: string) {
    this.router.navigateByUrl(`/game/${gameID}`);
  }

  onLoginClick() {
    const { username } = this.loginForm.value;
    this.authService.authenticate(username).subscribe(
      (resp: any) => {
        localStorage.setItem("token", resp.token);

        this.authService.whoami().subscribe(
          me => {
            if (this.isConnectedToGame(me)) {
              this.navigateToJoinGame(me.game_id);
              return;
            }

            this.router.navigateByUrl("/dashboard");
          },
          err => {
            console.log(err);
          }
        );
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
