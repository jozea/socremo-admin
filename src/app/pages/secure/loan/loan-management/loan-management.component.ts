import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { exportConfig, allLoanActions, allLoanProcess, allChannels } from 'src/app/constants/constant';
import { LoanService } from 'src/app/services/loan/loan.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { LoanDetailComponent } from '../loan-detail/loan-detail.component';
import {forkJoin} from 'rxjs';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.scss']
})
export class LoanManagementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['position', 'customerId', 'amount','tenure', 'status', 'reason', 'createdAt', 'updatedAt',]// 'termRecommended', 'creationDate', 'date', 'renew'];
  dataSource: any = new MatTableDataSource([]);
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'loan_table', 'Loan')
  loanFilterForm: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  maxall: number = 1000;
  totalLoans: any;
  pendingLoan: any;
  disbursedLoan: any
  rejectedLoan: any = 0;
  repaidLoan: any = 2;
  expiredLoan: any = 0;
  assignedLoan: any;

  actionSelection = allLoanActions;
  channelSelection = allChannels;
  processSelection = allLoanProcess;

  loanRequestModel: any = {}
  headingText = "Pending Loans";
  status: string = "";

  limit: number = 10;
  page: number = 1;
  count
  totalCount
  countRequest
  renewals = []
  renewalMeta
  isRenewal: boolean = false;
  renewalLoans: any;

  constructor(
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private loanService: LoanService,
    private utilService: UtilsService,
    public dialog: MatDialog

  ) { }

  // 
  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);

    this.loanFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      channel: new FormControl(''),
      actionBy: new FormControl(''),
      process: new FormControl(''),
      mobileNumber: new FormControl(''),
      minAmount: new FormControl(''),
      maxAmount: new FormControl(''),
      customerName: new FormControl(''),
      loanID: new FormControl(''),
    });

    this.loanRequestModel = {
      // status: this.status
    }

    this.countRequest = {}

    this.handleLoanRequest(this.limit, this.page, this.loanRequestModel);
    // this.totalLoan(this.limit, this.page, this.countRequest)


  }

  async search() {
    this.loading = true;
    let { startDate, endDate, channel, actionBy, process, mobileNumber, minAmount, maxAmount, customerName, loanID } = this.loanFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.loanRequestModel.startDate = startDate;
    this.loanRequestModel.endDate = endDate;
    this.loanRequestModel.channel = channel;
    this.loanRequestModel.actionBy = actionBy;
    this.loanRequestModel.process = process;
    this.loanRequestModel.mobileNumber = mobileNumber;
    this.loanRequestModel.minAmount = minAmount;
    this.loanRequestModel.maxAmount = maxAmount;
    this.loanRequestModel.customerName = customerName;
    this.loanRequestModel.loanID = loanID;

    this.handleLoanRequest(this.limit, this.page, this.loanRequestModel);
  
  }


  onPageFired(event) {
    this.loading = true;
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)
    this.totalLoan(this.limit, this.page, this.countRequest)
    // this.getRenewals(this.limit, this.page, this.countRequest);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  total:any
  async handleLoanRequest(limit: number, page: number, model: any) {
    this.loading = true;
    this.totalLoans = 0;this.pendingLoan = 0;this.disbursedLoan = 0;this.assignedLoan = 0
    this.loanService
      .getLoanHistory(limit, page, model).subscribe(async response => {
        // console.log(response)
        // console.log(response.data.result)
        this.total = response.data.total
        if (model.status === 'pending') {
          this.pendingLoan = this.total
        }else if (model.status === 'disbursed') {
          this.disbursedLoan = this.total
        }else if (model.status === 'assigned') {
          this.assignedLoan = this.total
        }else {
          this.totalLoans = this.total
        }
        this.dataSource = new MatTableDataSource(response.data.result);
        this.maxall = response.data.total;
        this.loading = false;
      }, (error: any) => {
        this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
        this.dataSource = new MatTableDataSource([]);
        this.loading = false;
      })
  }

  async totalLoan(limit: number, page: number, model: any) {
    this.loanService.totalLoan(limit, page, model).subscribe(async resp =>{
      this.totalCount = resp.data.meta.total
    })
  }



  openDialog(loan) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { loan };
    const dialogRef = this.dialog.open(LoanDetailComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      if (_ === 'refresh') {
        this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      }
    });
  }

  tabClick(event: MatTabChangeEvent) {
    this.loading = true;
    switch (event.index) {
      case 0:
        this.headingText = "All Loans";
        this.status = "";
        break;
      case 1:
        this.headingText = "Pending Loans";
        this.status = "pending";
        break;
      case 2:
        this.headingText = "Disbursed Loans";
        this.status = "disbursed";
        break;
      case 3:
        this.headingText = "Assigned Loans";
        this.status = "assigned";
        break;
      default:
        this.headingText = "Loans";
        this.status = "successful";
        break;
    }
    this.loanFilterForm.reset({
      startDate: "",
      endDate: "",
      channel: "",
      actionBy: "",
      process: "",
      mobileNumber: "",
      minAmount: "",
      maxAmount: "",
      customerName: "",
      loanID: "",
    });
    if (this.headingText === "All Loans") {
      // this.utilService.deleteKeyIfEmpty(this.loanRequestModel)
      this.loanRequestModel = {}
    }else {
      this.loanRequestModel = {
        status: this.status,
      }
    }
    // console.log(this.loanRequestModel)
    this.handleLoanRequest(10, 1, this.loanRequestModel);
    this.dataSource.paginator = this.paginator;
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Loans').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (err) => {
      // console.log(err)
      this.utilService.triggerNotification(err)
    });
  }

}
