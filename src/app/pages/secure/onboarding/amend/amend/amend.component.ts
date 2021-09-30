import { ChangeDetectorRef, Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExportAsService } from 'ngx-export-as';
import { CorporateService } from 'src/app/services/corporate/corporate.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-amend',
  templateUrl: './amend.component.html',
  styleUrls: ['./amend.component.scss']
})
export class AmendComponent implements OnInit {

  broadcastMessageForm: FormGroup;
  isLoading=false
  items: FormArray;
  add = false
  count = 1
  accFirstName:any;
  accLastName: any;
  onBoardDetails = [{companyName: 'Geosea Effect', companyAccount: '1111111111'}]
  arr = []
  corporateInfo: any;

  constructor(
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private loanService: LoanService,
    private utilService: UtilsService,
    private corporateService: CorporateService,
    public dialog: MatDialog,
    // public dialogRef: MatDialogRef<AmendComponent>,
    public utilServices: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {   }

  ngOnInit(): void {
    // console.log(this.data)
    this.arr = this.data.details.representativesInfo
    this.corporateInfo = this.data.details
    // console.log(this.arr)
    
    // this.broadcastMessageForm = this.formBuilder.group({
    //   firstName: new FormControl('', Validators.required),
    //   lastName: new FormControl('', Validators.required),
    //   email: new FormControl('', Validators.required),
    //   mobileNumber: new FormControl('', Validators.required),
      
    // })

  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }

  createItem(): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobileNumber: new FormControl('')
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
    if (this.items.length == 1) {
      this.add = false
    }
  }

  getAccountDetails() {
    let acc = this.broadcastMessageForm.value.accountNumber
    if (acc.length == 10) {
      this.corporateService.getDetailsByAccount(this.broadcastMessageForm.value.accountNumber).subscribe((res: any)=> {
        // console.log(res)
        let a = res.data.accountName
        let nameArr = a.split(' ');
        // console.log(nameArr);
        this.accFirstName = nameArr[2]
        this.accLastName = nameArr[1]
      })
    }
    
  }

  updateRepresentative(item) {
    this.isLoading = true
    let param = {
      reference: this.corporateInfo.reference, 
      repId: item._id, 
      email: item.email, 
      firstName: item.firstName
    }
    // console.log(param)
    this.corporateService.updateRep(param).then((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message);
        this.isLoading = false
      }else {
        this.utilService.triggerNotification(response.message);
        this.isLoading = false
      }
    }, error=> {
      this.utilService.triggerNotification(error.error.message);
      this.isLoading = false
    })
  }

  submit() {
    // console.log(this.arr)
    // this.corporateService.onBoardUsers(this.broadcastMessageForm.value).then((resp: any)=> {
    //   console.log(resp)
    //   this.onBoardDetails = resp.data
    //   // let a = details.accountFirstName
    //   // let b = details.accountLastName
    //   // let d = details.accountNumber
    //   // let c = `${a} ${b}`
    // }).catch(error=> {
    //   console.log(error)
    // })
  }

  

}
