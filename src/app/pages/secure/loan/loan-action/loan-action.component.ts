import { PermissionService } from 'src/app/services/permission/permission.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoanService } from 'src/app/services/loan/loan.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-loan-action',
  templateUrl: './loan-action.component.html',
  styleUrls: ['./loan-action.component.scss']
})
export class LoanActionComponent implements OnInit {

  detail: any;
  loanActionForm: FormGroup;
  loggedInUserMobileNumber = "";
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<LoanActionComponent>,
    public formBuilder: FormBuilder,
    public permissionService: PermissionService,
    public utilService: UtilsService,
    public loanService: LoanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.loggedInUserMobileNumber = JSON.parse(sessionStorage.getItem('user')).mobileNumber;

    this.detail = this.data;
    this.loanActionForm = this.formBuilder.group({
      amount: new FormControl(''),
      pin: new FormControl(''),
    });
  }

  handleRequest() {

    this.loading = true;
    const model = {
      status: this.detail.type,
      loanId: this.detail.loanId,
      existingAdminMobileNumber: this.loggedInUserMobileNumber,
      pin: this.loanActionForm.value.pin,
    }

    this.loanService.requestStatusUpdate(model).subscribe(response => {
      this.handleSuccessResponse(response)
    }, (error) => {
      this.handleErrorResponse(error);
    })
  }

  approveRequest() {
    this.loading = true;

    const model = {
      status: this.detail.manualLoanUpdate.status,
      loanId: this.detail.loanId,
      existingAdminMobileNumber: this.loggedInUserMobileNumber,
      pin: this.loanActionForm.value.pin,
    };

    this.loanService.approveStatusUpdate(model).subscribe(response => {
      this.handleSuccessResponse(response)
    }, (error) => {
      this.handleErrorResponse(error);
    })
  }

  handleSuccessResponse(response) {
    this.loading = false;
    if (response.status !== true) return this.utilService.triggerNotification("Could not request update");
    this.utilService.triggerNotification("Request sent");
    this.dialogRef.close();
  }

  handleErrorResponse(error) {
    this.loading = false;
    this.utilService.triggerNotification(error.message || "Error occurred. Request could not be processed");
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
