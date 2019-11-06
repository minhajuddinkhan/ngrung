import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { GamesService } from "./games.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";

describe("GamesService", () => {
  let service: GamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [GamesService]
    });
    service = TestBed.get(GamesService);
    httpMock = TestBed.get(HttpTestingController);
  });

  const dummyGetGameResponse = {
    game_id: 1,
    players_joined: 1
  };

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("getGame() should get game", () => {
    service.getGame(1).subscribe(res => {
      expect(res).toEqual(dummyGetGameResponse);
    });

    const req = httpMock.expectOne("http://localhost:8001/api/v1/games/1");
    expect(req.request.method).toBe("GET");

    // Note That we are flushing dummy "http" response
    req.flush(dummyGetGameResponse);
  });
});
