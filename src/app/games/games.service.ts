import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class GamesService {
  rootURL: string;
  constructor(private httpClient: HttpClient) {}

  getGame(id: number) {
    return this.httpClient.get(`${environment.rootURL}/api/v1/games/${id}`, {});
  }
}
