import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardService } from "./dashboard.service";
import { SharedModule } from "../shared/shared.module";
import { GameCardModule } from "../game-card/game-card.module";

@NgModule({
  declarations: [DashboardComponent],
  providers: [DashboardService],
  imports: [SharedModule, CommonModule, GameCardModule]
})
export class DashboardModule {}
