import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameCardComponent } from "./game-card.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [GameCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [GameCardComponent]
})
export class GameCardModule {}
