import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { exportConfig } from 'src/app/constants/constant';
import { ReportService } from 'src/app/services/report/report.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'username', 'mobileNumber', 'action', 'ip', 'url', 'method', 'systemUsed' ,'createdAt'];
  dataSource: any = new MatTableDataSource();
  dataSourceUnSorted: any;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'audit_table', 'Audit')

  maxDate: Date;
  isLoadingResults = true;
  maxall: number = 1000;
  requestModel: any = {}




  constructor(
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    public reportService: ReportService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);

    this.searchFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      mobileNumber: new FormControl(''),
      action: new FormControl(''),
    });
    this.fetchAuditReport(10, 1, this.requestModel);

  }

  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, mobileNumber, action } = this.searchFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.requestModel.startDate = startDate;
    this.requestModel.endDate = endDate;
    this.requestModel.mobileNumber = mobileNumber;
    this.requestModel.action = action;

    this.fetchAuditReport(10, 1, this.requestModel);
  }

  fetchAuditReport(limit: number, page: number, model: any) {
    this.reportService.getAllAudit(limit, page, model).subscribe(response => {
      this.dataSource = new MatTableDataSource(response.data.docs);
      this.maxall = response.data.meta.total;
      this.isLoadingResults = false
    }, (error: any) => {
      this.isLoadingResults = false
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
    })
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchAuditReport(event.pageSize, event.pageIndex + 1, this.requestModel)
  }


  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Audit Report').subscribe((response) => {
      // save started
      this.utilService.triggerNotification('File Downloaded')
    }, (error) => {
      this.utilService.triggerNotification(error)
    });



  }




}
