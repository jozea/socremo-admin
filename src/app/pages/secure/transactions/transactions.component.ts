import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { transactionTypes, transactionStatus, differentAccountTypes, exportConfig } from 'src/app/constants/constant';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransactionsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columnsToDisplay: string[] = ['position', 'name', 'transactionId', 'reference', 'type', 'status', 'amount']//, 'state', 'charge', 'fees', 'accion', 'rubik', 'date', 'beneficiaryName', 'beneficiaryMobile', 'beneficiaryAccountNumber', 'balanceBefore', 'balanceAfter', 'message', 'serviceID', 'beneficiary', 'createdAt', 'updatedAt', 'isCredit'];

  dataSourceUnSorted: any = [];
  dataSource: any = [];
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
    private utilService: UtilsService,
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
      customerName: new FormControl('',),
      minAmount: new FormControl('',),
      maxAmount: new FormControl('',),
      accountNumber: new FormControl('',),
      transactionReference: new FormControl('', Validators.minLength(9)),
    });
    // this.fetchAllTransaction(10, 1, this.transactionRequestModel);
  }

  fetchAllTransaction(
    limit: number, page: number, model: Object,
  ) {
    this.isLoadingResults = true;
    this.transactionService.getAllTransactions(limit, page, model)
      .subscribe(async (response: any) => {
        // console.log(response)
        this.dataSourceUnSorted = response.data.docs;
        this.dataSource = await new MatTableDataSource(response.data.docs);
        this.maxall = response.data.meta.total;
        this.isLoadingResults = false;
      }, (error: any) => {
        this.isLoadingResults = false;
        this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
        this.dataSource = new MatTableDataSource([]);
      })
  }



  async search() {
    let { startDate, endDate, status, transactionType: type, transactionReference: reference, accountType: source,
    customerName, accountNumber, minAmount, maxAmount
    } = this.transactionFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.transactionRequestModel.startDate = startDate;
    this.transactionRequestModel.endDate = endDate;
    this.transactionRequestModel.status = status;
    this.transactionRequestModel.type = type;
    this.transactionRequestModel.source = source;
    this.transactionRequestModel.reference = reference;
    this.transactionRequestModel.customerName = customerName;
    this.transactionRequestModel.accountNumber = accountNumber;
    this.transactionRequestModel.minAmount = minAmount;
    this.transactionRequestModel.maxAmount = maxAmount;

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
    this.dataSource.sort = this.sort;
  }

  sortData(sort: Sort) {
    const data = this.dataSourceUnSorted;
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name': return compare(a.sender.fullName, b.sender.fullName, isAsc);
        case 'amount': return compare(a.amount, b.amount, isAsc);
        case 'provider': return compare(a.provider, b.provider, isAsc);
        case 'reference': return compare(a.reference, b.reference, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}