import { ReceiptComponent } from './receipt/receipt.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { transactionTypes, transactionStatus, differentAccountTypes, exportConfig } from 'src/app/constants/constant';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-agency-transaction',
  templateUrl: './agency-transaction.component.html',
  styleUrls: ['./agency-transaction.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AgencyTransactionComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay: string[] = ['position', 'name', 'transactionId', 'type', 'status', 'channel', 'amount', 'state', 'charge', 'fees', 'accion', 'rubik', 'stamp', 'RRN', 'STAN', 'authCode', 'date', 'beneficiaryName', 'beneficiaryMobile', 'beneficiaryAccountName', 'beneficiaryAccountNumber', 'balanceBefore', 'balanceAfter', 'action'];

  dataSource: any = new MatTableDataSource([])
  expandedElement: any;
  allAccountType = differentAccountTypes;

  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'transaction_table', 'Transactions')
  transactionFilterForm: FormGroup;
  maxDate: Date;
  isLoadingResults = false;


  allTransactionType: any[] = transactionTypes
  allStatus: any[] = transactionStatus;
  transactionRequestModel: any = {}
  maxall: number = 1000;

  constructor(
    private agencyService: AgencyService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private exportAsService: ExportAsService,
    private utilService: UtilsService

  ) {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
  }

  tableContainerHeight: any = 500;

  viewReceipt(detail: any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '50vw';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = { detail };

    const dialogRef = this.dialog.open(ReceiptComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      // this.isLoadingResults = true;
      // this.fetchReport()
    });




  }


  ngOnInit() {
    this.transactionFilterForm = this.formBuilder.group({
      startDate: new FormControl('', Validators.compose([Validators.minLength(10)])),
      endDate: new FormControl('', Validators.compose([Validators.minLength(10)])),
      status: new FormControl('',),
      accountType: new FormControl('',),
      transactionType: new FormControl('',),
      transactionReference: new FormControl('', Validators.minLength(9)),
    });

    this.fetchAllTransaction(10,1,{})

  }

  fetchAllTransaction(
    limit: number, page: number, model: Object,
  ) {
    this.isLoadingResults = true;
    this.agencyService.fetchAgentTransactions(limit, page, model)
      .subscribe(async (response: any) => {
        this.dataSource = new MatTableDataSource(response.data.docs);
        this.maxall = response.data.meta.total;
        this.isLoadingResults = false;
      }, (error: any) => {
        this.isLoadingResults = false;
        this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
        this.dataSource = new MatTableDataSource([]);
      })
  }



  async search() {
    let { startDate, endDate, status, transactionType: type, transactionReference: reference, accountType: source } = this.transactionFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.transactionRequestModel.startDate = startDate;
    this.transactionRequestModel.endDate = endDate;
    this.transactionRequestModel.status = status;
    this.transactionRequestModel.type = type;
    this.transactionRequestModel.source = source;
    this.transactionRequestModel.reference = reference;

    await this.fetchAllTransaction(10, 1, this.transactionRequestModel)
  }

  onPageFired(event) {
    this.fetchAllTransaction(event.pageSize, event.pageIndex + 1, this.transactionRequestModel)
  }



  exportTable(type: any) {
    this.tableContainerHeight = 100000;
    this.isLoadingResults = true;

    this.exportAsConfig.type = type;

    setTimeout(() => this.downloadFile(), 2000)
  }

  downloadFile() {
    this.exportAsService.save(this.exportAsConfig, 'Accion Transactions').subscribe((response) => {
      // save started
      setTimeout(() => {
        this.tableContainerHeight = 500;
        this.isLoadingResults = false;
      }, 3000)


    }, (err) => {
      // console.log(err)
      this.tableContainerHeight = 500;
      this.isLoadingResults = false;
      this.utilService.triggerNotification(err)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


}
