import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { exportConfig, allLoanActions, allLoanProcess, allChannels } from 'src/app/constants/constant';
import { InvestmentService } from 'src/app/services/investment/investment.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { LoanDetailComponent } from '../../loan/loan-detail/loan-detail.component';
import {forkJoin} from 'rxjs';
import { CorporateService } from 'src/app/services/corporate/corporate.service';


@Component({
  selector: 'app-corporate-investment',
  templateUrl: './corporate-investment.component.html',
  styleUrls: ['./corporate-investment.component.scss']
})
export class CorporateInvestmentComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'fullName', 'investmentType', 'channel', 'mobileNumber', 'numberOfDays', 'status','principal', 'WHT10Percent', 'expectedAmount', 'createdAt', 'updatedAt']//, 'termRecommended', 'date'];
  dataSource: any = new MatTableDataSource([]);
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'loan_table', 'Loan')
  loanFilterForm: FormGroup;
  maxDate: Date;
  loading: boolean = true;
  maxall: number = 1000;

  actionSelection = allLoanActions;
  channelSelection = allChannels;
  processSelection = allLoanProcess;

  investmentRequestModel: any = {}
  headingText = "Active Investments";
  status: string = "active";

  limit: number = 10;
  page: number = 1;
  userId: any;

  constructor(
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private investmentService: InvestmentService,
    private utilService: UtilsService,
    private corporateService: CorporateService,
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

    this.investmentRequestModel = {
      status: this.status
    }

    let userData = JSON.parse(sessionStorage.user)
    this.userId = userData._id

    this.handleLoanRequest( this.investmentRequestModel);

  }

  async search() {
    this.loading = true;
    let { startDate, endDate, channel, actionBy, process, mobileNumber, minAmount, maxAmount, customerName, loanID } = this.loanFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.investmentRequestModel.startDate = startDate;
    this.investmentRequestModel.endDate = endDate;
    this.investmentRequestModel.channel = channel;
    this.investmentRequestModel.actionBy = actionBy;
    this.investmentRequestModel.process = process;
    this.investmentRequestModel.mobileNumber = mobileNumber;
    this.investmentRequestModel.minAmount = minAmount;
    this.investmentRequestModel.maxAmount = maxAmount;
    this.investmentRequestModel.customerName = customerName;
    this.investmentRequestModel.loanID = loanID;

    this.handleLoanRequest(this.investmentRequestModel);
  
  }


  onPageFired(event) {
    this.loading = true;
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.handleLoanRequest( this.investmentRequestModel)
  }

  handleLoanRequest( model: any) {
    this.investmentRequestModel.initiatorId = this.userId
    let param = {
      initiatorId: this.userId, 
      // status: 'pending', 
      // startDate: "2021-07-03T10:20:11.981Z"
    }
    this.loading = true;
    this.corporateService
      .listInvestments(model).then((response: any) => {
        // console.log(response.data)
        this.dataSource = new MatTableDataSource(response.data.docs);
        this.maxall = response.data.meta.total;
        this.loading = false;
      }).catch(error=> {
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
        this.handleLoanRequest(this.investmentRequestModel)

      }
    });
  }

  tabClick(event: MatTabChangeEvent) {
    this.loading = true;
    switch (event.index) {
      case 0:
        this.headingText = "Active Investments";
        this.status = "active";
        break;
      case 1:
        this.headingText = "Completed Investments";
        this.status = "completed";
        break;
      case 2:
        this.headingText = "Terminated Investment";
        this.status = "terminated";
        break;
      default:
        this.headingText = "Investment";
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
    this.investmentRequestModel = {
      status: this.status
    }
    this.handleLoanRequest( this.investmentRequestModel);
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
