import { LoanActionComponent } from './../loan-action/loan-action.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ThirdPartiesComponent } from '../../report/third-parties/third-parties.component';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {

  loanDetail: any;
  adminFullName: any;
  allAdmin: any
  adminId: any
  isLoading: boolean = false
  user: any

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoanDetailComponent>,
    public utilServices: UtilsService,
    private permissionService: PermissionService,
    private loanService: LoanService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user')).user.customer;
    // console.log(this.user)
    this.loanDetail = this.data.loan;
    // console.log(this.loanDetail)
    this.getAdmin()
  }

  close(): void {
    this.dialogRef.close();
  }

  loanAction(type) {
    if(type === 'approve' && this.loanDetail.manualLoanUpdate.maker === this.adminFullName){
      this.utilServices.triggerNotification('Maker cannot approve loan request');
      return;
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = 'auto';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = { 
      type, 
      recommended: this.loanDetail.recommended, 
      user: this.loanDetail.userRequest, 
      loanId: this.loanDetail._id, 
      manualLoanUpdate: this.loanDetail.manualLoanUpdate 
    };
    const dialogRef = this.dialog.open(LoanActionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      this.dialogRef.close('refresh');
    })

  }

  getAdmin() {
    this.permissionService.fetchAdmins().subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.allAdmin = response.data.result
      }
    })
  }

  changeRole(event) {
    // console.log(event)
    this.allAdmin.forEach(e => {
      if (e.name == event) {
        this.adminId =e._id
      }
    });

  }

  assignLoan() {
    this.isLoading = true
    this.loanService.assignLoan(this.loanDetail._id,this.adminId).subscribe((response: any)=> {
      if(response.status == true) {
        this.utilServices.triggerNotification(response.message)
        this.isLoading = false
        this.close()
      }
    }, err=> {
      this.utilServices.triggerNotification(err.message);
      this.isLoading = false
    })
  }

  updateLoanStatus() {
    this.adminId = this.user._id
    let model = {
      status:"disbursed", 
      loanId: this.loanDetail._id, 
      adminId: this.adminId
    }

    if (this.loanDetail.assigned[0] !== undefined) {
      if (this.adminId == this.loanDetail.assigned[0]._id) {
        this.isLoading =true
        this.loanService.updateLoanStatus(model).subscribe((response: any)=> {
          if(response.status == true) {
            this.utilServices.triggerNotification(response.message)
            this.isLoading = false
            this.close()
          }
        }, err=> {
          this.utilServices.triggerNotification(err.error.message);
          this.isLoading = false
        })
      }
    }

  }


}
