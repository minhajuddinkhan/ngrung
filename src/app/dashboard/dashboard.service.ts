import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthService } from "../login/login.service";

@Injectable()
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  getGames() {
    return this.httpClient.get(`${environment.rootURL}/api/v1/games`);
  }

  createGame() {
    return this.httpClient.post(`${environment.rootURL}/api/v1/games`, {});
  }

  getJoinableGames() {
    return this.httpClient.get(`${environment.rootURL}/api/v1/games`);
  }
}
