import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import template from './login-page.component.html';

@Component({
  selector: 'login-page',
  template
})

export class LoginPageComponent implements OnInit {

  private loginForm: FormGroup;
  user: Meteor.User;
  error: string;
  userExists: boolean = false;

   constructor(private router: Router,private zone: NgZone, private formBuilder: FormBuilder) {
       if (Meteor.user()) {
           this.router.navigate(["/"]);
       }
   }

    ngOnInit() {
        this.loginForm = new FormGroup ({
            email: new FormControl('', [Validators.required,Validators.email]),
            password: new FormControl('', [Validators.required]),
        });

        // this.error='';

    }

    login(){
        var self= this;
        console.log("Signing In...")
        if (this.loginForm.valid){
            Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
                this.zone.run(() =>{
                if (err) {
                    this.error = err.reason;
                    // console.log(err);
                } else {
                    var user: Meteor.User;
                    // console.log(Meteor.user());
                    // console.log(Meteor.loggingIn())
                    self.router.navigate(['/dashboard']);
                }
            });
        });
        }
    }

}
