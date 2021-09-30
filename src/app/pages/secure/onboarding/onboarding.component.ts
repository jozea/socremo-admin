import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { Component, OnInit, Inject, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { genderSelection } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { CorporateService } from 'src/app/services/corporate/corporate.service';
import { MatTableDataSource } from '@angular/material/table';
import { AmendComponent } from './amend/amend/amend.component';
import { ApprovalComponent } from '../authorizer/approval/approval/approval.component';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  displayedColumns: string[] = ['position', 'companyName', 'companyAccNumber', 'createDate', 'updateDate', 'action',];
  dataSource: any = new MatTableDataSource([]);;
  broadcastMessageForm: FormGroup;
  isLoadingResults = false;
  userNameList: string[] = [];
  isLoading=false
  items: FormArray;
  add = false
  count = 1
  accFirstName:any;
  accLastName: any;
  limit: number = 10;
  page: number = 1;
  maxall: number = 1000;
  onBoardDetails = []
  approvedReps: any = new MatTableDataSource([]);
  unApprovedRep: any = new MatTableDataSource([]);
  initiatorId: any;
  userId: any;
  awaitingMaxall: number = 1000;
  approvedMaxall: number = 1000;


  constructor(
    // public dialogRef: MatDialogRef<AddBroadcastComponent>,
    public formBuilder: FormBuilder,
    public agencyService: AgencyService,
    private corporateService: CorporateService,
    private utilService: UtilsService,
    private permissionService: PermissionService,
    public dialog: MatDialog,

    // @Inject(MAT_DIALOG_DATA) public data: any,accountMobileNumber
  ) { }


  ngOnInit() {

    this.broadcastMessageForm = this.formBuilder.group({
      accountNumber: new FormControl('',  Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
      accountFirstName: new FormControl('', Validators.required),
      accountLastName: new FormControl('', Validators.required),
      accountAddress: new FormControl('', Validators.required),
      accountEmail: new FormControl('', Validators.required),
      accountMobileNumber: new FormControl('', Validators.required),
      representativesInfo: this.formBuilder.array([ this.createItem(), this.createItem() ])
    })
    //assetArray: any[] = [1, 2, 3];

    let userData = JSON.parse(sessionStorage.user)
    this.userId = userData._id
   
    this.fetchUsers(this.page,this.limit)

  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.fetchUsers(this.limit, this.page)
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)]))
    });
  }

  addItem(): void {
    this.items = this.broadcastMessageForm.get('representativesInfo') as FormArray;
    this.items.push(this.createItem());
    if (this.items.length > 1) {
      this.add = true
    }
  }

  removevalue(){
    this.items.removeAt(1)
    if (this.items.length == 2) {
      this.add = false
    }
  }

  getAccountDetails() {
    let acc = this.broadcastMessageForm.value.accountNumber
    if (acc.length == 10) {
      this.isLoadingResults = true
      this.corporateService.getDetailsByAccount(this.broadcastMessageForm.value.accountNumber).subscribe((res: any)=> {
        // console.log(res)
        if (res.data !== null && res.data.accountNumber != 'ACCOUNT has no record!') {
          let a = res.data.accountName
          let nameArr = a.split(' ');
          // console.log(nameArr);
          this.accFirstName = nameArr[2]
          this.accLastName = nameArr[1]
          this.utilService.triggerNotification(res.message)
          this.isLoadingResults = false
        }else {
          this.utilService.triggerNotification('Please input a valid account number')
          this.isLoadingResults = false
        }
      },error=> {
        this.utilService.triggerNotification(error.error.message)
        this.isLoadingResults = false
      })
    }else {
      // this.utilService.triggerNotification('Account number must be 10 characters')
    }
  }

  fetchReps() {
    let model = {
      email:'afritest22019@gmail.com', 
      reference:'76x6p1czwkm9e1gms'
    }
    // console.log(model)
    this.corporateService.getRepsDetails(model).subscribe((resp: any)=> {
      // console.log(resp)
    })
  }

  fetchUsers(page: number, limit: number) {
    this.isLoadingResults = true;
    let model = {}
    this.corporateService.getUsers(model, page, limit).then((resp: any)=> {
      // console.log(resp)
      if (resp.status == true) {
        let approvedReps = []
        let unApprovedReps = []
        this.onBoardDetails = resp.data.docs
        this.onBoardDetails.forEach(e=> {
          if(e.isApproved == true) {approvedReps.push(e)}
          if (e.isApproved == false){unApprovedReps.push(e)}
        })
        this.approvedReps = new MatTableDataSource(approvedReps);
        this.unApprovedRep = new MatTableDataSource(unApprovedReps);
        this.awaitingMaxall = unApprovedReps.length;
        this.approvedMaxall = approvedReps.length;
        this.maxall = resp.data.meta.total;
        this.utilService.triggerNotification(resp.message)
        this.isLoadingResults = false
      }else {
        this.utilService.triggerNotification(resp.message)
        this.isLoadingResults = false;

      }
    }, error=>{
      this.utilService.triggerNotification(error.error.message)
      this.isLoadingResults = false
    })
  }


  approveReps() {
    let model = {
      _id: this.userId,
    }
    this.corporateService.approveOnboardedReps(model).then((response: any)=>{
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
        this.fetchUsers(this.page,this.limit)
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    }).catch(error=> {
      // console.log(error)
      this.utilService.triggerNotification(error.message)
      this.isLoadingResults = false
    })
  }

  submit() {
    // console.log(this.broadcastMessageForm.value)
    if (this.broadcastMessageForm.valid) {
      this.isLoadingResults = true
      this.corporateService.onBoardUsers(this.broadcastMessageForm.value).then((resp: any)=> {
        // console.log(resp)
        if (resp.status == true) {
          this.onBoardDetails = resp.data
          this.utilService.triggerNotification(resp.message)
          this.isLoadingResults = false
          this.fetchUsers(this.page,this.limit)
        }else {
          this.utilService.triggerNotification(resp.message)
          this.isLoadingResults = false
        }
      }).catch(error=> {
        // console.log(error)
        this.utilService.triggerNotification(error.message)
        this.isLoadingResults = false
      })
    }
  }

  
  openDialog(details) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = {  details };
    const dialogRef = this.dialog.open(AmendComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      // if (_ === 'refresh') {
      //   this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }

  openDialog2(details) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { details, approved:false };
    const dialogRef = this.dialog.open(ApprovalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(_ => {
      // if (_ === 'refresh') {
      //   this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }

  openDialog3(details) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { details, approved:true };
    const dialogRef = this.dialog.open(ApprovalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(_ => {
      // if (_ === 'refresh') {
      //   this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

      // }
    });
  }

  waiting = true
  approved 
  toggleApprovalTab() {
    this.waiting = true
    this.approved = false
    // console.log(this.approved,this.waiting)
  }
  toggleWaitingTab() {
    this.waiting = false
    this.approved = true
    // console.log(this.approved,this.waiting)
  }

  listInvestments() {
    let body = {
      initiatorId: '60dced8a927c12f12f7696ab', 
      status:'closed', 
      startDate: '2021-07-03T10:20:11.981Z'
    }
    // console.log(body)
    this.corporateService.listInvestments(body).then((response: any)=> {
      // console.log(response)
    })
  }



  close(): void {
    // this.dialogRef.close();
  }

} 


