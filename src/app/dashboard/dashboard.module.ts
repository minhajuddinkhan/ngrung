import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardService } from "./dashboard.service";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatGridListModule } from "@angular/material/grid-list";

@NgModule({
  declarations: [DashboardComponent],
  providers: [DashboardService],
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatGridListModule]
})
export class DashboardModule {}
