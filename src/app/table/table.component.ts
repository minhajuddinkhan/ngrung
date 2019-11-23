import { Component, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { AuthService } from "../login/login.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {
  constructor(private socket: Socket, private authService: AuthService) {}
  name: string;
  cards: any[];
  ngOnInit() {
    // this.socket = io.connect("http://localhost:8002");

    this.authService.whoami().subscribe((resp: any) => {
      this.name = resp.name;
    });
    this.socket.emit("authenticate", {
      token: sessionStorage.getItem("token")
    });
    this.socket.on("test", x => console.log(x));
    this.socket.on("done", y => console.log(y));
    this.socket.on("error", err => {
      console.log("SOMETHING!", err);
    });

    this.socket.on("cards-init", cards => {
      this.cards = cards;
      console.log(this.cards);
    });
  }
}
