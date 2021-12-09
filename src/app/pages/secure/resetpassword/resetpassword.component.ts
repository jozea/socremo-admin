import { AuthService } from '../../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UtilsService } from 'src/app/services/utils/utils.service';

import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { UserService } from 'src/app/services/user/user.service';
import { PasswordValidation } from '../../auth/register/password-validator';
import { PinValidation } from './pin-validator';




@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

 
  hide = true;
  cHide = true;
  isLoading: boolean = false;
  resetForm: FormGroup; 

  currentSetting: any = 2
  headerText: any = marker('security.changePassword')
  action: any = marker('security.resetPassword')

  constructor(
    public formBuilder: FormBuilder,
    private router: Router, private userService: UserService,
    public util: UtilsService, private utilService: UtilsService
    ) {
    }

  resetPassword(value): void {
    this.isLoading = true;
    if (value == 1) {
      // console.log(value)
    }else if (value == 2) {
      this.changePin()
    }else if (value == 3) {
      // console.log(value)
    }
    // this.router.navigate(['/auth/login']);
  }

  goBack() {
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      cpassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      oldPin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])),
      newPin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])),
      cPin: new FormControl('', Validators.compose([Validators.required])),
      securityQuetion: new FormControl('', Validators.required),
      securityAnswer: new FormControl('', Validators.required)
    },{ validator: PinValidation.matchPin});   
   }

   changesettings(value: any) {
     if (value == 1) {
       this.currentSetting = 1
       this.headerText = marker('security.changePassword')
       this.action = marker('security.resetPassword')
     }else if (value == 2) {
       this.currentSetting = 2
       this.headerText = marker('security.changePin')
       this.action = marker('security.resetPin')
     }else if (value == 3) {
       this.currentSetting = 3
       this.headerText = marker('security.changeSecurityQuestion')
       this.action = marker('security.resetSecurityQuestion')
     }

   }

   changePin() {
     let model = {
      newLoginPin:this.resetForm.value.newPin, 
      oldLoginPin:this.resetForm.value.oldPin
    }
    // console.log(model)
    this.userService.changeAdminPin(model).subscribe((response: any)=> {
      // console.log(response)
      if(response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoading = false
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoading = false
      }
    }), error=> {
      this.utilService.triggerNotification(error.error.message)
      this.isLoading = false
    }
   }

   
}
