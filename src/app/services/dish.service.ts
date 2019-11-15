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

  getDish(id: string): Dish {
    return Dishes.filter((dish) => (dish.id === id))[0];
  }

  getFeaturedDish(): Dish {
    return Dishes.filter((dish) => dish.featured)[0];
  }
}
