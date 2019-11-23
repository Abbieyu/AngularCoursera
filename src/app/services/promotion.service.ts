import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { Promotions} from '../shared/promotions';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions():Promise<Promotion[]>{
    return Promise.resolve(Promotions);
  }

  getPromotion(id:string):Promise<Promotion>{
    return Promise.resolve(Promotions.filter((promo)=> promo.id===id)[0]);
  }

  getFeaturedPromotion():Promise<Promotion>{
    return Promise.resolve(Promotions.filter((promo)=>promo.featured)[0]);
  }
  constructor() { }
}
