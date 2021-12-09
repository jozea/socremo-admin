import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TicketActionComponent } from '../ticket-action/ticket-action.component';
import { TicketCommentsComponent } from '../ticket-comments/ticket-comments.component';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {

  isLoading = false;
  isLoadingResults = false;
  settingsForm: FormGroup;

  lock
  yes = true
  no = false
  maxDate: Date;
  securityQuestions: any[]=[];
  userDetails:any;
  ticketDetails: any;
  assignedArr: any[]=[]
  isAssigned: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<TicketDetailsComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public utilService: UtilsService,
    public userService: UserService,
    private report: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {

    const user = JSON.parse(sessionStorage.user);
    let userId = user.user._id
    // console.log(user.user._id)
    this.ticketDetails = this.data.ticket
    this.assignedArr = this.ticketDetails.assigned    
    // console.log(this.ticketDetails)
    if (this.assignedArr.length > 0) {
      this.assignedArr.forEach(e=> {
        if (userId == e.officerId) {
          this.isAssigned = true
        }
      })
    }
    
  }

  getComment(str) {
    let a =  str.replace( '&nbsp;', ' ');
    return str.replace( /(<([^>]+)>)/ig, '') && a.replace( /(<([^>]+)>)/ig, '')
    
  }

  close(): void {
    this.dialogRef.close();
  }

  openTicket() {
    let model = {
      problemTypeId:"6148b065036606c34703ce84", 
      categoryId:"614917651e782e232206712a", 
      additionalInfo:"<p>This is a test <b>additional</b> information</p>"
    }

  }

  assignTicket() {
    let model = {
      ticketId: this.ticketDetails._id
    }
    this.isLoadingResults = true
    this.report.assignTicket(model).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    },error=> {
      this.utilService.triggerNotification(error.message)
      this.isLoadingResults = false
    })

  }

  


  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { ticket: this.ticketDetails };
    const dialogRef = this.dialog.open(TicketCommentsComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.dialogRef.close();

      // if (_ === 'refresh') {
      //   // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }

  openActionDialog2(action) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { ticket: this.ticketDetails, action };
    const dialogRef = this.dialog.open(TicketActionComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.dialogRef.close();
      if (_ === 'refresh') {
        // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      }
    });
  }
  

}
