import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { transactionTypes, transactionStatus, differentAccountTypes, exportConfig } from 'src/app/constants/constant';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-central-purse',
  templateUrl: './central-purse.component.html',
  styleUrls: ['./central-purse.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CentralPurseComponent implements OnInit, AfterViewInit {

 
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay: string[] = ['position', 'transactionType', 'transactionId', 'amount', 'accion', 'rubik', 'balanceBefore', 'balanceAfter', 'reason', 'date'];

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
    private transactionService: TransactionService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private utilService: UtilsService

  ) {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
  }

  tableContainerHeight: any = 500;


  ngOnInit() {
    this.transactionFilterForm = this.formBuilder.group({
      startDate: new FormControl('', Validators.compose([Validators.minLength(10)])),
      endDate: new FormControl('', Validators.compose([Validators.minLength(10)])),
      status: new FormControl('',),
      accountType: new FormControl('',),
      transactionType: new FormControl('',),
      transactionReference: new FormControl('', Validators.minLength(9)),
    });

  }

  fetchAllTransaction(
    limit: number, page: number, model: Object,
  ) {
    this.isLoadingResults = true;
    this.transactionService.getAllTransactions(limit, page, model)
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
