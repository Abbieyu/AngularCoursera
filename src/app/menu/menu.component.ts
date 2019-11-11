 import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {Dishes} from '../shared/Dishes';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  Dishes : Dish[]=Dishes;
  selectedDish:Dish = Dishes[0];
  constructor() { }

  ngOnInit() {
  }

}
