import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AuthService } from "../login/login.service";
import { SocketsService } from "../sockets/sockets.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketsService
  ) {}
  name: string;
  cards: any[];
  playerID: number;
  gameID: number;

  color = "warn";
  mode = "determinate";
  spinnerMode = "indeterminate";
  value = 50;
  bufferValue = 75;
  joinRequest: string;
  showLoader = true;

  authenticate(cb) {
    this.socketService.authenticate();
    this.socketService.onAuthenticate().subscribe(player => {
      cb(player);
    });
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
