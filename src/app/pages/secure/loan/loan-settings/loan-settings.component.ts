import { LoanService } from 'src/app/services/loan/loan.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-loan-settings',
  templateUrl: './loan-settings.component.html',
  styleUrls: ['./loan-settings.component.scss']
})
export class LoanSettingsComponent implements OnInit {
  loanSettingsForm: FormGroup;
  editAdminFee: boolean = true;
  editInsuranceFee: boolean = true;
  editInterestRate: boolean = true;
  isLoadingResults: boolean = true;

  handleButtonEdit(type: string) {
    switch (type) {
      case 'admin':
        this.editAdminFee = !this.editAdminFee;
        this.editInsuranceFee = true
        this.editInterestRate = true
        break;
      case 'insurance':
        this.editInsuranceFee = !this.editInsuranceFee;
        this.editInterestRate = true
        this.editAdminFee = true
        break;
      case 'interest':
        this.editInterestRate = !this.editInterestRate;
        this.editInsuranceFee = true
        this.editAdminFee = true
        break;
      default:
        this.editAdminFee = true;
        this.editInsuranceFee = true;
        this.editInterestRate = true;
        break;
    }
  }

  async saveSettingsConfig() {
    this.editAdminFee = true;
    this.editInsuranceFee = true;
    this.editInterestRate = true;
    this.isLoadingResults = true;

    await this.updateSettings(this.loanSettingsForm.value)
    await this.fetchSettings()

  }

  discardChange() {
    this.isLoadingResults = true
    this.fetchSettings()
  }


  constructor(
    public formBuilder: FormBuilder,
    public loanService: LoanService,
    public utilService: UtilsService,
  ) { }

  ngOnInit() {
    this.loanSettingsForm = this.formBuilder.group({
      adminFee: new FormControl(''),
      insuranceFee: new FormControl(''),
      interestRate: new FormControl(''),
    });
    this.fetchSettings()
  }

  fetchSettings() {
    this.loanService.getLoanSettings().subscribe(response => {

      if (response.status === true) {
        const { adminFee, insuranceFee, interestRate } = response.data
        this.loanSettingsForm.reset({
          adminFee,
          insuranceFee,
          interestRate,
        });
      }
      this.isLoadingResults = false
    })
    this.isLoadingResults = false

  }

  updateSettings(model) {

    this.loanService.updateLoanSettings(model).subscribe(response => {
      this.utilService.triggerNotification(response.message)
    })
  }

}
