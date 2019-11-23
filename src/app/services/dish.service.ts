import { Injectable } from '@angular/core';
import {Dish} from '../shared/dish';
import {Dishes} from '../shared/Dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  getDishes(): Promise<Dish[]>{
    return new Promise(resolve=>{
      //simulate server latency with 2 second-delay
      setTimeout(() => resolve(Dishes),2000);
      
    });
  }
  constructor() { }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve=>{
      setTimeout(() =>
        resolve(Dishes.filter((dish) => (dish.id === id))[0]), 2000);
     
    });
  }

  getFeaturedDish(): Promise<Dish> {
    return new Promise(resolve=>{
      setTimeout(() => resolve(
        Dishes.filter((dish) => dish.featured)[0]), 2000);
  });
}
}
