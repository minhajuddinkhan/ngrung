import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AuthService } from "../login/login.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  constructor(private socket: Socket, private authService: AuthService) {}
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
    this.socket.emit("authenticate", {
      token: sessionStorage.getItem("token")
    });
    this.socket.on("authenticate:done", player => cb(player));
  }

  joinGame(gameID) {
    this.socket.emit("join", { game_id: gameID });
    this.socket.on("join:done", () => (this.showLoader = false));
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
      this.authenticate(() => {
        console.log("comp initialized..");
      });
    });

    this.socket.on("disconnect", () => {
      this.showLoader = true;
    });

    this.socket.on("connect", () => {
      if (!this.gameID) {
        this.initializeComponentData(() => {
          this.onSocketReconnection(this.gameID);
        });
      }

      this.onSocketReconnection(this.gameID);
    });

    this.socket.on("authenticate:done", me => {
      // TODO:: fix this authenticate done thing...
      if (me) {
        this.playerID = me.player_id;
        this.cards = me.cards;
        this.gameID = me.game_id;
      }
      this.showLoader = false;
    });

    this.socket.on("cards", cards => {
      console.log("got cards");
      this.cards = cards;
    });
  }
}
