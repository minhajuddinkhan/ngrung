import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class GameCardService {
  constructor(private httpClient: HttpClient) {}

  joinGame(gameID: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };

    return this.httpClient.get(
      `${environment.rootURL}/api/v1/games/${gameID}/join`,
      httpOptions
    );
  }
}
