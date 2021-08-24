import { LoanActionComponent } from './../loan-action/loan-action.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.scss']
})
export class LoanDetailComponent implements OnInit {

  loanDetail: any;
  adminFullName: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoanDetailComponent>,
    public utilServices: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    // this.adminFullName = JSON.parse(sessionStorage.getItem('user')).fullName;
    this.loanDetail = this.data.loan;
    console.log(this.loanDetail)
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


}
