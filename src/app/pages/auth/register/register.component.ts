import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  registerForm: FormGroup


  constructor(
    private formBuilder: FormBuilder,
    ) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
      address: new FormControl('', Validators.required),
      id: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      designation: new FormControl('', Validators.required),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      pin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      confirmPin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      securityQuestion: new FormControl('', Validators.required),
      securityAnswer: new FormControl('', Validators.required)
    });
  }

}
