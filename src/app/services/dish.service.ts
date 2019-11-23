import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {Dishes} from '../shared/Dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Promise<Dish[]>{
    return Promise.resolve(Dishes);// this works well if I have the results ready
  }
  constructor() { }

  getDish(id: string): Promise<Dish> {
    return Promise.resolve(Dishes.filter((dish) => (dish.id === id))[0]);
  }

  getFeaturedDish(): Promise<Dish> {
    return Promise.resolve(Dishes.filter((dish) => dish.featured)[0]);
  }
}
