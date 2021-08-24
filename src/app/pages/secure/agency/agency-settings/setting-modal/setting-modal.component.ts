import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { agentTransactionTypes, differentRangeTypes } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-setting-modal',
  templateUrl: './setting-modal.component.html',
  styleUrls: ['./setting-modal.component.scss']
})
export class SettingModalComponent implements OnInit, AfterViewInit {

  details: any;
  convenienceFeeForm: FormGroup;
  allTransactionTypes: ISelection[] = agentTransactionTypes;
  allRangeTypes: ISelection[] = differentRangeTypes;
  stampRequired: ISelection[] = [
    { name: "True", value: true },
    { name: "False", value: false },
  ];
  status = 'update'
  isLoadingResults = false;

  allFees = []


  constructor(
    public dialogRef: MatDialogRef<SettingModalComponent>,
    public formBuilder: FormBuilder,
    public agencyService: AgencyService,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  updateFormField() {

    if (this.status === 'update') {
      const { transactionType, rangeType, convenienceFee, isStampRequired, isVatRequired, minLimit, maxLimit, fees } = this.details;
      if (fees) {
        // EXISTING FORM WITH A FEE KEY
        this.convenienceFeeForm = this.formBuilder.group({
          transactionType: new FormControl(transactionType, Validators.required),
          rangeType: new FormControl(rangeType, Validators.required),
          isStampRequired: new FormControl(isStampRequired, Validators.required),
          isVatRequired: new FormControl(isVatRequired, Validators.required),
        });

        const feeArray = Object.keys(fees);
        feeArray.map(item => {
          this.convenienceFeeForm.addControl(`minLimit_${this.allFees.length + 1}`, this.formBuilder.control(fees[item].minLimit,))
          this.convenienceFeeForm.addControl(`maxLimit_${this.allFees.length + 1}`, this.formBuilder.control(fees[item].maxLimit,))
          this.convenienceFeeForm.addControl(`convenienceFee_${this.allFees.length + 1}`, this.formBuilder.control(fees[item].convenienceFee))
          this.allFees.push(this.allFees.length + 1)
        })
      } else {
        // EXISTING FORM WITHOUT A FEE KEY
        this.allFees = [1]
        this.convenienceFeeForm = this.formBuilder.group({
          transactionType: new FormControl(transactionType),
          rangeType: new FormControl(rangeType),
          isStampRequired: new FormControl(isStampRequired),
          isVatRequired: new FormControl(isVatRequired),
          convenienceFee_1: new FormControl(convenienceFee, Validators.required),
          minLimit_1: new FormControl(minLimit, Validators.required),
          maxLimit_1: new FormControl(maxLimit, Validators.required),
        });
      }
    } else {
      // FRESH NEW FORM
      this.allFees = [1]
      this.convenienceFeeForm = this.formBuilder.group({
        transactionType: new FormControl('', Validators.required),
        rangeType: new FormControl('', Validators.required),
        isStampRequired: new FormControl(false, Validators.required),
        isVatRequired: new FormControl(false, Validators.required),
        convenienceFee_1: new FormControl('', Validators.required),
        minLimit_1: new FormControl('', Validators.required),
        maxLimit_1: new FormControl('', Validators.required),
      });
    }

  }

  ngOnInit() {

    this.details = this.data.detail;
    this.status = this.data.status;
    
    this.updateFormField()




  }

  addMoreFees() {

    this.convenienceFeeForm.addControl(`minLimit_${this.allFees.length + 1}`, this.formBuilder.control('',))
    this.convenienceFeeForm.addControl(`maxLimit_${this.allFees.length + 1}`, this.formBuilder.control('',))
    this.convenienceFeeForm.addControl(`convenienceFee_${this.allFees.length + 1}`, this.formBuilder.control('',))

    // 
    this.allFees.push(this.allFees.length + 1)
  }

  removeFee(index) {
    if (index !== 1) {
      this.allFees.pop()
    }
  }

  ngAfterViewInit(): void {


  }

  structureModel = (): Object => {

    const nameObject = agentTransactionTypes.filter(item => item.value === this.convenienceFeeForm.value.transactionType);

    let model = {}

    if (this.convenienceFeeForm.value.transactionType === 'cash_out' || this.convenienceFeeForm.value.transactionType === 'transfer') {
      let fees = {}
      this.allFees.map(item => {
        const maxName = this.convenienceFeeForm.value['maxLimit_' + item];
        fees[maxName] = {
          convenienceFee: this.convenienceFeeForm.value['convenienceFee_' + item],
          maxLimit: this.convenienceFeeForm.value['maxLimit_' + item],
          minLimit: this.convenienceFeeForm.value['minLimit_' + item],
        }
      })
      model = {
        rangeType: this.convenienceFeeForm.value.rangeType,
        transactionType: this.convenienceFeeForm.value.transactionType,
        isVatRequired: this.convenienceFeeForm.value.isVatRequired,
        isStampRequired: this.convenienceFeeForm.value.isStampRequired,
        name: nameObject[0].name,
        fees,
      }
    } else {
      model = {
        name: nameObject[0].name,
        rangeType: this.convenienceFeeForm.value.rangeType,
        transactionType: this.convenienceFeeForm.value.transactionType,
        isStampRequired: this.convenienceFeeForm.value.isStampRequired,
        isVatRequired: this.convenienceFeeForm.value.isVatRequired,
        convenienceFee: this.convenienceFeeForm.value['convenienceFee_1'],
        maxLimit: this.convenienceFeeForm.value['maxLimit_1'],
        minLimit: this.convenienceFeeForm.value['minLimit_1'],
      }
    }

    return model;

  }

  async updateAgencyFees() {

    const model: any = await this.structureModel();

    this.isLoadingResults = true
    this.agencyService.updateFees(model).subscribe(response => {
      this.isLoadingResults = false;
      this.utilService.triggerNotification(model.name + ' Admin Charges Updated')
      this.dialogRef.close();
    })


  }

  close(): void {
    this.dialogRef.close();
  }

}
