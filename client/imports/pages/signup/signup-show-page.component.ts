import { Component, OnInit, NgZone, Attribute} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { MiscCompsModule } from '../../misc/misc-comps.module';
import { validateEqual } from '../../misc/validate-equal';

import template from './signup-show-page.component.html';

@Component({
  selector: 'signup-show-page',
  template
})

export class SignupShowPageComponent implements OnInit {

  signupForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

    ngOnInit() {
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirm: ['', [Validators.required,]]
      });

      this.error='';

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
      console.log('Creating...');
    if (this.checkValids()) {
        Accounts.createUser({
          email: this.signupForm.value.email,
    //      name: this.signupForm.value.name,
          username: this.signupForm.value.username,
          password: this.signupForm.value.password
        }, (err) => {
          if (err) {
            this.zone.run(() => {
              this.error = err;
            });
          } else {
            this.router.navigate(['/login']);
          }
        });
    }
  }
}
