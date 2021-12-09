import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { TicketActionComponent } from '../ticket-action/ticket-action.component';
import { TicketSettingsComponent } from '../ticket-settings/ticket-settings.component';

@Component({
  selector: 'app-problem-details',
  templateUrl: './problem-details.component.html',
  styleUrls: ['./problem-details.component.scss']
})
export class ProblemDetailsComponent implements OnInit {

  ticketSettingsForm2: FormGroup;
  ticketSettingsForm3: FormGroup;
  isLoadingResults = false;
  problemDetail: any;


  constructor(
    public formBuilder: FormBuilder,
    public utilService: UtilsService,
    private report: ReportService,
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any,


  ) { }

  ngOnInit(): void {
    this.ticketSettingsForm2 = this.formBuilder.group({
      problemTypeId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })

    this.ticketSettingsForm3 = this.formBuilder.group({
      problemTypeId: new FormControl('', Validators.required),
      categoryObj: this.formBuilder.group({
        category: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      })
    })

    // console.log(this.data.ticket)
    this.problemDetail = this.data.ticket
  }

  close() {

  }

  openActionDialog(typeId, ticket, action) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { typeId, ticket, action };
    const dialogRef = this.dialog.open(TicketActionComponent, dialogConfig);
    // console.log(dialogRef)

    // dialogRef.afterClosed().subscribe(_ => {
    //   if (_ === 'refresh') {
    //     // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

    //   }
    // });
  }

  openActionDialog2(ticket, action) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { ticket, action };
    const dialogRef = this.dialog.open(TicketActionComponent, dialogConfig);
    // console.log(dialogRef)

    // dialogRef.afterClosed().subscribe(_ => {
    //   if (_ === 'refresh') {
    //     // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

    //   }
    // });
  }
}
