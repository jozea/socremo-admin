import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';
import { exportConfig, ratingSelectionOptions } from 'src/app/constants/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit {

  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'id', 'name', 'number', 'status', 'date'];
  dataSource: any = new MatTableDataSource([]);
  enquiryFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig("pdf", "feedback_table", "Feedback")

  maxDate: Date;
  isLoadingResults = false;
  ratingCode: ISelection[] = ratingSelectionOptions
  feedbackRequestModel: any = {}
  maxall: number = 1000;

  ticketData: any[]=[
    {fullName: 'Loan', id: 'la12', mobileNumber: '00111022', comment: 'active', date: '2021-02-03'},
    {fullName: 'Investment', id: 'in12', mobileNumber: '00111023', comment: 'active', date: '2021-02-03'},
    {fullName: 'Savings', id: 'sa12', mobileNumber: '00111024', comment: 'inactive', date: '2021-02-03'}

  ]


  constructor(
    private reportService: ReportService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private utilService: UtilsService,
    public dialog: MatDialog,
    ) {
    }

  ngOnInit() {

    const currentYear = new Date();
    this.maxDate = new Date(currentYear);

    this.enquiryFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      rating: new FormControl('',),
      customerName: new FormControl(''),
    });
    // this.fetchFeedback(10, 1, this.feedbackRequestModel)

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchFeedback(limit: number, page: number, model: any) {
    this.reportService.fetchEnquireisAndComplaints(limit, page, model).subscribe(async (response: any) => {
      this.dataSource = await new MatTableDataSource(response.data.docs);
      this.maxall = response.data.meta.total;
      this.isLoadingResults = false
    }, (error: any) => {
      this.isLoadingResults = false
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
    })
  }
  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, rating, customerName: fullName } = this.enquiryFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.feedbackRequestModel.startDate = startDate;
    this.feedbackRequestModel.endDate = endDate;
    this.feedbackRequestModel.rating = rating;
    this.feedbackRequestModel.fullName = fullName;

    this.fetchFeedback(10, 1, this.feedbackRequestModel)
  }

  onPageFired(event: any) {
    this.isLoadingResults = true;
    this.fetchFeedback(event.pageSize, event.pageIndex + 1, this.feedbackRequestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Feedback Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (err) => {
      this.utilService.triggerNotification(err)
    });
  }

  createProduct() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = {  };
    const dialogRef = this.dialog.open(CreateProductComponent, dialogConfig);
    // console.log(dialogRef)

    // dialogRef.afterClosed().subscribe(_ => {
    //   if (_ === 'refresh') {
    //     // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

    //   }
    // });
  }

  openDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { row };
    const dialogRef = this.dialog.open(ProductDetailComponent, dialogConfig);
    // console.log(dialogRef)

    // dialogRef.afterClosed().subscribe(_ => {
    //   if (_ === 'refresh') {
    //     // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

    //   }
    // });
  }


}
