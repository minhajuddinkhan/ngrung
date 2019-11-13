import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./login.service";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, SharedModule],
  providers: [AuthService]
})
export class LoginModule {}
