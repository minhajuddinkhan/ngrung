import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableComponent } from "./table.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [TableComponent],
  imports: [SharedModule, CommonModule]
})
export class TableModule {}
