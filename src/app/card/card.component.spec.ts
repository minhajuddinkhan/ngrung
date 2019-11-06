import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.house = 'Spades';
    component.number = '1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must have a implement a get house method', () => {
    expect(component.getHouse).toBeDefined();
  });

  it('must have house in any of the four houses in playing cards', () => {
    expect(['Spades', 'Clubs', 'Diamonds', 'Hearts'])
    .toContain(component.getHouse());
  });

  it('must have a get number method', () => {
    expect(component.getCardNumber).toBeDefined();
  });

  it('must have a number from 0 - 12', () => {
    expect(component.getCardNumber()).toBeLessThan(13);
  });
  
});
