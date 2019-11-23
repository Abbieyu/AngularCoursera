import { Component, OnInit,Input } from '@angular/core';
import { Dish } from '../shared/dish';
import {Params} from '@angular/router';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../services/dish.service';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})

export class DishDetailsComponent implements OnInit {
  dish:Dish; 
  //dish = DISH;
  constructor(private dishService:DishService,private location:Location,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {// /dishdetails/1
    let id = this.route.snapshot.params['id'];//get the id from the params of the current route 
    this.dishService.getDish(id)
    .subscribe((dish)=>{
      this.dish = dish;
    });
  }

  goBack():void{
    this.location.back();//go back to the previos item in the browser history
  }
};
