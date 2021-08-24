import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { InvestmentService } from 'src/app/services/investment/investment.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-investment-setting',
  templateUrl: './investment-setting.component.html',
  styleUrls: ['./investment-setting.component.scss']
})
export class InvestmentSettingComponent implements OnInit {

  loanFilterForm: FormGroup;
  loading: boolean = false;
  displayedColumns: string[] = ['position', 'interestRate', 'startBoundAmount', 'higherBoundAmount']//'mobileNumber', 'noOfMonths', 'status','principal', 'WHT10Percent', 'expectedAmount', 'createdAt', 'updatedAt']
  dataSource: any = new MatTableDataSource([]);
  maxall: any;
  terms: any[]=[];
  details:any;
  pin: any;
  isPinInput: boolean=false
  isUpdatePinInput: boolean = false
  startBoundAmount: any;
  higherBoundAmount: any;
  interestRate: any;
  term: any;
  create: boolean=false;
  add: boolean=false;
  headerText: any = 'Create New Term'
  buttonText: any = 'Create'
  isDetail: boolean = false


  constructor(private utilService: UtilsService, private investmentService: InvestmentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loanFilterForm = this.formBuilder.group({
      term: new FormControl(''),
      action: new FormControl(''),
    });

    this.investmentService.getInvestmentTerms({}).then((response: any) => {
      response.data.forEach(e => {
        this.terms.push(e.term)
        this.terms.sort(function(a, b){return a-b});
      });
    })

  }

  handleLoanRequest() {
    let model = {
      term:this.loanFilterForm.value.term, 
    }
    this.loading = true;
    this.investmentService
      .getInvestmentTerms(model).then((response: any) => {
        this.dataSource = new MatTableDataSource(response.data[0].details);
        this.isDetail = false
        this.utilService.triggerNotification(response.message)
        // this.maxall = response.data.meta.total;
        this.loading = false;
      }).catch(error=> {
        this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
        this.loading = false;
      })
  }

  selectAction() {
    this.isPinInput = false
    if (this.loanFilterForm.value.action == 'create') {
      this.create = true;
      this.add = false;
      this.headerText = 'Create New Term';
      this.buttonText = 'Create'
      // this.clearFields()
      this.isInputValid()
    }else {
      this.create = false;
      this.add = true;
      this.headerText = 'Add Details to Term'
      this.buttonText = 'Add Details'
      // this.clearFields()
      this.isInputValid()
    }
  }

  clearFields() {
    this.term = '' 
    this.interestRate = '' 
    this.pin = ''
    this.startBoundAmount = '' 
    this.higherBoundAmount = '' 
  }

  addToInvestment() {
    let param = {
      term: this.term, 
      interestRate: this.interestRate, 
      pin: this.pin,
      startBoundAmount: this.startBoundAmount, 
      higherBoundAmount: this.higherBoundAmount, 
    }
    this.loading = true
    this.investmentService.addToInvestmentTerms(param).then((result: any)=> {
      this.utilService.triggerNotification(result.message)
      this.loading = false;
    }).catch(error=> {
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
      this.loading = false;
    })
  }

  createInvestmentTerm() {
    let param =   {
      term: this.term, 
      details:{
        interestRate: this.interestRate, 
        startBoundAmount: this.startBoundAmount, 
        higherBoundAmount: this.higherBoundAmount
      }, 
      pin: this.pin
    }
    this.loading = true
    this.investmentService.createInvestmentTerms(param).then((result: any)=> {
      this.utilService.triggerNotification(result.message)
      this.loading = false;
    }).catch(error=> {
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
      this.loading = false;
    })
  }

  updateInvestmentTerm() {
    let param = {
      term: this.loanFilterForm.value.term, 
      interestRate: this.details.interestRate, 
      pin: this.pin,
      startBoundAmount: this.details.startBoundAmount, 
      higherBoundAmount: this.details.higherBoundAmount, 
      id: this.details._id
    }
    this.loading = true
    this.investmentService.updateInvestmentTerms(param).then((result: any)=> {
      this.utilService.triggerNotification(result.message)
      this.loading = false;
    }).catch(error=> {
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
      this.loading = false;
    })
  }

  isInputValid() {
    if (
      this.term == undefined || 
      this.interestRate == undefined || 
      this.startBoundAmount == undefined || 
      this.higherBoundAmount == undefined
    ) {return true}
    return false
  }

  enterPin() {
    if (!this.isInputValid()) {
      this.isPinInput = !this.isPinInput;
    }
  }

  enterUpdatePin() {
    this.isUpdatePinInput = !this.isUpdatePinInput
  }

  openDialog(investment) {
    this.details = investment
    this.isDetail = true
  }

}
