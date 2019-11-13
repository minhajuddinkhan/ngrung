import { Component, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  games: any[];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService
      .getJoinableGames()
      .subscribe((resp: any) => (this.games = resp), err => console.log(err));
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
