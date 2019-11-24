import { Component, OnInit } from "@angular/core";
import { AuthService } from "../login/login.service";
import { SocketsService } from "../sockets/sockets.service";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  animations: [
    trigger("cards", [
      transition(":enter", [
        style({ transform: "scale(0.5)", opacity: 0 }), // initial
        animate(
          "1s cubic-bezier(.8, -0.6, 0.2, 1.5)",
          style({ transform: "scale(1)", opacity: 1 })
        ) // final
      ]),
      transition(":leave", [
        style({ transform: "scale(1)", opacity: 1, height: "*" }),
        animate(
          "1s cubic-bezier(.8, -0.6, 0.2, 1.5)",
          style({
            transform: "scale(0.5)",
            opacity: 0,
            height: "0px",
            margin: "0px"
          })
        )
      ])
    ])
  ]
})
export class TableComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketsService
  ) {}
  name: string;
  cards: any[];
  cardsPlayed = [];
  playerID: number;
  gameID: number;

  color = "warn";
  mode = "determinate";
  spinnerMode = "indeterminate";
  value = 50;
  bufferValue = 75;
  cardsAtHand = 13;
  joinRequest: string;
  showLoader = true;

  authenticate(cb) {
    this.socketService.authenticate();
    this.socketService.onAuthenticate().subscribe(player => {
      cb(player);
    });
  }

  isPlaceHolderCard(card): boolean {
    return card.house === "0";
  }

  moveCardToPlayed(card, i) {
    if (this.isPlaceHolderCard(card)) {
      return;
    }
    console.log(card, i);
    this.cardsPlayed.push(card);
    this.cards.splice(i, 1);
    this.cards.splice(i, 0, { house: "0", number: "-1" });
  }

  joinGame(gameID) {
    this.socketService.joinGame(gameID);
    this.socketService.onJoiningGame().subscribe(() => {
      this.showLoader = false;
    });
  }

  onSocketReconnection(gameID) {
    this.authenticate(player => {
      if (player) {
        this.cards = player.cards;
      }
      this.joinGame(gameID);
    });
  }

  initializeComponentData(done) {
    this.authService.whoami().subscribe((resp: any) => {
      this.gameID = resp.game_id;
      this.name = resp.name;
      done();
    });
  }

  ngOnInit() {
    this.initializeComponentData(() => {
      this.authenticate(() => {});
    });

    this.socketService.onDisconnect().subscribe(() => {
      this.showLoader = true;
    });

    this.socketService.onReconnect().subscribe(() => {
      if (!this.gameID) {
        this.initializeComponentData(() => {
          this.onSocketReconnection(this.gameID);
        });
      }

      this.onSocketReconnection(this.gameID);
    });

    this.socketService.onAuthenticate().subscribe(me => {
      // TODO:: fix this authenticate done thing...
      if (me) {
        this.playerID = me.player_id;
        this.cards = me.cards;
        this.gameID = me.game_id;
      }
      this.showLoader = false;
    });

    this.socketService.on("cards").subscribe(cards => {
      this.cards = cards;
    });
  }
}
