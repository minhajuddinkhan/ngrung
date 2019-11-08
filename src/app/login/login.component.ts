import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { AuthService } from "./login.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  username = new FormControl("");
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onLoginClick(username: string) {
    this.authService.authenticate(username).subscribe(resp => {
      console.log(resp);
    });
  }
}
