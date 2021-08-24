import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  isLoading = false;
  isLoadingResults = false;
  settingsForm: FormGroup;

  lock
  yes = true
  no = false
  maxDate: Date;
  securityQuestions: any[]=[];
  userDetails:any;


  constructor(
    public dialogRef: MatDialogRef<TicketDetailsComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public utilService: UtilsService,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group({
      dob: new FormControl('', Validators.required),
      secQst: new FormControl('', Validators.required),
      secAns: new FormControl('', Validators.required),
      pin: new FormControl('', Validators.required),
    })

    this.userDetails = this.data
    this.userService.getSecurityQst().subscribe((result: any)=> {
      this.securityQuestions = result.data
    })
  }

  locckAccount(e) {
    if (e.value == true) {
      this.lock = true
    }else {
      this.lock = false
    }
  }

  submit() {
    let dob = this.utilService.formatDate(this.settingsForm.value.dob)
    const model = {
      dob: dob,
      id: this.userDetails.user._id, 
      secQuestion:{
        key: this.settingsForm.value.secQst, 
        value: this.settingsForm.value.secAns
      }
    }
    if (this.settingsForm.valid) {
      this.isLoading =true;
      this.userService.updateUser(model).subscribe(response => {
        this.utilService.triggerNotification(response.message || 'User details updated successfully');
        this.isLoading = false
        this.close()
      }, (err: any) => {
        this.utilService.triggerNotification(err.message || 'Could not update User details');
        this.isLoading = false
        this.close()
      })
    }
    // else {
    //   this.utilService.triggerNotification('Enter details')
    // }
    
  }

  close(): void {
    this.dialogRef.close();
  }
  

}
