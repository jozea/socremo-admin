import { AbstractControl } from '@angular/forms';
export class PinValidation {

    static matchPin(AC: AbstractControl) {
        let pin = AC.get('newPin').value;
        if(AC.get('cPin').touched || AC.get('cPin').dirty) {
            let verifyPin = AC.get('cPin').value;

            if(pin != verifyPin) {
                AC.get('cPin').setErrors( {matchPin: true} )
            } else {
                return null
            }
        }
    }
}