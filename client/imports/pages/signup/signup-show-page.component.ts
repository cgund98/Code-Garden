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

<<<<<<< HEAD
=======


//   validateEqual(): ValidatorFn {
//       console.log("test");
//       return (confirm: FormControl): { [key: string]: any } | null => {
//       console.log("confirm", confirm);
//       console.log("confirm-parent", confirm.parent);
//       console.log("password", this.signupForm.get('password'));
//     //   if (confirm){
//     //   console.log(this.signupForm.value.password);
//     // }
//       // const  = confirm.value;
//       const password = this.signupForm.get('password').value;
//       console.log("pass", password);
//       console.log("value", confirm.value);
//       if (password && confirm !== confirm.value) {
//         console.log("check-tew");
//         return {'mismatch': true};
//       }
//       console.log("nul-tew");
//       return {'mismatch': null};
//     };
// }
>>>>>>> 86b2396146ca5d89a4371fdaea11940184dd1646
    ngOnInit() {
      this.signupForm = this.formBuilder.group({
        email: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
<<<<<<< HEAD
        confirm: ['', [Validators.required,]]
      });

      this.error='';

    }
=======
        // confirm: ['', [Validators.required, this.validateEqual.bind(this)]],
        confirm: ['', Validators.required]
      },{validator: [this.checkPasswords]});
      // });
      console.log(this.checkPasswords);
      // this.signupForm = new FormGroup ({
      // email: new FormControl('', [Validators.required]),
      // name: new FormControl('', [Validators.required]),
      // username: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // confirm: new FormControl('', [Validators.required, this.validateEqual(this.signupForm.controls['password'].value)])
      // // }. { validator: this.validateEqual
      // });

      this.error='';

}

checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const pass = group.controls['password'].value;
  const confirmPass = group.controls['confirm'].value;
  console.log("pass", pass);
  console.log("confirm", confirmPass)

  console.log("test", pass === confirmPass ? null : { notSame: true });
  console.log("ah", group);
  return (pass === confirmPass ? null : { notSame: true })
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


>>>>>>> 86b2396146ca5d89a4371fdaea11940184dd1646

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
    }
  }
}
