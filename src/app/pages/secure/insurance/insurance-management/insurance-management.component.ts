import { Component, OnInit } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';
import { UtilsService } from 'src/app/services/utils/utils.service';


import { LoanService } from 'src/app/services/loan/loan.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-insurance-management',
  templateUrl: './insurance-management.component.html',
  styleUrls: ['./insurance-management.component.scss']
})
export class InsuranceManagementComponent implements OnInit {

  insuranceForm: FormGroup;
  editAdminFee: boolean = true;
  editInsuranceFee: boolean = true;
  editInterestRate: boolean = true;
  isLoadingResults: boolean = true;
  
  public Editor = ClassicEditor;
  public comment = '<p></p>';

  actions=['create', 'update']
  insuranceAction = 'create'
  insuranceData: any;
  isLoanDisabled: boolean;
  allLoanSettings: any;
  insuranceTitle: any
  loanSettingsPoints: any
  loanSettingsRequirements: any
  limit: any
  requirement: any
  items: FormArray;
  add: boolean = false;
  addNewReq:boolean = false
  addCoverage: boolean = false
  insuranceTemplate: any

  constructor(
    private insuranceService: InsuranceService,
    private utilService: UtilsService,
    public formBuilder: FormBuilder,
    public loanService: LoanService,
  ) { }

  ngOnInit() {
    this.insuranceForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      subtitle: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      requirements: this.formBuilder.array([ this.createItemReq()]),
      coverages: this.formBuilder.array([ this.createItemCovreage()]),
      limits: this.formBuilder.array([ this.createItem()])

    });
    this.fetchInsuranceTemplates()

  }

  createInsurance() {
    let value = this.insuranceForm.value
    let coverageArray = value.coverages.map(e=> {
      return e['coverage']
    })
    let requirementArray = value.requirements.map(e=> {
      return e['requirement']
    })
    let model = {
      title: value.title,
      subtitle: value.subtitle,
      coverage: coverageArray,
      body: {
        header: value.header,
        limits: value.limits
      },
      requirements: requirementArray
    }
    this.isLoadingResults = true
    this.insuranceService.createInsurance(model).subscribe((response: any)=> {
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    }, (error)=> {
      this.utilService.triggerNotification(error.message);
      this.isLoadingResults = false
    })
  }


  fetchInsuranceTemplates() {
    this.insuranceService.fetchAllInsurance({}).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.insuranceTemplate = response.data
        this.isLoadingResults =false
      }
    })
  }

  updateInsurance() {
    let model = {
      InsuranceTemplateId:this.templateId,  
      title: this.insuranceTitle 
    }
    this.isLoadingResults = true
    this.insuranceService.updateInsurance(model).subscribe((response: any)=> {
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
        location.reload()
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    }, (error)=> {
      this.utilService.triggerNotification(error.message);
      this.isLoadingResults = false
    })

  }



  createItem(): FormGroup {
    return this.formBuilder.group({
      beneficiary: new FormControl('', Validators.required),
      benefit: new FormControl('', Validators.required),
    });
  }

  addItem(): void {
    this.items = this.insuranceForm.get('limits') as FormArray;
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

  createItemCovreage(): FormGroup {
    return this.formBuilder.group({
      coverage: new FormControl('', Validators.required),
    });
  }

  addItemCoverage(): void {
    this.items = this.insuranceForm.get('coverages') as FormArray;
    this.items.push(this.createItemCovreage());
    if (this.items.length > 1) {
      this.addCoverage = true
    }
  }

  removevalueCoverage(){
    this.items.removeAt(1)
    if (this.items.length == 1) {
      this.addCoverage = false
    }
  }

  createItemReq(): FormGroup {
    return this.formBuilder.group({
      requirement: new FormControl('', Validators.required),
    });
  }

  addItemReq(): void {
    this.items = this.insuranceForm.get('requirements') as FormArray;
    this.items.push(this.createItemReq());
    if (this.items.length > 1) {
      this.addNewReq = true
    }
  }

  removevalueReq(){
    this.items.removeAt(1)
    if (this.items.length == 1) {
      this.addNewReq = false
    }
  }

  changeAction(event) {
    this.insuranceAction = event
    if (this.insuranceAction == 'create') {
      this.insuranceTitle = ''
    }
  }

  insuranceLimit
  insuranceRequirements
  insuranceCoverage
  templateId
  changeTitle(event) {
    this.insuranceTitle = event
    this.insuranceTemplate.forEach(e => {
      if (this.insuranceTitle === e.title) {
        this.insuranceData = e
        // console.log(e)
        this.templateId = this.insuranceData._id
        this.insuranceLimit = this.insuranceData.body.limits
        this.insuranceRequirements = this.insuranceData.requirements;
        this.insuranceCoverage = this.insuranceData.coverage;
      }
    });
  }

  changeStatus(event) {
    // console.log(event.value)
    if (event.value == 'true') {
      this.isLoanDisabled = true
    }else if(event.value == 'false') {
      this.isLoanDisabled = false
    }
  }

  updatedLimit
  beneficiary
  benefit
  changeLimit(event) {
    this.limit = event
    this.updatedLimit = event
    this.insuranceLimit.forEach(e => {
      if (e.beneficiary === this.updatedLimit) {
        this.beneficiary = e.beneficiary
        this.benefit = e.benefit
      }
    });
    
    // console.log(this.insuranceLimit)
  }

  updatedRequirement
  changeRequirement(event) {
    this.requirement = event
    this.updatedRequirement = event
  }

  newLimit: any
  addPoint() {
    this.newLimit = this.limit
    let newArr = this.insuranceLimit.map(e => {
      if (e.beneficiary === this.updatedLimit) {
        e.beneficiary = this.beneficiary 
        e.benefit = this.benefit
      }
      return e
    });
    this.insuranceLimit = newArr
    // console.log(this.insuranceLimit)
  }

  newRequirement: any
  addReq() {
    this.newRequirement = this.requirement
    let newArr = this.insuranceRequirements.map(e => {
      if (e === this.updatedRequirement) {
        e = this.newRequirement
      }
      return e
    });
    this.insuranceRequirements = newArr
  }

  updatedCoverage
  coverage
  changeCoverage(event) {
    this.coverage = event
    this.updatedCoverage = event
  }

  newCoverage: any
  addCov() {
    this.newCoverage = this.coverage
    let newArr = this.insuranceCoverage.map(e => {
      if (e === this.updatedCoverage) {
        e = this.newCoverage
      }
      return e
    });
    this.insuranceCoverage = newArr
  }


}
