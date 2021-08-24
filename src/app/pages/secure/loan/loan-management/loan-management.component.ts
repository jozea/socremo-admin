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

@Component({
  selector: 'app-loan-management',
  templateUrl: './loan-management.component.html',
  styleUrls: ['./loan-management.component.scss']
})
export class LoanManagementComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'name', 'phoneNumber','action', 'status', 'amountRequested', 'amountRecommended', 'termRequested',]// 'termRecommended', 'creationDate', 'date', 'renew'];
  dataSource: any = new MatTableDataSource([]);
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'loan_table', 'Loan')
  loanFilterForm: FormGroup;
  maxDate: Date;
  loading: boolean = false;
  maxall: number = 1000;
  totalLoans: any = 6;
  pendingLoan: any = 2;
  disbursedLoan: any = 2;
  rejectedLoan: any = 0;
  repaidLoan: any = 2;
  expiredLoan: any = 0;

  loanData: any[]=[
    // {customerName: "Joseph",	mobileNumber: "1234567",	action: "John", applicationStatus: "pending",	requestedAmount: "100,000",	recommendedAmount: "100,000",	requestedTenure: "2 Months",	applicationDate: "2021-02-07"},
    // {customerName: "Joseph",	mobileNumber: "1234567",	action: "John", applicationStatus: "pending",	requestedAmount: "100,000",	recommendedAmount: "100,000",	requestedTenure: "2 Months",	applicationDate: "2021-02-07"},
    // {customerName: "Joseph",	mobileNumber: "1234567",	action: "John", applicationStatus: "disbursed",	requestedAmount: "100,000",	recommendedAmount: "100,000",	requestedTenure: "2 Months",	applicationDate: "2021-02-07"},
    // {customerName: "Joseph",	mobileNumber: "1234567",	action: "John", applicationStatus: "disbursed",	requestedAmount: "100,000",	recommendedAmount: "100,000",	requestedTenure: "2 Months",	applicationDate: "2021-02-07"},
    // {customerName: "Joseph",	mobileNumber: "1234567",	action: "John", applicationStatus: "repaid",	requestedAmount: "100,000",	recommendedAmount: "100,000",	requestedTenure: "2 Months",	applicationDate: "2021-02-07"},
    // {customerName: "Joseph",	mobileNumber: "1234567",	action: "John", applicationStatus: "repaid",	requestedAmount: "100,000",	recommendedAmount: "100,000",	requestedTenure: "2 Months",	applicationDate: "2021-02-07"}

  ]

  actionSelection = allLoanActions;
  channelSelection = allChannels;
  processSelection = allLoanProcess;

  loanRequestModel: any = {}
  headingText = "Pending Loans";
  applicationStatus: string = "pending";

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
      applicationStatus: this.applicationStatus
    }

    this.countRequest = {}

    // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel);
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

  renewalButton() {
    // delete this.loanRequestModel.applicationStatus
    // this.loanRequestModel.isRenewal = true
    // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)
    this.renewals
    this.dataSource = new MatTableDataSource(this.renewals);
    this.maxall = this.renewalMeta.meta.total;
    this.loading = false;
  }

  getRenewals(response) {
    this.loading = true;
    let renewalData = response.data.docs
    this.renewalMeta = response.data
    if (renewalData.length !== 0) {
      renewalData.forEach(e => {
        if (e.isRenewal) {
          this.renewals.push(e)
          this.loading = false;
          // console.log('there is renewal')
          // console.log(this.renewals)
        }else {
          // console.log('no renewal')
          this.loading = false;
        }
      });
    }else {
      // console.log('no value')
      this.loading = false;
    }
    // console.log(this.renewals.length)
    this.renewalLoans = this.renewals.length
  }

  async handleLoanRequest(limit: number, page: number, model: any) {
    this.loading = true;
    this.loanService
      .getLoanData(limit, page, model).subscribe(async response => {
        // console.log(response)
        this.getRenewals(response)
        this.count = response.data.meta.total
        this.dataSource = new MatTableDataSource(response.data.docs);
        this.maxall = response.data.meta.total;
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
      // case 0:
      //   this.headingText = "All Loans";
      //   this.applicationStatus = "";
      //   break;
      case 0:
        this.headingText = "Pending Loans";
        this.applicationStatus = "pending";
        break;
      case 1:
        this.headingText = "Disbursed Loans";
        this.applicationStatus = "disbursed";
        break;
      case 2:
        this.headingText = "Past Due Loan";
        this.applicationStatus = "past-due";
        break;
      case 3:
        this.headingText = "Rejected Loans";
        this.applicationStatus = "rejected";
        break;
      case 4:
        this.headingText = "Repaid Loans";
        this.applicationStatus = "repaid";
        break;
      case 5:
        this.headingText = "Drop-offs";
        this.applicationStatus = "inProgress";
        break;
      case 6:
        this.headingText = "Expired Loans";
        this.applicationStatus = "expired";
        break;
      case 7:
        this.headingText = "Renewals";
        this.isRenewal = true;
        break;
      default:
        this.headingText = "Loans";
        this.applicationStatus = "successful";
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
    this.loanRequestModel = {
      applicationStatus: this.applicationStatus,
      // isRenewal: this.isRenewal 
    }
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
