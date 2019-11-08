import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./login.service";
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [AuthService]
})
export class LoginModule {}
