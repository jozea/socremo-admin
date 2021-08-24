import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { exportConfig, agentTransactionTypes, differentRangeTypes, transactionTypes } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SettingModalComponent } from './setting-modal/setting-modal.component';

@Component({
  selector: 'app-agency-settings',
  templateUrl: './agency-settings.component.html',
  styleUrls: ['./agency-settings.component.css']
})
export class AgencySettingsComponent implements OnInit, AfterViewInit {

  Object = Object;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'transactionType', 'convenienceFee', 'rangeType', 'minLimit', 'maxLimit', 'action'];
  dataSource: any = new MatTableDataSource([]);;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'referral_table', 'Referral')
  maxDate: Date;
  isLoadingResults = false;
  requestModel: any = {}
  allTransactionTypes: ISelection[] = agentTransactionTypes;
  allRangeTypes: ISelection[] = differentRangeTypes;
  maxall: number = 1000;

  constructor(
    private utilService: UtilsService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    public dialog: MatDialog,
    public agencyService: AgencyService
  ) { }

  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    this.searchFilterForm = this.formBuilder.group({
      transactionType: new FormControl(''),
      rangeType: new FormControl(''),
    });
    this.fetchReport()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchReport() {
    this.agencyService.getAllFees().subscribe((response: any) => {
      let table = response.data ? Object.values(response.data.agency) : []
      if(this.requestModel.transactionType) {
        table = table.filter((item: any) => item.transactionType === this.requestModel.transactionType )
      }
      if(this.requestModel.rangeType) {
        table = table.filter((item: any) => item.rangeType === this.requestModel.rangeType )
      }
      this.dataSource = new MatTableDataSource(table)
      this.isLoadingResults = false
    }, (err) => {
      this.isLoadingResults = false
    })
  }

  openDialog(detail, action) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '70vw';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = { status: action, detail };
    const dialogRef = this.dialog.open(SettingModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      this.isLoadingResults = true;
      this.fetchReport()
    });
  }

  async search() {
    this.isLoadingResults = true;
    let {  transactionType, rangeType } = this.searchFilterForm.value;

    this.requestModel.transactionType = transactionType;
    this.requestModel.rangeType = rangeType;


    this.fetchReport()
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchReport()
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Agency Setting').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (error) => {
      this.utilService.triggerNotification(error)
    });
  }
}
