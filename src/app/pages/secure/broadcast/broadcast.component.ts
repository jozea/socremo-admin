import { AddBroadcastComponent } from './add-broadcast/add-broadcast.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { transactionTypes, transactionStatus, differentAccountTypes, exportConfig } from 'src/app/constants/constant';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BroadcastComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay: string[] = ['position', 'title', 'message', 'action', 'date'];

  dataSource: any = new MatTableDataSource([])
  expandedElement: any;
  allAccountType = differentAccountTypes;

  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'broadcast_table', 'Broadcast Messages ')
  transactionFilterForm: FormGroup;
  maxDate: Date;
  isLoadingResults = false;


  allTransactionType: any[] = transactionTypes
  allStatus: any[] = transactionStatus;
  transactionRequestModel: any = {}
  maxall: number = 1000;
  requestModel = {};

  constructor(
    private agencyService: AgencyService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
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
      title: new FormControl('',),
    });

    this.fetchBroadcastMessages(10,1,this.requestModel)

  }

  fetchBroadcastMessages(
    limit: number, page: number, model: Object,
  ) {
    // this.isLoadingResults = true;
 
  }


  async search() {
    let { startDate, endDate, status, transactionType: type, transactionReference: reference, accountType: source } = this.transactionFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

  }

  onPageFired(event) {
    this.fetchBroadcastMessages(event.pageSize, event.pageIndex + 1, this.transactionRequestModel)
  }



  exportTable(type: any) {
    this.tableContainerHeight = 100000;
    this.isLoadingResults = true;

    this.exportAsConfig.type = type;

    setTimeout(() => this.downloadFile(), 2000)
  }

  downloadFile() {
    this.exportAsService.save(this.exportAsConfig, 'Agents').subscribe((response) => {
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

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = { };
    const dialogRef = this.dialog.open(AddBroadcastComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      this.isLoadingResults = false;
      this.fetchBroadcastMessages(10,1,{})
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  assignTerminal(agent) {
    // console.log(agent)
  }
}
