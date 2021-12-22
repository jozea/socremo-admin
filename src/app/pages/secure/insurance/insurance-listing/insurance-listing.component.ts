import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CardService } from 'src/app/services/card/card.service';



import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ReportService } from 'src/app/services/report/report.service';
import { exportConfig, ratingSelectionOptions } from 'src/app/constants/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import { InsuranceDetailsComponent } from '../insurance-details/insurance-details.component';


@Component({
  selector: 'app-insurance-listing',
  templateUrl: './insurance-listing.component.html',
  styleUrls: ['./insurance-listing.component.scss']
})
export class InsuranceListingComponent implements OnInit {

   
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'customerId', 'customerName', 'status', 'reference', 'createdAt', 'updatedAt'];
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
    private insuranceService: InsuranceService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private utilService: UtilsService,
    private router: Router,
    public dialog: MatDialog,
    private cdref: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
    ) { }

  
    ngOnInit(): void {
      this.userId = this.activatedRoute.snapshot.paramMap.get('id');
      // console.log(this.userId)
  
      const currentYear = new Date();
      this.maxDate = new Date(currentYear);
  
      this.enquiryFilterForm = this.formBuilder.group({
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        status: new FormControl('',),
        customerName: new FormControl(''),
      });  
  
      // this.fetchCheckBooks(this.insuranceRequestModel)
      this.getAllInsurance(this.insuranceRequestModel)
    }

    
  getAllInsurance(model: any) {
    // let model = {
    //   status:"open", 
    //   customerId:"6155f5d9ac6a386aa1ce56b1", 
    //   reference:"18832397400146", 
    //   insuranceId:"61b473e34383de57d46c4806"
    // }
    this.isLoadingResults = true
    this.insuranceService.fetchAllInsurance(model).subscribe(async (response: any)=> {
      console.log(response)
      if (response.status == true) {
        this.utilService.changeTab("statusDiv", "status", " active")
        this.dataSource = await new MatTableDataSource(response.data.result);
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    },err=> {
      this.utilService.triggerNotification('Something went wrong')
      this.isLoadingResults = false
    })
  }


  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  changeStatus(e) {
    console.log(e)
    this.status = e
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
    this.getAllInsurance(this.insuranceRequestModel)
  }

  filterStatus(status) {
    this.insuranceRequestModel.status = status
    this.getAllInsurance(this.insuranceRequestModel)
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

  openDialog(insurance) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { insurance };
    const dialogRef = this.dialog.open(InsuranceDetailsComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.getAllInsurance(this.insuranceRequestModel)

      // if (_ === 'refresh') {
      //   // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }
  
  
  openTicketSettings() {
    this.router.navigate(['app/ticket/settings'])
  }

}