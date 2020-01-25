import { Component, OnInit,Input, ViewChild,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import {Params} from '@angular/router';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../services/dish.service';
import {switchMap} from 'rxjs/operators';
import { stringify } from 'querystring';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { Comment } from '../shared/comment';
import {visibility,flyInOut,expand} from '../animations/app.animations';
@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.scss'],
  host:{
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[visibility,flyInOut,expand]
})

export class DishDetailsComponent implements OnInit {
  dish:Dish; 
  DishIds:string[];
  prev:string;
  next:string;
  value:number;
  CommentForm:FormGroup;
  CommentDate : string;
  comment : Comment;
  errMsg:string;
  dishCopy:Dish;
  visibility: String = 'shown';
  @ViewChild('commentForm') CommentFormDirective;
  formErrors = {
    'author':'',
    'comment':''
  }
  formValidation ={
    'author':{
      'required':'Author name is required',
      'minlength':'Author name must be at least 2 characters long'
    },
    'comment':{
      'required':'Comment is required'
    }
  }
  createForm(){
    this.CommentForm = this.FormBuilder.group({
      author:['',[Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      rating:[5,Validators.required],
      comment:['',Validators.required]
    });
    this.CommentForm.valueChanges
      .subscribe(data=>this.onValueChanged(data));//initiates form validation and defines error messages

      this.onValueChanged();// reset form validation messages
  }

  onValueChanged(data?:any){
    if(!this.CommentForm)
      {return;}
    const form = this.CommentForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){//clear previous error messages (if any)
        this.formErrors[field]='';
        const control=form.get(field);//the value in the field?
        if(control && control.dirty && !control.valid){
            const messages = this.formValidation[field];
            for (const key in control.errors){
              if(control.errors.hasOwnProperty(key))
                this.formErrors[field] +=messages[key] + ' ';
            }
        }
      }
    }
  }
  constructor(private dishService:DishService,private location:Location,
    private route:ActivatedRoute,private FormBuilder:FormBuilder,
    @Inject('BaseURL') private baseURL) { 

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
      });
    this.route.params // no snapshot because I have direct access to the params observable.
      .pipe(switchMap((params:Params)=>{console.log('the dish is now hidden');this.visibility='hidden';return this.dishService.getDish(params['id']);}))
      .subscribe((dish)=>{
        this.dish = dish;this.dishCopy=dish;this.setPrevNext(dish.id);this.visibility='shown';console.log('the dish is now shown');
      },(errormessage)=>this.errMsg=<any>errormessage);
      this.createForm();
  }
  setPrevNext(dishId:string){// given the current dishID, I want the previous and next dish Ids
    const index =this.DishIds.indexOf(dishId);
    this.prev = this.DishIds[(this.DishIds.length+index-1)%this.DishIds.length];
    this.next = this.DishIds[(this.DishIds.length+index+1)%this.DishIds.length];

  }
  goBack():void{
    this.location.back();//go back to the previos item in the browser history
  }

  onSubmit(){
     
    this.comment = this.CommentForm.value;
    console.log(this.comment);
    this.CommentForm.reset({
      author:'',
      rating:5,
      comment:''
    });
    this.CommentFormDirective.resetForm();//reset the form using @viewChild
    this.value = 5;
    console.log(this.value);
    this.comment.date = new Date().toString();;
    console.log(this.CommentDate);
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
    .subscribe((dish) =>{
      this.dish=dish;this.dishCopy=dish
    },(errormessage)=>{//an error occured
      this.dish=null;
      this.dishCopy=null;
      this.errMsg=errormessage});
    
  }
};
