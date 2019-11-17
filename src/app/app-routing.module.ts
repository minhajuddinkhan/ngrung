import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TableComponent } from "./table/table.component";
import { AuthGuardService } from "./auth/auth.service";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "game/:id",
    component: TableComponent
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "prefix"
  },
  {
    path: "**",
    redirectTo: "login",
    pathMatch: "prefix"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule {}
