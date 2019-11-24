import { Component, OnInit, Input } from "@angular/core";
import { GameCardService } from "./game-card.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Game } from "src/models/game";
import { Router } from "@angular/router";
import { Socket } from "ngx-socket-io";
@Component({
  selector: "app-game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"]
})
export class GameCardComponent implements OnInit {
  constructor(
    private gameCardService: GameCardService,
    private snackBar: MatSnackBar,
    private router: Router,
    private socket: Socket
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
        this.socket.emit("join", { game_id: +gameID });

        this.socket.on("join:done", () => {
          this.toggleSpin("");
          this.router.navigateByUrl(`/game/${gameID}`);
        });

        this.socket.on("join:error", err => {
          throw Error(err);
        });
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
