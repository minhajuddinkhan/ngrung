import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  private house: string;
  private number: number;
  constructor(house: string, num: number,) {
    this.house = house;
    this.number = num;
   }

  ngOnInit() {
  }

  getHouse(): string {
    return this.house;
  }
  getCardNumber(): number {
    return this.number;
  }

}
