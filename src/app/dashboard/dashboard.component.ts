import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";
import { AuthService } from "../login/login.service";
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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.whoami().subscribe(me => {
      this.currentPlayer = me;
      console.log(this.currentPlayer);
      if (!this.currentPlayer.in_game && !this.currentPlayer.is_host) {
        this.dashboardService
          .getJoinableGames()
          .subscribe(
            (resp: any) => (this.games = resp),
            err => console.log(err)
          );
      }
    });
  }

  createGame() {
    this.dashboardService.createGame().subscribe(
      (resp: any) => {
        this.games.push(resp);
        console.log(this.games);
      },
      err => {
        console.log("error", err);
      }
    );
  }
}
