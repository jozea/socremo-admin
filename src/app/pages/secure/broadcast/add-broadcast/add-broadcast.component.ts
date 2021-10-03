import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { genderSelection } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { PermissionService } from 'src/app/services/permission/permission.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { constructorParametersDownlevelTransform } from '@angular/compiler-cli';


@Component({
  selector: 'app-add-broadcast',
  templateUrl: './add-broadcast.component.html',
  styleUrls: ['./add-broadcast.component.scss']
})
export class AddBroadcastComponent implements OnInit {

  public Editor = ClassicEditor;
  public comment = '<p></p>';

  broadcastMessageForm: FormGroup;
  isLoadingResults = false;
  userNameList: string[] = [];
  isLoading=false
  single: any;
  all:any;
  mobileNumber: any;

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
      message: new FormControl('<p></p>', Validators.required),
      recipientType: new FormControl('', Validators.required),
      mobileNumber: new FormControl(''),
      selectedUsers: new FormControl(''),
    });
    console.log(this.data)
    this.single = this.data.user
    this.all = this.data.all 
    this.mobileNumber = this.data.mobileNumber
  }

  showSearchByMobile = false;
  searchingUser = false;


  handleRecipientSelection() {
    if(this.broadcastMessageForm.value.recipientType === 'some') {
      this.showSearchByMobile = true;
      this.broadcastMessageForm.value.mobileNumber = this.mobileNumber
    } else {
      this.showSearchByMobile = false;
    }

  }

  resetDropdown() {
    this.broadcastMessageForm.reset({
      recipientType: "",
      mobileNumber: "",
    });
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
      console.log(err)
      this.utilService.triggerNotification(err.message)   
      // this.utilService.triggerNotification("System couldn't fetch users, please try again later")   
      this.searchingUser = false   
    })
  }

  sendMessage() {
    this.broadcastMessageForm.value.message = this.comment
    console.log(this.broadcastMessageForm.value)
    
    let model= {
      notification: {
        title: this.broadcastMessageForm.value.title,
        body: this.broadcastMessageForm.value.message,
      },
      data:"", 
      fBaseToken:""
      // regToken: this.token
    }
    if (!this.broadcastMessageForm.valid) {
      this.utilService.triggerNotification("Please input data") 
      // this.close()
    }else {
      this.isLoading= true
      if(this.broadcastMessageForm.value.recipientType === 'some') {
        this.permissionService.sendMessageToOne(model).subscribe((res: any)=>{
          if (res.status === true ) {
            this.utilService.triggerNotification(res.message) 
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
          },
          data:""
        }
        this.permissionService.sendMessageToAll(model2).subscribe((res: any)=>{
          if (res.status === true ) {
            this.utilService.triggerNotification(res.message) 
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
  // send per device {"notification":{ "title":"", "body":""}, "data":"", "fBaseToken":""}614c10f3a1110a7c785e7155



}
