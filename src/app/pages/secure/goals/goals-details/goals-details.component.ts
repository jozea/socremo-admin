import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils/utils.service';
  
 
@Component({
  selector: 'app-goals-details',
  templateUrl: './goals-details.component.html',
  styleUrls: ['./goals-details.component.scss']
})
export class GoalsDetailsComponent implements OnInit {

  
  
  goalDetails: any;
  adminFullName: any;
  contributionHistory:any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GoalsDetailsComponent>,
    public utilServices: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.adminFullName = JSON.parse(sessionStorage.getItem('user')).fullName;
    this.goalDetails = this.data.goal;
    this.contributionHistory = this.goalDetails.contributionHistory
    // console.log(this.goalDetails)
  }

  close(): void {
    this.dialogRef.close();
  }


}
