import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { Router } from "@angular/router";
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
    private router: Router
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

  createGame() {
    this.dashboardService.createGame().subscribe(
      (resp: any) => {
        this.router.navigateByUrl(`/game/${resp.game_id}`);
      },
      err => {
        console.log("error", err);
      }
    );
  }
}
