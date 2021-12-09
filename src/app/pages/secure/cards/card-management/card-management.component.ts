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
import { CardDetailsComponent } from '../../cards/card-details/card-details.component';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html',
  styleUrls: ['./card-management.component.scss']
})
export class CardManagementComponent implements OnInit {

   
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'customerId', 'customerName', 'category', 'status', 'reference']//, 'createdAt', 'updatedAt'];
  dataSource: any = new MatTableDataSource([]);
  enquiryFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig("pdf", "feedback_table", "Feedback")

  maxDate: Date;
  isLoadingResults = false;
  ratingCode: ISelection[] = ratingSelectionOptions
  chequeRequestModel: any = {}
  status: any;
  maxall: number = 1000;
  userId: any;
  userArray: any[]=[];

  constructor(
    private cardService: CardService,
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
      // this.fetchFeedback(this.chequeRequestModel)
  
  
      // this.fetchCheckBooks(this.chequeRequestModel)
      this.fetchCards()
    }

  fetchCards() {
    this.isLoadingResults = true
    this.cardService.fetchCards().subscribe(async (response: any)=> {
        // console.log(response)
        if (response.status == true) {
          this.dataSource = await new MatTableDataSource(response.data.result);
          this.utilService.triggerNotification(response.message)
          this.isLoadingResults = false
        }
      },err=> {
        this.utilService.triggerNotification('Something went wrong')
        this.isLoadingResults = false
      })
  }

  closeCard() {
    let model = {
      cardId:"61a53eef8868c03fdd60b8eb"
    }
    this.cardService.closCard(model).subscribe((response: any)=> {
      // console.log(response)
    })
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  changeStatus(e) {
    // console.log(e)
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

    this.chequeRequestModel.startDate = startDate;
    this.chequeRequestModel.endDate = endDate;
    this.chequeRequestModel.status = status;
    this.chequeRequestModel.fullName = fullName;

    this.utilService.deleteKeyIfEmpty(this.chequeRequestModel)
    this.fetchCards()
  }

  filterStatus(status) {
    this.chequeRequestModel.status = status
    this.fetchCards()
  }

  onPageFired(event: any) {
    this.isLoadingResults = true;
    // this.fetchFeedback(event.pageSize, event.pageIndex + 1, this.chequeRequestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Feedback Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (err) => {
      this.utilService.triggerNotification(err)
    });
  }

  openDialog(cheque) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { cheque };
    const dialogRef = this.dialog.open(CardDetailsComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.fetchCards()

      // if (_ === 'refresh') {
      //   // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }
  
  
  openTicketSettings() {
    this.router.navigate(['app/ticket/settings'])
  }

}