import { UtilsService } from './../../../services/utils/utils.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loading: boolean = false;
  loginForm: FormGroup;
  showOTP: boolean = false;
  showForgotPassword: boolean = false;

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private router: Router,
    private utilService: UtilsService,
    private translate: TranslateService
    ) {
    translate.setDefaultLang('pt'); 
  }

  login(): void {
    // this.router.navigate(['/app/dashboard']);


    this.utilService.deleteKeyIfEmpty(this.loginForm.value)
    // console.log(this.loginForm.value)
    // if (!this.loginForm.valid) {
    //   this.utilService.triggerNotification('Invalid Login Details');
    //   return;
    // }

    // let timestamp = Date.now().toString();
    // // this.loginForm.value.timestamp = timestamp;
    // // this.loginForm.value.channel = 'web';
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe(async (response: any) => {

      // if (response.status === true && response.data == "otp") {
      //   this.showOTP = true;
      // } else 
      // console.log(response)
      if (response.status === true && response.data ) {
        // const { user } = response.data
        // const { user, permissions } = response.data
        const user = response.data
        const authorization = user.auth.accessToken;

        sessionStorage.setItem('authorization', authorization);
        sessionStorage.setItem('user', JSON.stringify({ user }));
        // sessionStorage.setItem('user', JSON.stringify({ ...user, permissions }));
        this.showOTP = false;
        this.router.navigate(['/app/dashboard']);
      }
      this.loading = false;
      this.utilService.triggerNotification(response.message)
    }, error=> {
      if (error.status == 403) {
        this.showOTP = true;
      }
      this.loading = false;
      this.utilService.triggerNotification( error.message || 'Network Error',)
    })

  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      primaryTelephone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      loginPin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      otp: new FormControl('', Validators.compose([Validators.minLength(6)])),
      newPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(10)])),
      confirmPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      securityAnswer: new FormControl('', Validators.compose([Validators.minLength(6)])),
    });

    if (sessionStorage.getItem("authorization")) {
      this.router.navigate(['/app/dashboard']);
    }

  }

  forgotPassword() {
    this.showForgotPassword = true
  }

  rememberPassword() {
    this.showForgotPassword = false
  }

}
