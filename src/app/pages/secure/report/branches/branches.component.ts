import { AddBranchComponent } from './add-branch/add-branch.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { exportConfig,  transactionStatus } from 'src/app/constants/constant';
import { ReportService } from 'src/app/services/report/report.service';
import { ISelection } from 'src/app/models/iselection';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'branchName', 'branchAddress', 'state', 'longitude', 'latitude', 'branchCode'];
  dataSource: any = new MatTableDataSource([]);;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'branches_table', 'Referral')
  maxDate: Date;
  isLoadingResults = true;
  requestModel: any = {}
  allStatus: ISelection[] = transactionStatus;
  maxall: number = 1000;
  allStates = stateAndLocalGovt;

  constructor(
    private reportService: ReportService,
    private utilService: UtilsService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
  ) { }

  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    this.searchFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      state: new FormControl(''),
      branchCode: new FormControl(''),
      branchName: new FormControl(''),
    });
    this.fetchBranches(10, 1, this.requestModel)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = { };
    const dialogRef = this.dialog.open(AddBranchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      
    });
  }

  fetchBranches(limit: number, page: number, model: any) {
    this.reportService.getBranches(limit, page, model).subscribe(async (response: any) => {
      this.dataSource = new MatTableDataSource(response.data.docs);
      this.maxall = response.data.meta.total;
      this.isLoadingResults = false
    }, (error: any) => {
      this.isLoadingResults = false
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
    })
  }

  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, branchCode, branchName, state } = this.searchFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.requestModel.startDate = startDate;
    this.requestModel.endDate = endDate;
    this.requestModel.branchCode = branchCode;
    this.requestModel.state = state;
    this.requestModel.branchName = branchName;

    this.fetchBranches(10, 1, this.requestModel)
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchBranches(event.pageSize, event.pageIndex + 1, this.requestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Branch Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (error) => {
      this.utilService.triggerNotification(error)
    });
  }


}
