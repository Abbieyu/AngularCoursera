import { Component, OnInit,ViewChild } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {Feedback,ContactType} from '../shared/feedback';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  feedbackForm:FormGroup;
  feedback:Feedback;//the corresponding data model.
  contactType = ContactType;
  //gives access to the DOM element with the same name in the brackets
  @ViewChild('FeedbackForm') feedbackFormDirective;//reference to the feedbackform
  formErrors = {//an object containing the errors
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };
  validationMessages={// an object containing validation(error) messages
    'firstname':{
      'required':'First name is required.',
      'minlength':'First name must be at least 2 characters long.',
      'maxlength':'First name cannot exceed 25 characters.'
    },
    'lastname':{
      'required':'Last name is required.',
      'minlength':'Last name must be at least 2 characters long.',
      'maxlength':'Last name cannot exceed 25 characters.'
    },
    'telnum':{
      'required':'Tel. no. is required.',
      'pattern':'Tel. no. must only contain numbers.'
    },
    'email':{
      'required':'Email is required.',
      'email':'Email is invalid.'
    }
  }
  constructor(private formBuilder:FormBuilder) {
    this.createForm();
   }

  createForm(){
    this.feedbackForm=this.formBuilder.group({
      firstname:['',[Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum:[0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree:false,
      contacttype:'None',
      message:''
    });
    //angular provides the valueChanges observable when there are changes in the form
    this.feedbackForm.valueChanges
      .subscribe(data=>this.onValueChanged(data));//initiates form validation and defines error messages

      this.onValueChanged();// reset form validation messages
  }

  onSubmit(){
    console.log('here!');
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contacttype:'None',
      message:''
    });
    this.feedbackFormDirective.resetForm();//reset the form using @viewChild
  }
  onValueChanged(data?:any)
  {
    if(!this.feedbackForm)
      {return;}
    const form = this.feedbackForm;
    for(const field in this.formErrors){
      if(this.formErrors.hasOwnProperty(field)){//clear previous error messages (if any)
        this.formErrors[field]='';
        const control=form.get(field);//the value in the field?
        if(control && control.dirty && !control.valid){
            const messages = this.validationMessages[field];
            for (const key in control.errors){
              if(control.errors.hasOwnProperty(key))
                this.formErrors[field] +=messages[key] + ' ';
            }
        }
      }
    }
  }
  ngOnInit() {
  }

}
