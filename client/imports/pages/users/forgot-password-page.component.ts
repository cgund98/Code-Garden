import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base';

import template from './forgot-password-page.component.html';

@Component({
  selector: 'forgot-password-page',
  template
})

export class ForgotPasswordPageComponent implements OnInit {

  private resetForm: FormGroup;
  user: Meteor.User;
  error: string;
  sent: boolean = false;
  userExists: boolean = false;

   constructor(private router: Router,private zone: NgZone, private formBuilder: FormBuilder) {
       if (Meteor.user()) {
           // this.router.navigate(["/"]);
       }
   }

    ngOnInit() {
        this.resetForm = new FormGroup ({
            email: new FormControl('', [Validators.required,Validators.email]),
            // password: new FormControl('', [Validators.required]),
        });

        // this.error='';

    }


    async sendEmail() {
        if (this.userExists) {
            // console.log(await Meteor.callPromise('user.sendEmail', {email: 'gundlachcallum@gmail.com'}));
            Accounts.forgotPassword({email: this.resetForm.value.email});
            this.sent = true;
            this.error = "";
        } else {
            this.error = "No user with that email.";
        }
    }

    async checkUserExists() {
        let lookup = await Meteor.callPromise('users.getAccountByEmail', {
            email: this.resetForm.value.email,
        });
        this.userExists = lookup ? true : false;
    }

}
