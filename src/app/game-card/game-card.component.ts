import { Component, OnInit, Input } from "@angular/core";
import { GameCardService } from "./game-card.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Game } from "src/models/game";
import { Router } from "@angular/router";

@Component({
  selector: "app-game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"]
})
export class GameCardComponent implements OnInit {
  constructor(
    private gameCardService: GameCardService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  @Input() game: Game;

  color = "warn";
  mode = "determinate";
  spinnerMode = "indeterminate";
  value = 50;
  bufferValue = 75;
  joinRequest: string;
  showLoader = false;

  ngOnInit() {}

  toggleSpin(gameID: string) {
    this.joinRequest = this.joinRequest ? null : gameID;
    this.showLoader = !this.showLoader;
  }

  joinGame(gameID: string) {
    if (this.showLoader) {
      return;
    }

    this.toggleSpin(gameID);

    this.gameCardService.joinGame(gameID).subscribe(
      resp => {
        console.log(resp);
        this.toggleSpin("");
        this.router.navigateByUrl(`/game/${gameID}`);
      },
      err => {
        this.snackBar.open(err.error && err.error.message, "", {
          duration: 2 * 1000
        });
        setTimeout(() => this.toggleSpin(""), 1.0 * 1000);
      }
    );
  }
}
