import { PermissionService } from 'src/app/services/permission/permission.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { agentTransactionTypes, differentRangeTypes } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';


@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.scss']
})
export class UpdateAdminComponent implements OnInit {

  details: any;
  userUpdateForm: FormGroup;
  allRolesOption: any[] = [{ role: 'user' }]
  approvalOptions: ISelection[] = [
    { name: "Approval", value: "approved", },
    { name: "Decline", value: "rejected", }
  ]
  constructor(
    public dialogRef: MatDialogRef<UpdateAdminComponent>,
    public formBuilder: FormBuilder,
    public permissionService: PermissionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }



  ngOnInit() {
    this.details = this.data.detail;
    this.allRolesOption = this.allRolesOption.concat(this.data.roles)
    this.userUpdateForm = this.formBuilder.group({
      role: new FormControl(''),
      decision: new FormControl(''),
      reason: new FormControl(''),
    });
  }

  processUserRole() {
    const { mobileNumber } = JSON.parse(sessionStorage.getItem('user'));
    const { role, decision, reason } = this.userUpdateForm.value

    if (this.details.admin.status === 'pending') {
      const model = {
        existingAdminMobileNumber: mobileNumber,
        status: decision,
        mobileNumber: this.details.mobileNumber,
      }
      this.permissionService.approveUser(model).subscribe(response => {
        this.dialogRef.close();
      })
    } else if(this.details.admin.status === 'approved') {
      // change the role
      const model = {
        existingAdminMobileNumber: mobileNumber,
        role: role,
        mobileNumber: this.details.mobileNumber,
        updateAll: true,
      }
      this.permissionService.userReg(model).subscribe((data: any) => {
        this.dialogRef.close(); 
      })
    } else if (this.details.admin.status === 'rejected') {
      // submit a new request
      const model = {
        existingAdminMobileNumber: mobileNumber,
        role: role,
        mobileNumber: this.details.mobileNumber,
        updateAll: true,
      }
      this.permissionService.userReg(model).subscribe((data: any) => {
        this.dialogRef.close(); 
      })
    } else {
      // console.log('How did you get here nigga')
    }



  }



  close(): void {
    this.dialogRef.close();
  }

}
