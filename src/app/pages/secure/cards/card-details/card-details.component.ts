
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService } from 'src/app/services/card/card.service';
import { ChequeService } from 'src/app/services/cheque/cheque.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ThirdPartiesComponent } from '../../report/third-parties/third-parties.component';
import { CardActionComponent } from '../card-action/card-action.component';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  isLoading = false;
  isLoadingResults = false;
  settingsForm: FormGroup;

  lock
  yes = true
  no = false
  maxDate: Date;
  securityQuestions: any[]=[];
  userDetails:any;
  cardDetails: any;
  assignedArr: any[]=[]
  isAssigned: boolean = false;
  allAdmin:any;
  adminId: any;
  user: any
  userId: any


  constructor(
    public dialogRef: MatDialogRef<CardDetailsComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public utilService: UtilsService,
    public userService: UserService,
    private permissionService: PermissionService,
    private cardService: CardService,
    private chequeService: ChequeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.user);
    this.userId = this.user.user.customer._id
    // console.log(this.user)
    this.cardDetails = this.data.cheque
    this.assignedArr = this.cardDetails.assigned    
    this.adminId = this.cardDetails.assigned[0].officerId
    // console.log(this.adminId, this.userId, this.cardDetails)

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

  assignCard() {
    this.cardService.assignCard(this.cardDetails._id, this.adminId).subscribe((response: any)=> {
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
    dialogConfig.data = { cheque: this.cardDetails, action };
    const dialogRef = this.dialog.open(CardActionComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.dialogRef.close();
      if (_ === 'refresh') {
        // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      }
    });
  }
  

}
