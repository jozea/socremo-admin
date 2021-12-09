import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { monthNames } from 'src/app/constants/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserSettingsComponent } from '../user-settings/user-settings.component';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AddBroadcastComponent } from '../../broadcast/add-broadcast/add-broadcast.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: string;
  userName: string = "";
  userData: any = {};
  userDetails: any[]=[]
  userLoanData: any = [];
  isAccountUser: boolean = true;
  isLoadingResults: boolean = false;



  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loanService: LoanService,
    private utilService: UtilsService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {

    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.userId)
    // let param = {}
    // let param = {username: this.userId}
    let param = {name: this.userId}
    this.getSingleUser(param)
  }

  async routeToDetails(user) {
    // console.log(user)
    const stringifiedUser = JSON.stringify(user)
    this.router.navigate(['app/ticket/management'])
  }

  handleSuccessResponse = async (response) => {
    this.isLoadingResults = false;
  }

  handleFailureResponse = async (error) => {
    this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')     
    this.isLoadingResults = false;
  }

  getSingleUser(model: any) {
    this.isLoadingResults = true;
    this.userService.getSingleUser(model).subscribe(async (response: any) => {
      this.handleSuccessResponse(response)
      this.userData = response.data[0].result[0]
      // console.log(this.userData)
      this.changeCodes()
      this.userName = `${this.userData.name}`
    }, (error: any) => {
      this.handleFailureResponse(error);
    })
  }

  changeCodes() {
    let countryArray = this.utilService.countriesAndCodes
    countryArray.forEach(e => {
      let code = e.iso3
      if (this.userData.countryOfResidence != undefined) {
        if (code == this.userData.countryOfResidence.toLowerCase()) {
          this.userData.countryOfResidence = e.name
        }
      }
    });
  }

  fetchUserLoanDetail() {
    this.loanService.getLoanByMobileNumber({ mobileNumber: this.userId }).subscribe(response => {
      if(response.data.loanDetails) {
        this.userLoanData = response.data.loanDetails;
      }
    })

  }

  formatMaritalStatus(status: string): string {
    switch (status) {
      case "1":
        return "Single";
      case "2":
        return "Married";
      case "3":
        return "Divorced";
      case "4":
        return "Widowed";
      case "5":
        return "Separated";
      default:
        return status
    }
  }

  formatEmploymentStatus(status: string): string {
    switch (status) {
      case "1":
        return "Full Time Employment";
      case "2":
        return "Part Time Employment";
      case "3":
        return "Pensioner";
      case "4":
        return "Casual";
      case "5":
        return "Unemployed";
      case "6":
        return "Student";
      case "7":
        return "Self-employed";
      default:
        return status
    }
  }

  formatDate(date): string {
    let day = date.slice(6)
    let month = +date.slice(4, 6) - 1;
    let year = date.slice(0, 4)

    return `${day}-${monthNames[month]}-${year}`
  }

  openDialog(user) {
    this.router.navigate(['/app/loans/management'])
  }

  openMessageDialog(user: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = {user, mobileNumber: this.userId };
    const dialogRef = this.dialog.open(AddBroadcastComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      this.isLoadingResults = false;
      // this.fetchBroadcastMessages(10,1,{})
    });
  }

  // openDialog(user) {
  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.width = '80vw';
  //   dialogConfig.height = 'auto';
  //   dialogConfig.data = { user };
  //   const dialogRef = this.dialog.open(UserSettingsComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(_ => {
  //     if (_ === 'refresh') {
  //       // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)
  //     }
  //   });
  // }

}
