import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { Router } from "@angular/router";
import { AuthService } from "../login/login.service";
import { SocketsService } from "../sockets/sockets.service";
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
    private socketService: SocketsService
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

    this.socketService.onJoiningGame().subscribe(gameId => {
      this.navigateToJoinGame(gameId);
    });
  }

  logout() {
    this.authService.logout().subscribe(resp => {}, err => {});
  }

  createGame() {
    this.dashboardService.createGame().subscribe(
      (resp: any) => {
        this.socketService.joinGame(resp.game_id);
      },
      err => {
        console.log("error", err);
      }
    );
  }
}
