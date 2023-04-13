import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, FormGroup, AsyncValidatorFn } from '@angular/forms';
import { Observable, delay, map, of } from 'rxjs';


interface ErrorValidate {
  [s: string]: boolean
}

type ValidationErrors = {
  [key: string]: any;
};

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  takenUsernames = ['strider','username'];
  
  checkIfUsernameExists(username: string): Observable<boolean> {
    return of(this.takenUsernames.includes(username)).pipe(delay(1500));
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map(res => {
          return res ? { usernameExists: true } : null;
        })
      );
    };
  }
  
  


noIsaac(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    // const hasUpperCase = /[A-Z]+/.test(value);
    // const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasNumeric || (value?.toLowerCase() === 'caasi');
    return passwordValid ? { passwordStrength: true } : null;
  }
}


noIsaac2(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.toLowerCase() === 'isaac') {
      return { noIsaac2: true };
    }
    return null;
  }
}



validadoresIguales(pass1Name: string, pass2Name: string){
  return (form: FormGroup) => {
    const pass1 = form.get(pass1Name);
    const pass2 = form.get(pass2Name);
    if (pass2?.value === pass1?.value) {
      pass2?.setErrors(null);
    }
    else {
      pass2?.setErrors({ validadoresIguales: true });
    }
  }
}




}
