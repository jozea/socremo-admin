import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
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

    this.ticketDetails = this.data.ticket
    console.log(this.ticketDetails)
    
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
      console.log(response)
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

  closeTicket() {
    let model = {
      ticketId: this.ticketDetails._id
    }
    this.isLoadingResults = true
    this.report.closeTicket(model).subscribe((response: any)=> {
      console.log(response)
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


  openDialog(ticket) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { ticket };
    const dialogRef = this.dialog.open(TicketCommentsComponent, dialogConfig);
    // console.log(dialogRef)

    // dialogRef.afterClosed().subscribe(_ => {
    //   if (_ === 'refresh') {
    //     // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

    //   }
    // });
  }
  

}
