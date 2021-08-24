import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { exportConfig, booleanStatusTypes } from 'src/app/constants/constant';
import { ReportService } from 'src/app/services/report/report.service';
import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'referredName', 'referredMobileNumber', 'referrerMobileNumber', 'referrerAccountNumber', 'rewardType', 'channel', 'amount', 'status', 'date',]// 'action'];
  dataSource: any = new MatTableDataSource([]);;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'referral_table', 'Referral')
  maxDate: Date;
  isLoadingResults = true;
  requestModel: any = {}
  allStatus: ISelection[] = booleanStatusTypes;
  maxall: number = 1000;
  loggedInUserMobileNumber: string;


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
      referredMobileNumber: new FormControl(''),
      // referrerMobileNumber: new FormControl(''),
    });
    this.fetchReport(10, 1, this.requestModel)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  rewardReferral(user) {
    const { amount, _id, createdAt, reason, status, updatedAt, ...rest } = user;
    this.loggedInUserMobileNumber = JSON.parse(sessionStorage.getItem('user')).mobileNumber;
    this.reportService.rewardReferral({ ...rest, existingAdminMobileNumber: this.loggedInUserMobileNumber }).subscribe(response => {
      this.utilService.triggerNotification(response.message)
    }, (error: any) => {
      this.utilService.triggerNotification('Could not credit user at the moment')
    })
  }

  fetchReport(limit: number, page: number, model: any) {
    this.reportService.getAllReferrals(limit, page, model).subscribe(async (response: any) => {
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
    let { startDate, endDate, referredMobileNumber, referrerMobileNumber, status } = this.searchFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.requestModel.startDate = startDate;
    this.requestModel.endDate = endDate;
    this.requestModel.referredMobileNumber = referredMobileNumber;
    this.requestModel.referrerMobileNumber = referrerMobileNumber;
    this.requestModel.status = status;

    this.fetchReport(10, 1, this.requestModel)
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchReport(event.pageSize, event.pageIndex + 1, this.requestModel)
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


