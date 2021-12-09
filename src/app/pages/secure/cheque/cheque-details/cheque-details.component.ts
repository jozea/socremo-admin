
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChequeService } from 'src/app/services/cheque/cheque.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ThirdPartiesComponent } from '../../report/third-parties/third-parties.component';
import { ChequeActionComponent } from '../cheque-action/cheque-action.component';
import { ChequeManagementComponent } from '../cheque-management/cheque-management.component';
// import { TicketActionComponent } from '../ticket-action/ticket-action.component';
// import { TicketCommentsComponent } from '../ticket-comments/ticket-comments.component';

@Component({
  selector: 'app-cheque-details',
  templateUrl: './cheque-details.component.html',
  styleUrls: ['./cheque-details.component.scss']
})
export class ChequeDetailsComponent implements OnInit {

  isLoading = false;
  isLoadingResults = false;
  settingsForm: FormGroup;

  lock
  yes = true
  no = false
  maxDate: Date;
  securityQuestions: any[]=[];
  userDetails:any;
  chequeDetail: any;
  assignedArr: any[]=[]
  isAssigned: boolean = false;
  allAdmin:any;
  adminId: any;
  user: any
  userId: any


  constructor(
    public dialogRef: MatDialogRef<ChequeDetailsComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public utilService: UtilsService,
    public userService: UserService,
    private permissionService: PermissionService,
    private chequeService: ChequeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.user);
    this.userId = this.user.user.customer._id
    // console.log(this.user)
    this.chequeDetail = this.data.cheque
    this.assignedArr = this.chequeDetail.assigned    
    this.adminId = this.chequeDetail.assigned[0].officerId
    // console.log(this.adminId, this.userId, this.chequeDetail)

    // if (this.assignedArr.length > 0) {
    //   this.assignedArr.forEach(e=> {
    //     if (userId == e.officerId) {
    //       this.isAssigned = true
    //     }
    //   })
    // }
    this.fetchAdmins()
    
  }



  getComment(str) {
    let a =  str.replace( '&nbsp;', ' ');
    return str.replace( /(<([^>]+)>)/ig, '') && a.replace( /(<([^>]+)>)/ig, '')
  }

  close(): void {
    this.dialogRef.close();
  }

  fetchAdmins() {
    this.permissionService.fetchAdmins().subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.allAdmin = response.data.result
      }
    })
  }

  changeAdmin(event) {
    // console.log(event)
    this.allAdmin.forEach(e => {
      if (e.name == event) {
        this.adminId =e._id
      }
    });

  }

  assignChequeBook() {
    this.isLoadingResults = true
    this.chequeService.assignCheckBook(this.chequeDetail._id, this.adminId).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
        this.close()
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    },error=> {
      this.utilService.triggerNotification(error.message)
      this.isLoadingResults = false
    })
  }


  openActionDialog2(action) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { cheque: this.chequeDetail, action };
    const dialogRef = this.dialog.open(ChequeActionComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.dialogRef.close();
      if (_ === 'refresh') {
        // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      }
    });
  }
  

}
