import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';
import { exportConfig, ratingSelectionOptions } from 'src/app/constants/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TicketDetailsComponent } from '../ticket-details/ticket-details.component';
import { TicketSettingsComponent } from '../ticket-settings/ticket-settings.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.scss']
})
export class TicketManagementComponent implements OnInit {

  
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'customerId', 'customerName', 'category', 'status', 'reference', 'createdAt', 'updatedAt'];
  dataSource: any = new MatTableDataSource([]);
  enquiryFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig("pdf", "feedback_table", "Feedback")

  maxDate: Date;
  isLoadingResults = false;
  ratingCode: ISelection[] = ratingSelectionOptions
  feedbackRequestModel: any = {}
  status: any;
  maxall: number = 1000;


  constructor(
    private reportService: ReportService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private utilService: UtilsService,
    private router: Router,
    public dialog: MatDialog,
    private cdref: ChangeDetectorRef
    ) {
    }

  ngOnInit() {

    const currentYear = new Date();
    this.maxDate = new Date(currentYear);

    this.enquiryFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl('',),
      customerName: new FormControl(''),
    });
    this.fetchFeedback(this.feedbackRequestModel)

  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  changeStatus(e) {
    // console.log(e)
    this.status = e
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchFeedback(model: any) {
    this.isLoadingResults = true
    this.reportService.getTickets( model).subscribe(async (response: any) => {
      // console.log(response.data[0].result)
      this.dataSource = await new MatTableDataSource(response.data[0].result);

      this.utilService.changeTab("statusDiv", "status", " active")
      // this.maxall = response.data.meta.total;
      this.isLoadingResults = false
    }, (error: any) => {
      this.isLoadingResults = false
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
    })
  }
  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, status, customerName: fullName } = this.enquiryFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.feedbackRequestModel.startDate = startDate;
    this.feedbackRequestModel.endDate = endDate;
    this.feedbackRequestModel.status = status;
    this.feedbackRequestModel.fullName = fullName;

    this.utilService.deleteKeyIfEmpty(this.feedbackRequestModel)
    this.fetchFeedback(this.feedbackRequestModel)
  }

  filterStatus(status) {
    this.feedbackRequestModel.status = status
    this.fetchFeedback(this.feedbackRequestModel)
  }

  onPageFired(event: any) {
    this.isLoadingResults = true;
    // this.fetchFeedback(event.pageSize, event.pageIndex + 1, this.feedbackRequestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Feedback Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (err) => {
      this.utilService.triggerNotification(err)
    });
  }

  openDialog(ticket) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { ticket };
    const dialogRef = this.dialog.open(TicketDetailsComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.fetchFeedback(this.feedbackRequestModel)

      // if (_ === 'refresh') {
      //   // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }
  
  
  openTicketSettings() {
    this.router.navigate(['app/ticket/settings'])
  }

}
