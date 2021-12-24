import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { exportConfig, ratingSelectionOptions } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { FaqService } from 'src/app/services/faq/faq.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FaqSettingsComponent } from '../faq-settings/faq-settings.component';

@Component({
  selector: 'app-faq-management',
  templateUrl: './faq-management.component.html',
  styleUrls: ['./faq-management.component.scss']
})
export class FaqManagementComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'question', 'answer', 'disabled', 'createdAt', 'updatedAt'];
  dataSource: any = new MatTableDataSource([]);
  enquiryFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig("pdf", "feedback_table", "Feedback")

  maxDate: Date;
  isLoadingResults = false;
  ratingCode: ISelection[] = ratingSelectionOptions
  insuranceRequestModel: any = {}
  status: any;
  maxall: number = 1000;
  userId: any;
  userArray: any[]=[];

  constructor(
    private faqService: FaqService,
    private utilService: UtilsService,
    private exportAsService: ExportAsService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    // public dialogRef: MatDialogRef<FaqManagementComponent>,



  ) { }

  ngOnInit(): void {
    this.enquiryFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl('',),
      customerName: new FormControl(''),
    }); 
    this.getFaq()
  }

  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, status, customerName: fullName } = this.enquiryFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.insuranceRequestModel.startDate = startDate;
    this.insuranceRequestModel.endDate = endDate;
    this.insuranceRequestModel.status = status;
    this.insuranceRequestModel.fullName = fullName;

    this.utilService.deleteKeyIfEmpty(this.insuranceRequestModel)
    // this.getAllInsurance(this.insuranceRequestModel)
  }

  filterStatus(status) {
    this.insuranceRequestModel.status = status
    // this.getAllInsurance(this.insuranceRequestModel)
  }

  getFaq() {
    this.isLoadingResults = true
    this.faqService.getFAQ().subscribe(async (response: any)=> {
      console.log(response)
      if (response.status == true) {
        this.dataSource = await new MatTableDataSource(response.data);
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    }, error=> {
      this.utilService.triggerNotification(error.message);
      this.isLoadingResults = false
    })
  }

  deleteFaq() {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onPageFired(event: any) {
    this.isLoadingResults = true;
    // this.fetchFeedback(event.pageSize, event.pageIndex + 1, this.insuranceRequestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Feedback Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (err) => {
      this.utilService.triggerNotification(err)
    });
  }

  openDialog(action) {
    console.log(action)
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.maxHeight = 'auto';
    // dialogConfig.data = {action,branch: this.branchArray };
    const dialogRef = this.dialog.open(FaqSettingsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
        // this.dialogRef.close();

      // this.fetchBranches()
    });
  }

}
