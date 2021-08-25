import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { monthNames } from 'src/app/constants/constant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserSettingsComponent } from '../user-settings/user-settings.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: string;
  userName: string = "";
  userData: any = {};
  userLoanData: any = [];
  isAccountUser: boolean = true;



  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private loanService: LoanService,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {

    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.userService.getUserById(this.userId).subscribe(response => {
    //   if (response.data.docs[0].middleName == undefined) {
    //     response.data.docs[0].middleName = ''
    //   }
    //   this.userName = `${response.data.docs[0].firstName} ${response.data.docs[0].middleName} ${response.data.docs[0].lastName}`
    //   this.userData = response.data.docs[0]
    //   this.isAccountUser = response.data.docs[0].isAccount ? true : false
    // })

    // this.fetchUserLoanDetail()
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