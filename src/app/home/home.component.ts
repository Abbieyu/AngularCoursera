import { Component, OnInit ,Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish.service';
import {Promotion} from '../shared/promotion';
import { PromotionService} from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import {flyInOut,expand} from '../animations/app.animations';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[flyInOut,expand]
})
export class HomeComponent implements OnInit {
  dish : Dish;
  promotion : Promotion;
  leader : Leader;
  errMsgDish:string;
  errMsgLeader:string;
  errMsgPromotion:string;
  constructor(private dishService:DishService,private promotionService: PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') private baseURL, ) { 

    }

  ngOnInit() {
    this.dishService.getFeaturedDish()
    .subscribe((dish)=>{
      console.log('here, the dish is : '+dish)
      this.dish = dish;
    },(errormessage)=>{this.errMsgDish=<any>errormessage,console.log('the error is: '+errormessage)});
     this.promotionService.getFeaturedPromotion()
     .subscribe((promotion)=>{
      this.promotion =promotion;
    });//,(errormessage)=>this.errMsg=<any>errormessage);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader)=>{
      this.leader = leader;
    });//,(errormessage)=>this.errMsg =<any>errormessage );
  }
}
