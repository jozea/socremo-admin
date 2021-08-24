import { AssignTerminalComponent } from './assign-terminal/assign-terminal.component';
import { AddAgentComponent } from './add-agent/add-agent.component';
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
  selector: 'app-agency-agents',
  templateUrl: './agency-agents.component.html',
  styleUrls: ['./agency-agents.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AgencyAgentsComponent implements OnInit, AfterViewInit {

 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  columnsToDisplay: string[] = ['position', 'id', 'name', 'businessName', 'terminalID', 'phoneNumber', 'history', 'action', 'date'];

  dataSource: any = new MatTableDataSource([])
  expandedElement: any;
  allAccountType = differentAccountTypes;

  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'agent_table', 'Agent ')
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
      status: new FormControl('',),
      accountType: new FormControl('',),
      transactionType: new FormControl('',),
      transactionReference: new FormControl('', Validators.minLength(9)),
    });

    this.fetchAllAgents(10,1,this.requestModel)

  }

  fetchAllAgents(
    limit: number, page: number, model: Object,
  ) {
    this.isLoadingResults = true;
    this.agencyService.fetchAllAgents(limit, page, model)
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

  async viewAgentHistory(agent) {
    this.router.navigate(['app/agency/transaction', { agent: agent.agentID }])
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

    await this.fetchAllAgents(10, 1, this.transactionRequestModel)
  }

  onPageFired(event) {
    this.fetchAllAgents(event.pageSize, event.pageIndex + 1, this.transactionRequestModel)
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
    const dialogRef = this.dialog.open(AddAgentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      this.isLoadingResults = false;
      this.fetchAllAgents(10,1,{})
    });
  }

  openAssignTerminalModal(user) {
    const {fullName, _id, businessPhone } = user;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.maxWidth = '50vw';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = { detail: { fullName, _id, businessPhone } };
    const dialogRef = this.dialog.open(AssignTerminalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
    });
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
