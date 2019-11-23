import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { Promotions} from '../shared/promotions';
import {Observable,of} from 'rxjs';
import {delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions():Observable<Promotion[]>{
    return of(Promotions)
    .pipe(delay(2000))
  }

  getPromotion(id:string):Observable<Promotion>{
    return of(Promotions.filter((promo)=> promo.id===id)[0])
    .pipe(delay(2000))
  }

  getFeaturedPromotion():Observable<Promotion>{
    return of(Promotions.filter((promo)=>promo.featured)[0])
    .pipe(delay(2000))
  }
  constructor() { }
}
