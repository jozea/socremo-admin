import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-investment-details',
  templateUrl: './investment-details.component.html',
  styleUrls: ['./investment-details.component.scss']
})
export class InvestmentDetailsComponent implements OnInit {
  
  
  investmentDetails: any;
  adminFullName: any;
  contributionHistory:any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<InvestmentDetailsComponent>,
    public utilServices: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.adminFullName = JSON.parse(sessionStorage.getItem('user')).fullName;
    this.investmentDetails = this.data.investment;
    this.contributionHistory = this.investmentDetails.paymentHistory
    // console.log(this.investmentDetails)
  }

  close(): void {
    this.dialogRef.close();
  }


}
