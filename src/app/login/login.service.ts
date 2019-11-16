import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

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

  whoami() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        token: localStorage.getItem("token")
      })
    };

    return this.httpClient.get(`${environment.rootURL}/api/v1/me`, httpOptions);
  }
}
