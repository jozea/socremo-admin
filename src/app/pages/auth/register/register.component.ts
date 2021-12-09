import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { PasswordValidation } from './password-validator';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  registerForm: FormGroup
  maxDate:  any;
  isLoading: boolean = false
  securityQuestions: any;
  roles: any;

  genders: any[]=[
    {id: 'M', value: 'Male'},
    {id: 'F', value: 'Female'}
  ]


  constructor(
    private formBuilder: FormBuilder, private utilService: UtilsService,
    private auth: AuthService, private permissionService: PermissionService
    ) 
    {
      const currentYear = new Date();
      this.maxDate = new Date(currentYear);
    }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
      birthdate: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      loginPin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])),
      confirmPin: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      securityQuestion: new FormControl('', Validators.required),
      securityAnswer: new FormControl('', Validators.required)
    }, { validator: PasswordValidation.MatchPassword});

    this.getSecurityQuestions()
    this.getRoles()
  }

  createNewAdmin() {
    let value = this.registerForm.value
    let birthdate = this.utilService.formatDateRemoveSpace(value.birthdate)

    let model = {
      firstName: value.firstName,
      lastName: value.lastName,
      sex: value.sex,
      birthdate: Number(birthdate),
      roleId: value.role,
      username: value.username,
      loginPin: value.loginPin,
      security:{
        key: Number(value.securityQuestion), 
        value: value.securityAnswer
      }
    }
    this.clear()
    // this.isLoading = true
    // this.auth.createAdmin(model).subscribe((response: any)=> {
    //   console.log(response)
    //   if(response.status == true) {
    //     this.utilService.triggerNotification(response.message)
    //     this.isLoading = false
    //   }else {
    //     this.utilService.triggerNotification(response.message)
    //     this.isLoading = false
    //   }
    // }), error=> {
    //   this.utilService.triggerNotification(error.error.message)
    //   this.isLoading = false
    // }
  }

  clear() {
    this.registerForm.reset({
      firstName: '',
      lastName: '',
      sex: '',
      birthdate: '',
      username: '',
      role: '',
      loginPin: '',
      confirmPin: '',
      securityQuestion: '',
      securityAnswer: ''
    })
    
  }

  getSecurityQuestions() {
    this.auth.getSecurityQuestions().subscribe((response: any)=> {
      if (response.status == true) {
        this.securityQuestions = response.data
      }
    })
  }

  getRoles() {
    this.permissionService.getNewRole().subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.roles = response.data
      }
    })
  }

}
