import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CardService } from 'src/app/services/card/card.service';
import { ChequeService } from 'src/app/services/cheque/cheque.service';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ThirdPartiesComponent } from '../../report/third-parties/third-parties.component';


@Component({
  selector: 'app-insurance-details',
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.scss']
})
export class InsuranceDetailsComponent implements OnInit {

  isLoading = false;
  isLoadingResults = false;
  settingsForm: FormGroup;

  lock
  yes = true
  no = false
  maxDate: Date;
  securityQuestions: any[]=[];
  userDetails:any;
  insuranceDetails: any;
  assignedArr: any[]=[]
  isAssigned: boolean = false;
  allAdmin:any;
  adminId: any;
  user: any
  userId: any
  templateId


  constructor(
    public dialogRef: MatDialogRef<InsuranceDetailsComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public utilService: UtilsService,
    public userService: UserService,
    private permissionService: PermissionService,
    private cardService: CardService,
    private insuranceService: InsuranceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.user);
    this.userId = this.user.user.customer._id
    // console.log(this.user)
    this.insuranceDetails = this.data.insurance
    this.assignedArr = this.insuranceDetails.assigned 
    if(this.assignedArr.length !== 0) {
      this.adminId = this.insuranceDetails.assigned[0].officerId
    }   
    this.templateId = this.insuranceDetails._id
    this.fetchAdmins()
    
  }


  close(): void {
    this.dialogRef.close();
  }

  fetchAdmins() {
    this.permissionService.fetchAdmins().subscribe((response: any)=> {
      if (response.status == true) {
        this.allAdmin = response.data.result
      }
    })
  }

  changeAdmin(event) {
    this.allAdmin.forEach(e => {
      if (e.name == event) {
        this.adminId =e._id
      }
    });

  }

  assignInsurance() {
    this.isLoadingResults =true
    this.insuranceService.assignInsurance(this.templateId, this.adminId).subscribe((response: any)=> {
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
        this.close()
      }
    }, error=>{
      this.utilService.triggerNotification(error.message)
      this.isLoadingResults = false
    })
  }


  // openActionDialog2(action) {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.width = '80vw';
  //   dialogConfig.height = 'auto';
  //   dialogConfig.data = { cheque: this.insuranceDetails, action };
  //   const dialogRef = this.dialog.open(CardActionComponent, dialogConfig);
  //   // console.log(dialogRef)

  //   dialogRef.afterClosed().subscribe(_ => {
  //     this.dialogRef.close();
  //     if (_ === 'refresh') {
  //       // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

  //     }
  //   });
  // }
  

}