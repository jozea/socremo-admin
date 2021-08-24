import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { exportConfig, booleanStatusTypes } from 'src/app/constants/constant';
import { ReportService } from 'src/app/services/report/report.service';
import { ISelection } from 'src/app/models/iselection';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission/permission.service';




@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.scss']
})
export class ViewusersComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'firstName', 'middleName', 'lastName', 'mobileNumber', 'status', 'role', 'maker', 'authorizer', 'date', 'action'];
  dataSource: any = new MatTableDataSource([]);;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'referral_table', 'Referral')
  maxDate: Date;
  isLoadingResults = false;
  requestModel: any = {}
  allStatus: ISelection[] = booleanStatusTypes;
  maxall: number = 1000;
  checked: boolean
  // dataSource: any = new MatTableDataSource([]);
  allRoles = [];

  selectedData: String;
  doneAction: boolean = false;
  filterList = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'pending' },
    { name: 'Approved', value: 'approved' },
    { name: 'Rejected', value: 'rejected' },
  ];

  constructor(
    public dialog: MatDialog,
    private permissionService: PermissionService,
    private utilService: UtilsService,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    this.searchFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      mobileNumber: new FormControl(''),
      status: new FormControl(''),
      customerName: new FormControl(''),
    });
    this.fetchAllRoles()
    this.selectedData = "All";
    this.checked = true;
    this.fetchAdmins(10, 1, this.requestModel)

  }

  handleSuccessResponse = async (response) => {
    this.dataSource = new MatTableDataSource(response.data.docs);
    this.maxall = response.data.meta.total;
    this.isLoadingResults = false;
  }

  handleFailureResponse = async (error) => {
    this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
    this.isLoadingResults = false;
    this.dataSource = new MatTableDataSource([]);
  }

  fetchAdmins(limit: number, page: number, model: any) {
    this.isLoadingResults = true;
    this.permissionService.getAllAdmins(limit, page, model).subscribe(response => {
      this.handleSuccessResponse(response)
    }, (error: any) => {
      this.handleFailureResponse(error);
    })
  }


  fetchAllRoles() {
    this.permissionService.getAllRoles().subscribe(response => {
      this.allRoles = response.data
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onPageToggle(event) {
    if (event.checked == false) {
      this.router.navigate(["app/setting/permission"])
    }
  }

  openDialog(user) {
    const { admin } = user

    const { fullName } = JSON.parse(sessionStorage.getItem('user'));

    if (admin && ((admin.status === "approved") || (admin.status && admin.maker !== fullName))) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.width = 'auto';
      dialogConfig.maxHeight = 'auto';
      dialogConfig.data = { detail: user, roles: this.allRoles };
      const dialogRef = this.dialog.open(UpdateAdminComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(_ => {
        this.isLoadingResults = true;
        this.fetchAdmins(10, 1, this.requestModel)
      });
    } else {
      this.utilService.triggerNotification('You cannot approve user')
    }

  }

  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, mobileNumber, status, customerName: fullName } = this.searchFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.requestModel.startDate = startDate;
    this.requestModel.endDate = endDate;
    this.requestModel.mobileNumber = mobileNumber;
    this.requestModel.fullName = fullName;
    this.requestModel.status = status;

    this.fetchAdmins(10, 1, this.requestModel)
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchAdmins(event.pageSize, event.pageIndex + 1, this.requestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'View Admins').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (error) => {
      this.utilService.triggerNotification(error)
    });
  }

  selected(event) {
    // console.log(event);
  }

}
