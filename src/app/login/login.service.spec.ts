import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./login.service";
import { environment } from "../../environments/environment";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

describe("AuthService", () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  const dummyAuthResponse = {
    token: "j.w.t"
  };

  it("authenticate() should get token", () => {
    const username = "North";
    service.authenticate(username).subscribe(res => {
      expect(res).toEqual(dummyAuthResponse);
    });
    const req = httpMock.expectOne(r => {
      return true;
    });
    expect(req.request.method).toBe("POST");

    req.flush(dummyAuthResponse);
  });
});
