import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ProblemDetailsComponent } from '../problem-details/problem-details.component';

@Component({
  selector: 'app-ticket-settings',
  templateUrl: './ticket-settings.component.html',
  styleUrls: ['./ticket-settings.component.scss']
})
export class TicketSettingsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'type', 'createdAt', 'updatedAt'];
  dataSource: any = new MatTableDataSource([]);
  maxall: number = 1000;

  problemDetails: any;


  isLoading = false;
  isLoadingResults = false;
  ticketSettingsForm: FormGroup;
  ticketSettingsForm2: FormGroup;
  ticketSettingsForm3: FormGroup;

  items: FormArray;
  add: boolean = false;
  problemTypeId: any;
  categoryId:any;
  category: any;
  problemTypeIdAdd: any;
  categoryAdd: any;
  description: any;


  constructor(
    // public dialogRef: MatDialogRef<TicketSettingsComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public utilService: UtilsService,
    public userService: UserService,
    private report: ReportService,
    public dialog: MatDialog,
    private router: Router,

    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.ticketSettingsForm = this.formBuilder.group({
      type: new FormControl('', Validators.required),
      categories: this.formBuilder.array([ this.createItem()])
    })

    this.ticketSettingsForm2 = this.formBuilder.group({
      problemTypeId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
    })

    this.ticketSettingsForm3 = this.formBuilder.group({
      problemTypeId: new FormControl('', Validators.required),
      categoryObj: this.formBuilder.group({
        category: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      })
    })

    this.getProblemTypes()
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      category: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  addItem(): void {
    this.items = this.ticketSettingsForm.get('categories') as FormArray;
    this.items.push(this.createItem());
    if (this.items.length > 1) {
      this.add = true
    }
  }

  removevalue(){
    this.items.removeAt(1)
    if (this.items.length == 1) {
      this.add = false
    }
  }

  clear() {
    this.ticketSettingsForm.value.type = ''
    this.ticketSettingsForm.value.categories = []
  }

  close(): void {
    // this.dialogRef.close();
  }


  submitTicketSettings(type) {
    let model
    let action
    if (type == 'create') {
      if (this.ticketSettingsForm.valid) {
        action = 'Created'
        model = this.ticketSettingsForm.value
      }
    }
    console.log(type, model)
    if (model != undefined && type == 'create') {
      this.isLoadingResults = true
      this.report.createTicket(model).subscribe((response: any)=> {
        console.log(response)
        if (response.status == true) {
          this.utilService.triggerNotification(`${action} Successfully`)
          this.getProblemTypes()
          this.clear()
          this.isLoadingResults = false
        }else {
          this.utilService.triggerNotification(`Failed`)
          this.isLoadingResults = false
        }
      },error=> {
        this.utilService.triggerNotification(error.message)
        this.isLoadingResults = false
      })
    }
  }

  getProblemTypes() {
    this.isLoadingResults = true
    this.report.getProblemType().subscribe((res: any)=> {
      console.log(res)
      if (res.status == true) {
        this.problemDetails = res.data[0].result
        // console.log(this.problemDetails)
        this.dataSource = new MatTableDataSource(res.data[0].result);
        this.isLoadingResults = false

      }
    },error=> {
      this.utilService.triggerNotification(error.message)
      this.isLoadingResults = false
    })
  }

  onPageFired(event: any) {
    this.isLoadingResults = true;
    // this.fetchFeedback(event.pageSize, event.pageIndex + 1, this.feedbackRequestModel)
  }

  openDialog(ticket) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { ticket };
    const dialogRef = this.dialog.open(ProblemDetailsComponent, dialogConfig);
    // console.log(dialogRef)

    dialogRef.afterClosed().subscribe(_ => {
      this.getProblemTypes()
      // if (_ === 'refresh') {
      //   // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }

  back() {
    this.router.navigate(['app/ticket/management'])
  }

}