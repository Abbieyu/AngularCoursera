import { Injectable } from '@angular/core';
import {Promotion} from '../shared/promotion';
import { Promotions} from '../shared/promotions';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  getPromotions():Promise<Promotion[]>{
    return new Promise(resolve=>{
      setTimeout(() => resolve
        (Promotions), 2000);
    });
  }

  getPromotion(id:string):Promise<Promotion>{
    return new Promise(resolve=>{
      setTimeout(() => resolve
        (Promotions.filter((promo)=> promo.id===id)[0]), 2000);
    });
  }

  getFeaturedPromotion():Promise<Promotion>{
    return new Promise(resolve=>{
      setTimeout(() => resolve
        (Promotions.filter((promo)=>promo.featured)[0]), 2000);
    });
  }
  constructor() { }
}
