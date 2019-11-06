import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
  @Input() house: string;
  @Input() number: string;
  private imageURL: string;
  private houses = ["Spades", "Clubs", "Diamonds", "Hearts"];
  private imageMap = {
    Spades: "S",
    Hearts: "H",
    Clubs: "C",
    Diamonds: "D"
  };

  private numberMap = {
    0: "2",
    1: "3",
    2: "4",
    3: "5",
    4: "6",
    5: "7",
    6: "8",
    7: "9",
    8: "10",
    9: "J",
    10: "Q",
    11: "K",
    12: "A"
  };
  constructor() {}

  ngOnInit() {
    if (!this.houses.includes(this.house)) {
      throw new Error("cant find any house");
    }
    if (!this.numberMap[this.number]) {
      throw new Error("cant find this number");
    }
    this.imageURL = this.constructImageUrl(this.house, this.number);
  }

  getHouse(): string {
    return this.house;
  }

  getCardNumber(): string {
    return this.number;
  }

  constructImageUrl(house: string, num: string): string {
    console.log(num);
    const h = this.imageMap[house];
    const n = this.numberMap[num];
    return `../../assets/${n}${h}.jpg`;
  }
}
