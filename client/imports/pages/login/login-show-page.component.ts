import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import template from './login-show-page.component.html';

@Component({
  selector: 'login-show-page',
  template
})

export class LoginShowPageComponent implements OnInit {

  private loginForm: FormGroup;
  error: string;

   constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

   ngOnInit() {
     this.loginForm = new FormGroup ({
       email: new FormControl('', [Validators.required,]),
       password: new FormControl('', [Validators.required]),
     });

     this.error='';
   }

   login(){
     console.log("Signing In...")
     if (this.loginForm.valid){
       Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
         this.zone.run(() =>{
           if (err) {
             this.error = err;
           } else {
             this.router.navigate(['/dashboard']);
           }
         });
       });
     }
   }
}
