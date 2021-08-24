import { AuthService } from '../../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

 
  hide = true;
  cHide = true;
  loading: boolean = false;
  resetForm: FormGroup; 

  currentSetting: any = 1
  headerText: any = 'Change Password'
  action: any = 'Reset Password'

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
  ) { }

  resetPassword(): void {
    this.loading = true;
    this.router.navigate(['/auth/login']);
  }

  goBack() {
    this.router.navigate(['/auth/login']);
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      cpassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      pin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      cpin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      securityQuetion: new FormControl('', Validators.required),
      securityAnswer: new FormControl('', Validators.required)
    });    
   }

   changesettings(value: any) {
     if (value == 1) {
       this.currentSetting = 1
       this.headerText = 'Change Password'
       this.action = 'Reset Password'
     }else if (value == 2) {
       this.currentSetting = 2
       this.headerText = 'Change Pin'
       this.action = 'Reset Pin'
     }else if (value == 3) {
       this.currentSetting = 3
       this.headerText = 'Change Security Question and Answer'
       this.action = 'Reset Security Question'
     }

   }

   
}
