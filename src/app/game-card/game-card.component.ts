import { Component, OnInit, Input } from "@angular/core";
import { GameCardService } from "./game-card.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Game } from "src/models/game";
import { Router } from "@angular/router";
import { SocketsService } from "../sockets/sockets.service";
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
    private socketService: SocketsService
  ) {}

  @Input() game: Game;

  color = "warn";
  mode = "determinate";
  spinnerMode = "indeterminate";
  value = 50;
  bufferValue = 75;
  joinRequest: string;
  showLoader = false;

  ngOnInit() {
    this.socketService.onJoiningGame().subscribe(gameID => {
      this.toggleSpin("");
      this.router.navigateByUrl(`/game`);
    });
  }

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
      () => {
        this.socketService.joinGame(+gameID);
        this.socketService.onErrJoiningGame().subscribe(err => {
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
