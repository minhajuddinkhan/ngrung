import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Me } from "src/models/game";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  authenticate(username: string) {
    return this.httpClient.post(`${environment.rootURL}/api/v1/auth`, {
      username
    });
  }
  getToken() {
    return sessionStorage.getItem("token");
  }
  setToken(token: string) {
    sessionStorage.setItem("token", token);
  }

  logout() {
    return this.httpClient.put(`${environment.rootURL}/api/v1/logout`, {});
  }

  whoami(): Observable<Me> {
    return this.httpClient.get<Me>(`${environment.rootURL}/api/v1/me`);
  }
}
