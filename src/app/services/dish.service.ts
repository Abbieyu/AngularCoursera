import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs';
import {delay,map,catchError} from 'rxjs/operators';
import {Dish} from '../shared/dish';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {baseURL} from '../shared/baseURL';
import {ProcessHTTPMsgService} from '../services/process-httpmsg.service';
import { error } from 'protractor';
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
    return this.http.get<Dish[]>(baseURL+'dishes')
    .pipe(catchError(this.processHTTPMsg.handleError))

  }
  constructor(private http: HttpClient,private processHTTPMsg : ProcessHTTPMsgService) { 

  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL+'dishes/'+id)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }

  getFeaturedDish(): Observable<Dish> {
    console.log('here in the featured dish method inside the service');
    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe(map(dishes=>dishes[0]))
    .pipe(catchError(this.processHTTPMsg.handleError))
  }
  
  getDishIds():Observable<string[] | any>{
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish=>dish.id)))
        .pipe(catchError(error=>error))
  }
  putDish(dish:Dish): Observable<Dish> {
    const httpOptions={//headers information
      headers:new HttpHeaders({
        'contentType':'application/json'
      })
    };
    return this.http.put<Dish>(baseURL+'dishes/'+dish.id,dish,httpOptions)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }
}
