import { differentAccountTypes, exportConfig } from './../../../constants/constant';
import { UtilsService } from './../../../services/utils/utils.service';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppVersionComponent } from '../../secure/admin/app-version/app-version.component';
import { KycTierComponent } from '../admin/kyc-tier/kyc-tier.component';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'name', 'primaryTelephone', 'maritalStatus', 'nationality', 'countryOfResidence', 'createdAt'];
  dataSource: any = new MatTableDataSource([]);;
  dataSourceUnSorted: any;
  userFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'userlist_table', 'Users')
  customerData: any[]=[
    {position: 1, id: 123, firstName: 'Joseph', lastName: 'David', mobileNumber: '12345678', accountType: 'Savings', accountNumber: '0000001111', date: '2021-8-4'},
    {position: 1, id: 123, firstName: 'Joseph', lastName: 'David', mobileNumber: '12345678', accountType: 'Savings', accountNumber: '0000001111', date: '2021-8-4'},
    {position: 1, id: 123, firstName: 'Joseph', lastName: 'David', mobileNumber: '12345678', accountType: 'Savings', accountNumber: '0000001111', date: '2021-8-4'},
    {position: 1, id: 123, firstName: 'Joseph', lastName: 'David', mobileNumber: '12345678', accountType: 'Savings', accountNumber: '0000001111', date: '2021-8-4'}

  ]

  maxDate: Date;
  value = '';
  isLoadingResults = false;
  userRequestModel: any = {}

  allAccountType: any[] = differentAccountTypes
  allCustomerStatus: any[] = [
    {name: 'Active', value: "ACTIVE"},
    {name: 'Registered', value: "registered"},
    {name: 'Flagged', value: "flagged"},
    {name: 'Inactive', value: "inactive"},
  ]

  maxall: number = 1000;

  constructor(
    private userService: UserService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private router: Router,
    private utilService: UtilsService,
    public dialog: MatDialog,
    ) {}

  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);

    this.userFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      mobileNumber: new FormControl(''),
      accountType: new FormControl(''),
      customerName: new FormControl(''),
      customerStatus: new FormControl(''),
      bvn: new FormControl(''),
      accountNumber: new FormControl(''),
    });
    this.getAllUser(10, 1, this.userRequestModel)
  }
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handleSuccessResponse = async (response) => {
    this.dataSourceUnSorted = await new MatTableDataSource(response.data[0].result);
    this.dataSource = await this.dataSourceUnSorted;
    // this.maxall = response.data.meta.total;
    this.isLoadingResults = false;
  }

  handleFailureResponse = async (error) => {
    this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')     
    this.isLoadingResults = false;
    this.dataSource = new MatTableDataSource([]);
  }

  getAllUser(limit: number, page: number, model: any) {
    this.isLoadingResults = true;
    this.userService.getAllUsers(limit, page, model).subscribe(async (response: any) => {
      this.handleSuccessResponse(response)
      console.log(response.data[0].result)
    }, (error: any) => {
      this.handleFailureResponse(error);
    })
  }

  async search() {
    let { startDate, endDate, mobileNumber, accountNumber, customerName: fullName, accountType: source } = this.userFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.userRequestModel.startDate = startDate;
    this.userRequestModel.endDate = endDate;
    this.userRequestModel.mobileNumber = mobileNumber;
    this.userRequestModel.source = `${source}`;
    this.userRequestModel.fullName = fullName;
    this.userRequestModel.accountNumber = accountNumber;

    await this.getAllUser(10, 1, this.userRequestModel)
  }

  onPageFired(event) {
    this.getAllUser(event.pageSize, event.pageIndex + 1, {})
  }

  async routeToDetails(user) {
    const stringifiedUser = JSON.stringify(user)
    this.router.navigate(['app/transactions-details', { state: stringifiedUser }])
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Accion Transactions').subscribe((response) => {
      // save started
    }, (err) => {
      this.utilService.triggerNotification(err)     
      // console.log(err)
    });
  }

  // nestedPages: any = [{
  //   title: 'Settings',
  //   icon: 'settings',
  //   list: [
  //     {
  //       name: "Audit",
  //       permission: 'audit',
  //       link: "/app/setting/audit",
  //       icon: "account_box"
  //     },
  //     {
  //       name: "Permissions and Roles",
  //       permission: 'roles_permissions',
  //       link: "/app/setting/permission",
  //       icon: "enhanced_encryption"
  //     },
  //     {
  //       name: "Change Password",
  //       permission: 'change_password',
  //       link: "/app/setting/password",
  //       icon: "security"
  //     },
  //     {
  //       name: "Change App Version",
  //       permission: 'change_password',
  //       method: true,
  //       icon: "app_settings_alt"
  //     },
  //   ]}]


  openKycTierModal() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '40vw';
    dialogConfig.maxHeight = 'auto';
    const dialogRef = this.dialog.open(KycTierComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {

    });
  }

  // openDialog(action,obj) {
  //   obj.action = action;
  //   const dialogRef = this.dialog.open(DialogBoxComponent, {
  //     width: '250px',
  //     data:obj
  //   });
}
