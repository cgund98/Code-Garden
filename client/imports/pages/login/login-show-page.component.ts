import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './login-show-page.component.html';

@Component({
  selector: 'login-show-page',
  template
})

export class LoginShowPageComponent implements OnInit {

  private loginForm: FormGroup;
  user: Meteor.User;
  error: string;

   constructor(private router: Router,private zone: NgZone, private formBuilder: FormBuilder) {}

   ngOnInit() {
     this.loginForm = new FormGroup ({
       email: new FormControl('', [Validators.required,]),
       password: new FormControl('', [Validators.required]),
     });

     this.error='';

}

   login(){
     var self= this;
     console.log("Signing In...")
     if (this.loginForm.valid){
       Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
         this.zone.run(() =>{
           if (err) {
             this.error = err;
             console.log(err);
           } else {
             var user: Meteor.User;
             console.log(Meteor.user());
             // console.log(Meteor.loggingIn())
             self.router.navigate(['/dashboard']);
           }
         });
       });
     }
}

}
