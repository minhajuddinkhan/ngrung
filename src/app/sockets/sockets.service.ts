import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Socket } from "ngx-socket-io";

import { AuthService } from "../login/login.service";
import { JoinGame } from "./types";
@Injectable({
  providedIn: "root"
})
export class SocketsService {
  parentSockSubj: Subject<any>;
  authSubject: Subject<any>;
  gameJoinSubject: Subject<any>;
  gameJoinErrSubject: Subject<any>;
  disconnectSubj: Subject<any>;
  defaultSocketSubject: Subject<any>;

  constructor(private socket: Socket, private authService: AuthService) {
    this.parentSockSubj = new Subject();
    this.disconnectSubj = new Subject();
    this.authSubject = new Subject();
    this.gameJoinSubject = new Subject();
    this.gameJoinErrSubject = new Subject();
    this.defaultSocketSubject = new Subject();

    this.socket.on("connect", () => {
      this.parentSockSubj.next();
    });

    this.socket.on("disconnect", () => {
      this.disconnectSubj.next();
    });

    this.socket.on("authenticate:done", player => {
      this.authSubject.next(player);
    });

    this.socket.on("join:done", (done: JoinGame) => {
      this.gameJoinSubject.next(done.game_id);
    });
    this.socket.on("join:error", err => {
      this.gameJoinErrSubject.next(err);
    });
  }

  authenticate() {
    this.socket.emit("authenticate", { token: this.authService.getToken() });
  }
  joinGame(gameID: number) {
    this.socket.emit("join", { game_id: gameID });
  }

  onReconnect(): Subject<any> {
    return this.parentSockSubj;
  }

  onDisconnect(): Subject<any> {
    return this.disconnectSubj;
  }

  onAuthenticate(): Subject<any> {
    return this.authSubject;
  }

  onJoiningGame(): Subject<any> {
    return this.gameJoinSubject;
  }
  onErrJoiningGame(): Subject<any> {
    return this.gameJoinErrSubject;
  }

  on(event: string) {
    this.socket.on(event, data => {
      this.defaultSocketSubject.next(data);
    });

    return this.defaultSocketSubject;
  }
}
