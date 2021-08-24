import { AuthService } from '../../../services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  hide = true;
  loading: boolean = false;
  otpForm: FormGroup; 

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  getOTP(): void {
    // this.loading = true;
    this.router.navigate(['/auth/reset']);
  }

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      mobileNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
    });    
   }

   
}
