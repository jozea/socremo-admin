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
import { ThirdPartiesComponent } from '../../report/third-parties/third-parties.component';

@Component({
  selector: 'app-loan-card',
  templateUrl: './loan-card.component.html',
  styleUrls: ['./loan-card.component.scss']
})
export class LoanCardComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'userFullname', 'channel', 'cardType', 'bank', 'expMonth', 'expYear', 'last4', 'appDate', 'date'] //,'countryCode', 'termRequested', 'termRecommended'];
  dataSource: any = new MatTableDataSource([]);
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'loan_table', 'Loan')
  loanFilterForm: FormGroup;
  maxDate: Date;
  loading: boolean = true;
  maxall: number = 1000;

  actionSelection = allLoanActions;
  channelSelection = allChannels;
  processSelection = allLoanProcess;

  loanRequestModel: any = {}
  // headingText = "Pending Loans";
  headingText = "Card Loans";
  applicationStatus: string = "pending";

  limit: number = 10;
  page: number = 1;
  currentYear: any;
  currentMonth: any;
  expiryYear: any;
  years: any;
  years2: any;
  months: any;
  months2: any;

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

    this.handleLoanRequest(this.limit, this.page);

    let s = new Date()
    let y = this.utilService.formatDateString(s)
    this.currentYear = y.substring(13,11)
    let x = new Date()
    let z = this.utilService.formatDate(x)
    this.currentMonth = this.utilService.getSubStrings(z, 8)

    this.getCurrentMonth()
  }

  getCurrentMonth() {
    if (this.currentMonth == '01') {
      this.currentMonth = 1
    }if (this.currentMonth == '02') {
      this.currentMonth = 2
    }if (this.currentMonth == '03') {
      this.currentMonth = 3
    }if (this.currentMonth == '04') {
      this.currentMonth = 4
    }if (this.currentMonth == '05') {
      this.currentMonth = 5
    }if (this.currentMonth == '06') {
      this.currentMonth = 6
    }if (this.currentMonth == '07') {
      this.currentMonth = 7
    }if (this.currentMonth == '08') {
      this.currentMonth = 8
    }if (this.currentMonth == '09') {
      this.currentMonth = 9
    }if (this.currentMonth == '10') {
      this.currentMonth = 10
    }if (this.currentMonth == '11') {
      this.currentMonth = 11
    }if (this.currentMonth == '12') {
      this.currentMonth = 12
    }
    return this.currentMonth
  }

  
  getCardMonth(exp) {
    exp.forEach(e => {
      let a = e.expiry
      let b = e.expYear
      let c = e.expMonth
      if (a == undefined) {a = ''}else { a }
      if (b == undefined) {b = ''}else { b }
      if (c == undefined) {c = ''}else { c }
      this.years = this.utilService.getSubStrings(a,3)
      this.years2 = this.utilService.getSubStrings(b,2)
      this.months = this.utilService.getSubString(a, 0,2)
      this.months2 = c
      //utilService.getSubStrings(element.expYear,2)
      // console.log(this.months2)

      if (this.months == '01') {this.months = 1}
      if (this.months == '02') {this.months = 2}
      if (this.months == '03') {this.months = 3}
      if (this.months == '04') {this.months = 4}
      if (this.months == '05') {this.months = 5}
      if (this.months == '06') {this.months = 6}
      if (this.months == '07') {this.months = 7}
      if (this.months == '08') {this.months = 8}
      if (this.months == '09') {this.months = 9}
      if (this.months == '10') {this.months = 10}
      if (this.months == '11') {this.months = 11}
      if (this.months == '12') {this.months = 12}

      if ((this.currentYear > (this.years || this.years2 ))) {
        e.status = 'Expired'
      }else {
        e.status = 'Active'
      }

      // if ((this.currentYear > this.years2) && this.currentMonth > this.months2) {
      //   e.status = 'Expired'
      // }else {
      //   e.status = 'Active'
      // }
      // (this.currentYear > this.years) && this.currentMonth > this.months ? e.status = 'Expired' : e.status = 'Active';
      // (this.currentYear > this.years2) && this.currentMonth > this.months2 ? e.status = 'Expired' : e.status = 'Active';
    });
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

    this.handleLoanRequest(this.limit, this.page);
  
  }


  onPageFired(event) {
    this.loading = true;
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.handleLoanRequest(this.limit, this.page)
  }

  async handleLoanRequest(limit: number, page: number) {
    this.loading = true;
    this.loanService
      .getLoanData2(limit, page).subscribe(async response => {
        // console.log(response.data)
        this.expiryYear = response.data.docs
        this.getCardMonth(this.expiryYear)
        
        
        this.dataSource = new MatTableDataSource(response.data.docs);
        this.maxall = response.data.meta.total;
        this.loading = false;
      }, (error: any) => {
        this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
        this.dataSource = new MatTableDataSource([]);
        this.loading = false;
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
        this.handleLoanRequest(this.limit, this.page)

      }
    });
  }

  tabClick(event: MatTabChangeEvent) {
    this.loading = true;
    switch (event.index) {
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
        this.applicationStatus = "due";
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
      applicationStatus: this.applicationStatus
    }
    this.handleLoanRequest(10, 1);
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



