import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { Router } from "@angular/router";
import { AuthService } from "../login/login.service";
import { Socket } from "ngx-socket-io";
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  games: any[];
  currentPlayer: any;
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    private socket: Socket
  ) {}

  isConnectedToGame(player) {
    return player.in_game || player.is_host;
  }

  navigateToJoinGame(gameID: string) {
    this.router.navigateByUrl(`/game/${gameID}`);
  }

  ngOnInit() {
    this.dashboardService
      .getJoinableGames()
      .subscribe((resp: any) => (this.games = resp), err => console.log(err));
  }

  logout() {
    this.authService.logout().subscribe(resp => {}, err => {});
  }

  createGame() {
    this.dashboardService.createGame().subscribe(
      (resp: any) => {
        this.socket.emit("join", { game_id: resp.game_id });
        this.socket.on("join:done", () => {
          this.router.navigateByUrl(`/game/${resp.game_id}`);
        });
      },
      err => {
        console.log("error", err);
      }
    );
  }
}
