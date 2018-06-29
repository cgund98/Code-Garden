import { AbstractControl, FormGroup, ValidatorFn, FormControl, Validators } from '@angular/forms';


export function validateEqual(): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any} | null => {
    const confirm = control.parent.value.password;
    if (confirm && control !== control.value) {
      return { 'mismatch': true};
    }
    return null;
  };
}

//   constructor( @Attribute('validateEqual') public validateEqual: string) {}
//   validate(c: AbstractControl): { [key: string]: any } {
//     // self value (e.g. retype password)
//     let v = c.value;
//     // control value (e.g. password)
//     let e = c.root.get(this.validateEqual);
//     // value not equal
//     if (e && v !== e.value) return {
//       validateEqual: true;
//     }
//     return null;
//   }
// }
