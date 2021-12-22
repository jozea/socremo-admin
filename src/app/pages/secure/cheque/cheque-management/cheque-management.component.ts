import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ChequeService } from 'src/app/services/cheque/cheque.service';




import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';
import { exportConfig, ratingSelectionOptions } from 'src/app/constants/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDetailsComponent } from '../../cards/card-details/card-details.component';
import { ChequeDetailsComponent } from '../cheque-details/cheque-details.component';

@Component({
  selector: 'app-cheque-management',
  templateUrl: './cheque-management.component.html',
  styleUrls: ['./cheque-management.component.scss']
})
export class ChequeManagementComponent implements OnInit {


   
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'customerId', 'customerName', 'category', 'status', 'reference', 'createdAt', 'updatedAt'];
  dataSource: any = new MatTableDataSource([]);
  enquiryFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig("pdf", "feedback_table", "Feedback")

  maxDate: Date;
  isLoadingResults = false;
  ratingCode: ISelection[] = ratingSelectionOptions
  chequeRequestModel: any = {}
  status: any;
  maxall: number = 1000;
  userId: any;
  userArray: any[]=[];

  constructor(
    private chequeService: ChequeService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private utilService: UtilsService,
    private router: Router,
    public dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.userId)

    const currentYear = new Date();
    this.maxDate = new Date(currentYear);

    this.enquiryFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl('',),
      customerName: new FormControl(''),
    });
    // this.fetchFeedback(this.chequeRequestModel)


    this.fetchCheckBooks(this.chequeRequestModel)
  }

  fetchCheckBooks(model: any) {
    this.isLoadingResults = true
    this.chequeService.fetchCheckBooks(model).subscribe(async (response:any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.changeTab("statusDiv", "status", " active")
        this.dataSource = await new MatTableDataSource(response.data.result);
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    },err=> {
      this.utilService.triggerNotification('Something went wrong')
      this.isLoadingResults = false
    })

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

  // fetchFeedback(model: any) {
  //   this.isLoadingResults = true
  //   this.reportService.getTickets( model).subscribe(async (response: any) => {
  //     console.log(response.data.result)

  //     this.utilService.changeTab("statusDiv", "status", " active")
  //     // this.maxall = response.data.meta.total;
  //     response.data.result.forEach(async (e) => {
  //       if (e.customerId == this.userId) {
  //         this.userArray.push(e)
  //         this.dataSource = await new MatTableDataSource(this.userArray);
  //       }else {
  //         this.dataSource = await new MatTableDataSource(response.data.result);
  //       }
  //     });
  //     this.isLoadingResults = false
  //   }, (error: any) => {
  //     this.isLoadingResults = false
  //     this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
  //   })
  // }
  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, status, customerName: fullName } = this.enquiryFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.chequeRequestModel.startDate = startDate;
    this.chequeRequestModel.endDate = endDate;
    this.chequeRequestModel.status = status;
    this.chequeRequestModel.fullName = fullName;

    this.utilService.deleteKeyIfEmpty(this.chequeRequestModel)
    this.fetchCheckBooks(this.chequeRequestModel)
  }

  filterStatus(status) {
    this.chequeRequestModel.status = status
    this.fetchCheckBooks(this.chequeRequestModel)
  }

  onPageFired(event: any) {
    this.isLoadingResults = true;
    // this.fetchFeedback(event.pageSize, event.pageIndex + 1, this.chequeRequestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Feedback Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (err) => {
      this.utilService.triggerNotification(err)
    });
  }

  openDialog(cheque) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { cheque };
    const dialogRef = this.dialog.open(ChequeDetailsComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.fetchCheckBooks(this.chequeRequestModel)

      // if (_ === 'refresh') {
      //   // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }
  
  
  openTicketSettings() {
    this.router.navigate(['app/ticket/settings'])
  }

}
