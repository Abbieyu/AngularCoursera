import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {Dish} from '../shared/dish';
import {Dishes} from '../shared/Dishes';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  // getDishes(): Promise<Dish[]>{
  //   return of(Dishes)
  //   .pipe(delay(2000))
  //   .toPromise();//convert the observable to a promise and send it to the component
  //   // to make it return a promise instead of an observable
  // }
  getDishes(): Observable<Dish[]>{
    return of(Dishes)
    .pipe(delay(2000))
  }
  constructor() { }

  getDish(id: string): Observable<Dish> {
    return of(Dishes.filter((dish) => (dish.id === id))[0])
    .pipe(delay(2000))
  }

  getFeaturedDish(): Observable<Dish> {
    return of(Dishes.filter((dish) => dish.featured)[0])
    .pipe(delay(2000))
}
}
