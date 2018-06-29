import { Component, OnInit, NgZone, Attribute} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
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

  private signupForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}


    ngOnInit() {

      this.signupForm = new FormGroup ({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm: new FormControl('', [this.validateEqual])
    // }. { validator: this.validateEqual
    });
    console.log(this.error);
    this.error='';

  }





    //
    //   this.signupForm = this.formBuilder.group({
    //     "password":this.signupForm,
    //     "confirm":this.signupForm.confirm
    //   }, {
    //     validator: this.validatePasswordConfirmation
    //   });
    // }
  //
  // validatePasswordConfirmation(group: FormGroup) {
  //   return (control: AbstractControl): {[key: string]: any} | null{
  //     const confirm = group.value.password;
  //     if (confirm && control !== control.value) {
  //       return { 'mismatch': true};
  //     }
  //     return null;
  //   };
  // }


//   ngOnInit() {
//
//     this.signupForm = new FormGroup ({
//       email: new FormControl('', [Validators.required]),
//       name: new FormControl('', [Validators.required]),
//       username: new FormControl('', [Validators.required]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//       confirm: new FormControl('', [Validators.required, validateEqual()])
//     })
//     this.error='';
//
//
validateEqual(): ValidatorFn {
    return(confirm: AbstractControl): { [key: string]: any } | null => {
    console.log(confirm);
    const pass = confirm.get('password');
    console.log(pass);
    if (pass && confirm !== confirm.value) {
      return { 'mismatch': true};
    }
    return null;
  };
}


// validateEqual() {
//    return this.signupForm.get('password') === this.signupForm.get('confirm')
//       ? null : {'mismatch': true};
// }
    // checkPasswords(this.signupForm) { // here we have the 'passwords' group
    // let pass = this.signupForm.value.password;
    // let confirmPass = this.signupForm.value.confirm;
    //
    // return pass === confirmPass ? null : { notSame: true }
    // this.error = '';
  // }
  signup() {
      console.log('Creating...');
    if (this.signupForm.valid) {
        Accounts.createUser({
          email: this.signupForm.value.email,
          name: this.signupForm.value.name,
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
      // Accounts.createUser({
      //   email: this.signupForm.value.email,
      //   name: this.signupForm.value.name,
      //   username: this.signupForm.value.username,
      //   password: this.signupForm.value.password
      // }, (err) => {
      //   if (err) {
      //     this.zone.run(() => {
      //       this.error = err;
      //     });
      //   } else {
      //     this.router.navigate(['/']);
      //   }
      // });
    }
  }
}




//   ngOnInit() {
//     this.newUserForm = new FormGroup ({
//       email: new FormControl('', Validators.required),
//       name: new FormControl('', Validators.required),
//       username: new FormControl('', [Validators.required, Validators.minLength(5)]),
//       password: new FormControl('', [Validators.required, Validators.minLength(6)]),
//       passwordConfirm: new FormControl('', Validators.required),
//     })
//   }
//   get email() { return this.newUserForm.get('email'); }
//   get username() { return this.newUserForm.get('username'); }
//   get password() { return this.newUserForm.get('password'); }
//   get passwordConfirm() { return this.newUserForm.get('passwordConfirm'); }
//   get name() { return this.newUserForm.get('name'); }
//
//   submit() {
//
//    // 'submit #signup': function(event, template) {
//     var user;
//     // Collect Data and Validate
//
//     user = {
//       username: this.username,
//       password: this.password,
//       email: this.email,
//       profile: {
//         name: this.name,
//         // etc
//       }
//     }
//
//     // Accounts.validateNewUser(function (user) {
//     //   // Ensure user name is long enough
//     //   if (this.username.length < 5) {
//     //     throw new Meteor.Error(403, 'Your username needs at least 5 characters');
//     //   }
//     //
//     //   var passwordTest = new RegExp("(?=.{6,}).*", "g");
//     //   if ((this.password == this.passwordConfirm) == false){
//     //     throw new Meteor.Error(403, 'Your Password\'s must match');
//     //   }
//     //   if (passwordTest.test(this.password) == false) {
//     //     throw new Meteor.Error(403, 'Your password is too weak!');
//     //   }
//     //
//     //   return true;
//     // });
//
//     // Post user to server for creation
//     Accounts.createUser(user, function (error) {
//     if (error) {
//       // :(
//       console.log(error);
//     }
//   });
//
// }
// }
