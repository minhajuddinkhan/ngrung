import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CardComponent } from "./card/card.component";
import { LoginModule } from "./login/login.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { GameCardModule } from "./game-card/game-card.module";
import { TableModule } from "./table/table.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
@NgModule({
  declarations: [AppComponent, CardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DashboardModule,
    SharedModule,
    GameCardModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
