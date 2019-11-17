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

  logout() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };

    return this.httpClient.put(
      `${environment.rootURL}/api/v1/logout`,
      {},
      httpOptions
    );
  }

  whoami(): Observable<Me> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };

    return this.httpClient.get<Me>(
      `${environment.rootURL}/api/v1/me`,
      httpOptions
    );
  }
}
