import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
}
