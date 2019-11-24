import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Socket } from "ngx-socket-io";

import { AuthService } from "../login/login.service";
import { JoinGame } from "./types";
@Injectable({
  providedIn: "root"
})
export class SocketsService {
  authSubject: Subject<any>;
  gameJoinSubject: Subject<any>;

  constructor(private socket: Socket, private authService: AuthService) {
    this.authSubject = new Subject();
    this.gameJoinSubject = new Subject();

    this.onAuthenticate();
    this.onJoiningGame();
  }

  authenticate() {
    this.socket.emit("authenticate", { token: this.authService.getToken() });
  }
  onAuthenticate() {
    this.socket.on("authenticate:done", player => {
      this.authSubject.next(player);
    });
  }
  joinGame(gameID: number) {
    this.socket.emit("join", { game_id: gameID });
  }

  onJoiningGame() {
    this.socket.on("join:done", (done: JoinGame) => {
      this.gameJoinSubject.next(done.game_id);
    });
  }
}
