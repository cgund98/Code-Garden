import { Component, OnInit, NgZone, Attribute} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';

import template from './signup-page.component.html';

@Component({
  selector: 'signup-page',
  template
})

export class SignupPageComponent implements OnInit {

    signupForm: FormGroup;
    error: string;

    constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {
        if (Meteor.user()) {
            this.router.navigate(["/"]);
        }
    }

    ngOnInit() {

        this.signupForm = this.formBuilder.group({
            email: ['', Validators.required],
            name: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirm: ['', [Validators.required,]]
        });
    }

    checkValids() {
        if (this.signupForm.valid && this.passMatch()) {
            return true;
        }
        return false;
    }

    passMatch() {
        const password = this.signupForm.get('password').value;
        const confirm = this.signupForm.get('confirm').value;
        return password == confirm;
    }

  signup() {
    if (this.checkValids()) {
        console.log('Creating...');
        Accounts.createUser({
          email: this.signupForm.value.email,
          name: this.signupForm.value.name,
          username: this.signupForm.value.username,
          password: this.signupForm.value.password
        }, (err) => {
          if (err) {
              console.log("Error");
              // console.log(err);
            this.zone.run(() => {
              this.error = err.reason;
            });
          } else {
            console.log("Success!");
            this.router.navigate(['/courses']);
          }
        });
    }
  }
}
