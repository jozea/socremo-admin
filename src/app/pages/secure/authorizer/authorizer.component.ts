import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { genderSelection } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { CorporateService } from 'src/app/services/corporate/corporate.service';
import { MatTableDataSource } from '@angular/material/table';
import { ApprovalComponent } from './approval/approval/approval.component';


@Component({
  selector: 'app-authorizer',
  templateUrl: './authorizer.component.html',
  styleUrls: ['./authorizer.component.scss']
})
export class AuthorizerComponent implements OnInit {

  displayedColumns: string[] = ['position', 'companyName', 'companyAccNumber', 'action',];
  dataSource: any = new MatTableDataSource([]);;
  broadcastMessageForm: FormGroup;
  isLoadingResults = false;
  userNameList: string[] = [];
  isLoading=false
  items: FormArray;
  add = false
  count = 1
  accFirstName:any;
  accLastName: any;
  onBoardDetails = [
    {
      companyName: 'Geosea Effect',
      accLastName: 'joe', 
      companyAccount: '1111111111',
      compAdd: 'josephokere@gmial.com',
      compPhone: '08035368778',
      repInfo: [
        {
          firstname: 'mark',
          lastname: 'john',
          email: 'markjohn@gmail.com',
          phone: '08022222222'
        },
        {
          firstname: 'mark',
          lastname: 'john',
          email: 'markjohn@gmail.com',
          phone: '08022222222'
        }
      ]

    }
  ]


  constructor(
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  openDialog(details) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { details };
    const dialogRef = this.dialog.open(ApprovalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      // if (_ === 'refresh') {
      //   this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }


}
