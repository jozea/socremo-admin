import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { exportConfig,  transactionStatus } from 'src/app/constants/constant';
import { ReportService } from 'src/app/services/report/report.service';
import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-third-parties',
  templateUrl: './third-parties.component.html',
  styleUrls: ['./third-parties.component.css']
})
export class ThirdPartiesComponent implements OnInit, AfterViewInit {

 
 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'name', 'amount', 'status', 'gateway_response', 'email', 'reference', 'date', 'createdAt'];
  dataSource: any = new MatTableDataSource([]);;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'platform_table', 'Paystack')
  maxDate: Date;
  isLoadingResults = true;
  requestModel: any = {}
  allStatus: ISelection[] = transactionStatus;
  maxall: number = 1000;

  constructor(
    private reportService: ReportService,
    private utilService: UtilsService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
  ) { }

  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    this.searchFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl(''),
    });
    this.requestModel.startDate = "";
    this.requestModel.endDate = "";
    this.requestModel.status = "";
    this.fetchLog(10, 1, "", "", "")
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchLog(limit: number, page: number, from, to, status) {
    this.reportService.fetchPSRecords(limit, page, from, to, status).subscribe(async (response: any) => {
      // console.log(response)
      const {data, meta} = response.data

      this.dataSource = new MatTableDataSource(data);
      this.maxall = meta.total;
      this.isLoadingResults = false
    }, (error: any) => {
      this.isLoadingResults = false
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
    })
  }

  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, status } = this.searchFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.requestModel.startDate = startDate;
    this.requestModel.endDate = endDate;
    this.requestModel.status = status;

    this.fetchLog(10, 1,startDate, endDate, status)
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchLog(event.pageSize, event.pageIndex + 1,  this.requestModel.startDate,  this.requestModel.endDate,  this.requestModel.status)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Referral Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (error) => {
      // console.log(error)
      this.utilService.triggerNotification(error)
    });
  }
}
