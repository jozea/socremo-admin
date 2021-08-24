import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { exportConfig, allLoanActions, allLoanProcess, allChannels } from 'src/app/constants/constant';
import { GoalService } from 'src/app/services/goal/goal.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import {forkJoin} from 'rxjs';
import { GoalsDetailsComponent } from '../goals-details/goals-details.component';


@Component({
  selector: 'app-goals-listing',
  templateUrl: './goals-listing.component.html',
  styleUrls: ['./goals-listing.component.scss']
})
export class GoalsListingComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'fullName', 'nameOfGoal', 'interestRate', 'numberOfDays', 'status', 'targetAmount','expectedIntPlusAmountSaved', 'appDate', 'date']//, 'termRecommended', 'date'];
  dataSource: any = new MatTableDataSource([]);
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'loan_table', 'Loan')
  loanFilterForm: FormGroup;
  maxDate: Date;
  loading: boolean = true;
  maxall: number = 1000;

  actionSelection = allLoanActions;
  channelSelection = allChannels;
  processSelection = allLoanProcess;

  goalsRequestModel: any = {}
  headingText = "Active Goals";
  status: string = "active";

  limit: number = 10;
  page: number = 1;

  constructor(
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private goalService: GoalService,
    private utilService: UtilsService,
    public dialog: MatDialog

  ) { }

  // 
  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);

    this.loanFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      channel: new FormControl(''),
      actionBy: new FormControl(''),
      process: new FormControl(''),
      mobileNumber: new FormControl(''),
      minAmount: new FormControl(''),
      maxAmount: new FormControl(''),
      customerName: new FormControl(''),
      loanID: new FormControl(''),
    });

    this.goalsRequestModel = {
      status: this.status
    }

    this.handleLoanRequest( this.goalsRequestModel,this.limit, this.page);

  }

  async search() {
    this.loading = true;
    let { startDate, endDate, channel, actionBy, process, mobileNumber, minAmount, maxAmount, customerName, loanID } = this.loanFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.goalsRequestModel.startDate = startDate;
    this.goalsRequestModel.endDate = endDate;
    this.goalsRequestModel.channel = channel;
    this.goalsRequestModel.actionBy = actionBy;
    this.goalsRequestModel.process = process;
    this.goalsRequestModel.mobileNumber = mobileNumber;
    this.goalsRequestModel.minAmount = minAmount;
    this.goalsRequestModel.maxAmount = maxAmount;
    this.goalsRequestModel.customerName = customerName;
    this.goalsRequestModel.loanID = loanID;

    this.handleLoanRequest(this.goalsRequestModel,this.limit, this.page);
  
  }


  onPageFired(event) {
    this.loading = true;
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.handleLoanRequest( this.goalsRequestModel,this.limit, this.page)
  }

  async handleLoanRequest( model: any, limit:number, page: number) {
    this.loading = true;
    this.utilService.deleteKeyIfEmpty(model)
    this.goalService
      .getGoals(model, limit, page).subscribe(async response => {
        // console.log(response.data)
        this.dataSource = new MatTableDataSource(response.data.docs);
        this.maxall = response.data.meta.total;
        this.loading = false;
      }, (error: any) => {
        this.utilService.triggerNotification(error.message ? error.message : 'Network Issues. Try again')
        this.dataSource = new MatTableDataSource([]);
        this.loading = false;
      })
  }

  openDialog(goal) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { goal };
    const dialogRef = this.dialog.open(GoalsDetailsComponent, dialogConfig);
    // console.log(goal)

    dialogRef.afterClosed().subscribe(_ => {
      if (_ === 'refresh') {
        this.handleLoanRequest(this.goalsRequestModel,this.limit, this.page)

      }
    });
  }

  tabClick(event: MatTabChangeEvent) {
    this.loading = true;
    switch (event.index) {
      case 0:
        this.headingText = "Active Goals";
        this.status = "active";
        break;
      case 1:
        this.headingText = "Inactive Goals";
        this.status = "inactive";
        break;
      case 2:
        this.headingText = "Completed Goals";
        this.status = "closed";
        break;
      default:
        this.headingText = "Goals";
        this.status = "successful";
        break;
    }
    this.loanFilterForm.reset({
      startDate: "",
      endDate: "",
      channel: "",
      actionBy: "",
      process: "",
      mobileNumber: "",
      minAmount: "",
      maxAmount: "",
      customerName: "",
      loanID: "",
    });
    this.goalsRequestModel = {
      status: this.status
    }
    this.handleLoanRequest( this.goalsRequestModel,this.limit, this.page);
    this.dataSource.paginator = this.paginator;
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Loans').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (err) => {
      // console.log(err)
      this.utilService.triggerNotification(err)
    });
  }

}

