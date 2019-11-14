import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {Dishes} from '../shared/Dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes():Dish[]{
    return Dishes;
  }
  constructor() { }
}
