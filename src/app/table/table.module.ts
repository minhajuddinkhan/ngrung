import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { SharedModule } from "../shared/shared.module";
import { CardComponent } from "../card/card.component";
@NgModule({
  declarations: [TableComponent, CardComponent],
  imports: [SharedModule, CommonModule]
})
export class TableModule {}
