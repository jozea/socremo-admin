import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ReportService } from 'src/app/services/report/report.service';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ThirdPartiesComponent } from '../../third-parties/third-parties.component';


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  branchCreationForm: FormGroup;
  allStates = stateAndLocalGovt;
  isLoadingResults = false;
  action: any;
  headerText: any;
  branchId: any;
  items: FormArray;
  add: boolean = true;
  branchName: any;
  contactEmail:  any;
  updateDetails: any;
  hours: any[]=[
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];
  minutes: any[]=[
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
    '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
    '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
    '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',  ]
  timeOfTheDay: any[]=[
    'am', 'pm'
  ]

  hour: any = '';
  minute: any = '';
  time: any = '';
  hour2: any = '';
  minute2: any = '';
  time2: any = '';
  detailsHour: any;
  detailsMinute: any;
  detailsTime:any;
  detailsHour2: any;
  detailsMinute2: any;
  detailsTime2:any;

  openingHour: any;
  closingHour: any;
  isSubmitted: boolean = false;




  constructor(
    public dialogRef: MatDialogRef<AddBranchComponent>,
    public formBuilder: FormBuilder,
    private utilService: UtilsService,
    private reportService: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private cdref: ChangeDetectorRef

  ) { }


  ngOnInit() {
    this.branchCreationForm = this.formBuilder.group({
      branches: this.formBuilder.array([ this.createItem()])
    });
    
    this.action = this.data.action
    this.branchId = this.data.branch._id,
    this.updateDetails = this.data.row
    
    if (this.updateDetails != undefined) {
      if (this.updateDetails.openingHour.length == 6) {
        this.detailsHour = this.updateDetails.openingHour.substring(0, 1);
        this.detailsMinute = this.updateDetails.openingHour.substring(2, 4);
        this.detailsTime = this.updateDetails.openingHour.substring(4, 6);
        this.detailsHour2 = this.updateDetails.closingHour.substring(0, 1);
        this.detailsMinute2 = this.updateDetails.closingHour.substring(2, 4);
        this.detailsTime2 = this.updateDetails.closingHour.substring(4, 6);
        this.updateDetails.openingHour = `${this.detailsHour}:${this.detailsMinute}${this.detailsTime}`
        this.updateDetails.closingHour = `${this.detailsHour2}:${this.detailsMinute2}${this.detailsTime2}`
        // console.log(this.updateDetails.openingHour)
      }else {
        this.detailsHour = this.updateDetails.openingHour.substring(0, 2);
        this.detailsMinute = this.updateDetails.openingHour.substring(3, 5);
        this.detailsTime = this.updateDetails.openingHour.substring(5, 7);
        this.detailsHour2 = this.updateDetails.closingHour.substring(0, 2);
        this.detailsMinute2 = this.updateDetails.closingHour.substring(3, 5);
        this.detailsTime2 = this.updateDetails.closingHour.substring(5, 7);
        this.updateDetails.openingHour = `${this.detailsHour}:${this.detailsMinute}${this.detailsTime}`
        this.updateDetails.closingHour = `${this.detailsHour2}:${this.detailsMinute2}${this.detailsTime2}`
      }
    }
    if (this.action == 'create') {
      this.headerText = marker('branch.createBranch')
    }else if (this.action == 'add') {
      this.headerText = marker('branch.addBranch')
    }else {
      this.headerText = marker('branch.updateBranch')
    }
    // console.log(this.data)
  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }


  createItem(): FormGroup {
    return this.formBuilder.group({
      contactEmail: new FormControl('', Validators.email),
      branchName: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      area: new FormControl('', Validators.compose([Validators.required])),
      region: new FormControl('', Validators.required),
      openingHour: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(7)])),
      closingHour: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(7)])),
      gpsLocation: new FormControl('', Validators.required),
    });
  }

  addItem(): void {
    this.items = this.branchCreationForm.get('branches') as FormArray;
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

  async handleAddBranch() {
    this.isLoadingResults = true

    if (this.branchCreationForm.valid) {
      const model = {
        ...this.branchCreationForm.value
      }
      this.reportService.createBranch(model).subscribe(response => {
        this.isLoadingResults = false;

        if (response.status) {
          this.utilService.triggerNotification("Branch created Successfully")
          this.dialogRef.close();
        } else {
          this.utilService.triggerNotification(response.message)
        }
      }, (error) => {
        this.isLoadingResults = false;
        this.utilService.triggerNotification("Branch creation Failed")
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  createBranch() {
    this.branchCreationForm.value.openingHour = this.openingHour
    this.branchCreationForm.value.closingHour = this.closingHour
    if (this.branchCreationForm.valid  && this.openingHour != undefined && this.closingHour != undefined) {
      this.isSubmitted = true
      this.isLoadingResults = true
      this.reportService.createBranch(this.branchCreationForm.value).subscribe((res: any)=> {
  
        if (res.status) {
          this.utilService.triggerNotification(res.message)
          this.isLoadingResults = false;
          this.isSubmitted = true
          this.dialogRef.close();
        } else {
          this.utilService.triggerNotification(res.message)
          this.isLoadingResults = false;
          this.isSubmitted = true
        }
      }, (error) => {
        this.isLoadingResults = false;
        this.isSubmitted = true
        this.utilService.triggerNotification("Branch creation Failed")
      })
    }else {
      this.utilService.triggerNotification('Please enter all fields correctly');
    }

  }

  addBranch() {
    let branchDetail = this.branchCreationForm.value.branches[0]
    this.branchCreationForm.value.branches[0].openingHour = this.openingHour
    this.branchCreationForm.value.branches[0].closingHour = this.closingHour
    let model = {
      branchDetails: branchDetail,
      branchId: this.branchId
    }
    // console.log(model)
    if (this.branchCreationForm.valid && this.openingHour != undefined && this.closingHour != undefined) {
      this.isSubmitted = true
      this.isLoadingResults = true
      this.reportService.addBranch(model).subscribe((res: any)=> {
        if (res.status) {
          this.utilService.triggerNotification(res.message)
          this.isLoadingResults = false;
          this.isSubmitted = true
          this.dialogRef.close();
        } else {
          this.utilService.triggerNotification(res.message)
          this.isLoadingResults = false;
          this.isSubmitted = true
        }
      }, (error) => {
        this.isLoadingResults = false;
        this.isSubmitted = true
        this.utilService.triggerNotification("Branch addition Failed")
      })
    }else {
      this.utilService.triggerNotification('Please enter all fields correctly');
    }

  }

  changeHour(e) {
    if (this.action == 'add' || this.action == 'create') {
      this.hour = e
      this.openingHour = `${this.hour}:${this.minute}${this.time}`
      // console.log(this.hour, this.openingHour)
    }else {
      if(this.hour) {
        this.detailsHour = this.hour
        this.updateDetails.openingHour = `${this.detailsHour}:${this.detailsMinute}${this.detailsTime}`
      }if(this.hour2) {
        this.detailsHour2 = this.hour2
        this.updateDetails.closingHour = `${this.detailsHour2}:${this.detailsMinute2}${this.detailsTime2}`
      }
    }  
  }

  changeMinute(e) {
    if (this.action == 'add' || this.action == 'create') {
      this.minute = e
      this.openingHour = `${this.hour}:${this.minute}${this.time}`
    }else {
      if(this.minute ) {
        this.detailsMinute = this.minute
        this.updateDetails.openingHour = `${this.detailsHour}:${this.detailsMinute}${this.detailsTime}`
      }if(this.minute2) {
        this.detailsMinute2 = this.minute2
        this.updateDetails.closingHour = `${this.detailsHour2}:${this.detailsMinute2}${this.detailsTime2}`
      }
    }  
  }

  changeHourOfDay(e) {
    if (this.action == 'add' || this.action == 'create') {
      this.time = e
      this.openingHour = `${this.hour}:${this.minute}${this.time}`
    }else {
      if(this.time) {
        this.detailsTime = this.time
        this.updateDetails.openingHour = `${this.detailsHour}:${this.detailsMinute}${this.detailsTime}`
      }if(this.time2) {
        this.detailsTime2 = this.time2
        this.updateDetails.closingHour = `${this.detailsHour2}:${this.detailsMinute2}${this.detailsTime2}`
      }
    }  
  }

  changeHour2(e) {

    if (this.action == 'add' || this.action == 'create') {
      this.hour2 = e
      this.closingHour = `${this.hour2}:${this.minute2}${this.time2}`
    }else {
      if(this.hour) {
        this.updateDetails.openingHour = `${this.hour}:${this.minute}${this.time}`
      }if(this.hour2) {
        this.updateDetails.closingHour = `${this.hour2}:${this.minute2}${this.time2}`
      }
    }  
  }

  changeMinute2(e) {
    if (this.action == 'add' || this.action == 'create') {
      this.minute2 = e
      this.closingHour = `${this.hour2}:${this.minute2}${this.time2}`
    }else {
      if(this.minute ) {
        this.updateDetails.openingHour = `${this.hour}:${this.minute}${this.time}`
      }if(this.minute2) {
        this.updateDetails.closingHour = `${this.hour2}:${this.minute2}${this.time2}`
      }
    }  
  }

  changeHourOfDay2(e) {
    if (this.action == 'add' || this.action == 'create') {
      this.time2 = e
      this.closingHour = `${this.hour2}:${this.minute2}${this.time2}`
    }else {
      if(this.time) {
        this.updateDetails.openingHour = `${this.hour}:${this.minute}${this.time}`
      }if(this.time2) {
        this.updateDetails.closingHour = `${this.hour2}:${this.minute2}${this.time2}`
      }
    }  
  }
  
  updateBranch() {  
    let model = {
      branchName: this.updateDetails.branchName,
      contactEmail: this.updateDetails.contactEmail,
      openingHour: this.updateDetails.openingHour,
      closingHour: this.updateDetails.closingHour,
      branchId: this.updateDetails._id,
      id: this.branchId
    }
    // console.log(model)
    if (model != undefined) {
      this.isSubmitted = true
      this.isLoadingResults = true
      this.reportService.updateBranch(model).subscribe((res: any)=> {
  
        if (res.status) {
          this.utilService.triggerNotification(res.message)
          this.isLoadingResults = false;
          this.isSubmitted = true 
          this.dialogRef.close();
        } else {
          this.utilService.triggerNotification(res.message)
          this.isLoadingResults = false;
          this.isSubmitted = true
        }
      }, (error) => {
        this.isLoadingResults = false;
        this.isSubmitted = true
        this.utilService.triggerNotification("Update Failed")
      })
    }else {
      this.utilService.triggerNotification('Please enter all fields correctly')
    }
  }

}
