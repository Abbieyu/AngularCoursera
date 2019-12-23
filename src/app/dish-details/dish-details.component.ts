import { Component, OnInit,Input } from '@angular/core';
import { Dish } from '../shared/dish';
import {Params} from '@angular/router';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';
import { stringify } from 'querystring';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss']
})

export class DishDetailsComponent implements OnInit {
  dish:Dish; 
  DishIds:string[];
  prev:string;
  next:string;

  constructor(private dishService:DishService,private location:Location,private route:ActivatedRoute) { 

  }
  
  ngOnInit() {// /dishdetails/1
    // let id = this.route.snapshot.params['id'];//get the id from the params of the current route 
    // this.dishService.getDish(id)
    // .subscribe((dish)=>{
    //   this.dish = dish;
    // });
    this.dishService.getDishIds()
      .subscribe((ids)=>{
        this.DishIds=ids;
      })
    this.route.params // no snapshot because I have direct access to the params observable.
      .pipe(switchMap((params:Params)=>this.dishService.getDish(params['id'])))
      .subscribe((dish)=>{
        this.dish = dish;this.setPrevNext(dish.id);
      });
  }
  setPrevNext(dishId:string){// given the current dishID, I want the previous and next dish Ids
    const index =this.DishIds.indexOf(dishId);
    this.prev = this.DishIds[(this.DishIds.length+index-1)%this.DishIds.length];
    this.next = this.DishIds[(this.DishIds.length+index+1)%this.DishIds.length];

  }
  goBack():void{
    this.location.back();//go back to the previos item in the browser history
  }
};
