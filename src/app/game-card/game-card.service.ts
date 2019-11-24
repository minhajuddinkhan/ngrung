import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class GameCardService {
  constructor(private httpClient: HttpClient) {}

  joinGame(gameID: string) {
    return this.httpClient.get(
      `${environment.rootURL}/api/v1/games/${gameID}/join`
    );
  }
}
