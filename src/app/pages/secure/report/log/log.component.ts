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
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit, AfterViewInit {

 
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'statusCode', 'message', 'url', 'date'];
  dataSource: any = new MatTableDataSource([]);;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'referral_table', 'Referral')
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
      url: new FormControl(''),
      statusText: new FormControl(''),
    });
    this.fetchLog(10, 1, this.requestModel)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchLog(limit: number, page: number, model: any) {
    this.reportService.getAllNotificationLog(limit, page, model).subscribe(async (response: any) => {
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
    let { startDate, endDate, url, statusText, status } = this.searchFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.requestModel.startDate = startDate;
    this.requestModel.endDate = endDate;
    this.requestModel.url = url;
    this.requestModel.status = status;
    this.requestModel.statusText = statusText;

    this.fetchLog(10, 1, this.requestModel)
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchLog(event.pageSize, event.pageIndex + 1, this.requestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Log Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (error) => {
      // console.log(error)
      this.utilService.triggerNotification(error)
    });
  }


}
