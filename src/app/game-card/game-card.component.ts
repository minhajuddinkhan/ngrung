import { Component, OnInit, Input } from "@angular/core";
import { GameCardService } from "./game-card.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-game-card",
  templateUrl: "./game-card.component.html",
  styleUrls: ["./game-card.component.scss"]
})
export class GameCardComponent implements OnInit {
  constructor(
    private gameCardService: GameCardService,
    private snackBar: MatSnackBar
  ) {}

  @Input() game: any;

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
    this.toggleSpin(gameID);

    this.gameCardService.joinGame(gameID).subscribe(
      resp => {
        console.log(resp);
        this.toggleSpin("");
      },
      err => {
        this.snackBar.open(err.error && err.error.message, "", {
          duration: 2 * 1000
        });
        setTimeout(() => this.toggleSpin(""), 1.5 * 1000);
      }
    );
  }
}
