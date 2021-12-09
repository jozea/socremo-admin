import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('loginPin').value;
        if(AC.get('confirmPin').touched || AC.get('confirmPin').dirty) {
            let verifyPassword = AC.get('confirmPin').value;

            if(password != verifyPassword) {
                AC.get('confirmPin').setErrors( {MatchPassword: true} )
            } else {
                return null
            }
        }
    }

    static matchPin(AC: AbstractControl) {
        let pin = AC.get('newPin').value;
        if(AC.get('cpin').touched || AC.get('cpin').dirty) {
            let verifyPin = AC.get('cpin').value;

            if(pin != verifyPin) {
                AC.get('cpin').setErrors( {matchPin: true} )
            } else {
                return null
            }
        }
    }
}