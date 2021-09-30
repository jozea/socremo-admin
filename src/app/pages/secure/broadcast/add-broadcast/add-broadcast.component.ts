import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { genderSelection } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { PermissionService } from 'src/app/services/permission/permission.service';


@Component({
  selector: 'app-add-broadcast',
  templateUrl: './add-broadcast.component.html',
  styleUrls: ['./add-broadcast.component.scss']
})
export class AddBroadcastComponent implements OnInit {

  broadcastMessageForm: FormGroup;
  isLoadingResults = false;
  userNameList: string[] = [];
  isLoading=false

  constructor(
    public dialogRef: MatDialogRef<AddBroadcastComponent>,
    public formBuilder: FormBuilder,
    public agencyService: AgencyService,
    private utilService: UtilsService,
    private permissionService: PermissionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {

      this.broadcastMessageForm = this.formBuilder.group({
        title: new FormControl('', Validators.required),
        message: new FormControl('', Validators.required),
        recipientType: new FormControl('', Validators.required),
        mobileNumber: new FormControl(''),
        selectedUsers: new FormControl(''),
      });
  }

  showSearchByMobile = false;
  searchingUser = false;


  handleRecipientSelection() {
    if(this.broadcastMessageForm.value.recipientType === 'some') {
      this.showSearchByMobile = true;
    } else {
      this.showSearchByMobile = false;
    }

  }

  token = []
  getUser() {
    this.searchingUser = true
    let model = { mobileNumber: this.broadcastMessageForm.value.mobileNumber }
    this.permissionService.searchUserByMobile(model.mobileNumber).subscribe(result => {
      this.token = result.data
      // console.log([this.token])
      this.searchingUser = false
      if (result.status === true && result.data.length > 0) {
        this.userNameList = result.data
      } else {
        this.utilService.triggerNotification("No result found for this search")      
      }
    }, err => {
      this.utilService.triggerNotification("System couldn't fetch users, please try again later")      
    })
  }

  sendMessage() {
    
    let model= {
      notification: {
        title: this.broadcastMessageForm.value.title,
        body: this.broadcastMessageForm.value.message,
        // mobileNumber: this.broadcastMessageForm.value.mobileNumber
      },
      regToken: this.token
    }
    if (!this.broadcastMessageForm.valid) {
      this.utilService.triggerNotification("Please input data") 
      // this.close()
    }else {
      this.isLoading= true
      if(this.broadcastMessageForm.value.recipientType === 'some') {
        this.permissionService.sendMessageToOne(model).subscribe((res: any)=>{
          if (res.status === true ) {
            this.utilService.triggerNotification("Message sent successfully") 
            this.close()
          }else {
            this.utilService.triggerNotification("Message was not created") 
            this.close()
          }
        }, err => {
          this.utilService.triggerNotification("System couldn't fetch users, please try again later", err) 
          this.close()     
        })
      }else {
        let model2 = {
          notification: {
            title: this.broadcastMessageForm.value.title,
            body: this.broadcastMessageForm.value.message,
          }
        }
        this.permissionService.sendMessageToAll(model2).subscribe((res: any)=>{
          if (res.status === true ) {
            this.utilService.triggerNotification("Message sent successfully") 
            this.close()
          }else {
            this.utilService.triggerNotification("Message was not created") 
            this.close()
          }
        }, err => {
          this.utilService.triggerNotification("System couldn't fetch users, please try again later", err) 
          this.close()     
        })
      }
    }
    
    

  }



  close(): void {
    this.dialogRef.close();
  }

  //sent to all {"notification":{ "title":"", "body":""}, "data":""}
  // send per device {"notification":{ "title":"", "body":""}, "data":"", "fBaseToken":""}



}
