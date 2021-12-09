
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChequeService } from 'src/app/services/cheque/cheque.service';
import { ReportService } from 'src/app/services/report/report.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-cheque-action',
  templateUrl: './cheque-action.component.html',
  styleUrls: ['./cheque-action.component.scss']
})
export class ChequeActionComponent implements OnInit {

  ticketSettingsForm2: FormGroup;
  chequeSettingsForm: FormGroup;
  isLoadingResults = false;
  problemDetail: any;
  problemDetail2: any;
  action: any;
  categoryId: any;
  ticketDetails:any;
  chequeDetail: any

  constructor(
    public formBuilder: FormBuilder,
    public utilService: UtilsService,
    private report: ReportService,
    private chequeService: ChequeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChequeActionComponent>,

  ) { }



  ngOnInit(): void {
    // this.ticketSettingsForm2 = this.formBuilder.group({
    //   problemTypeId: new FormControl('', Validators.required),
    //   categoryId: new FormControl('', Validators.required),
    //   category: new FormControl('', Validators.required),
    // })

    this.chequeSettingsForm = this.formBuilder.group({
      // problemTypeId: new FormControl('', Validators.required),
      // categoryObj: this.formBuilder.group({
        reason: new FormControl('', Validators.required),
        // description: new FormControl('', Validators.required),
      // })
    })

    console.log(this.data)
    this.problemDetail2 = this.data.typeId
    this.problemDetail = this.data.ticket
    this.categoryId = this.data.ticket
    this.action = this.data.action
    this.ticketDetails = this.data.ticket
    this.chequeDetail = this.data.cheque
  }
  
  submitTicketSettings(type) {
    let model
    let action
    if (type == 'update') {
      action = 'Updated'
      model = {
        problemTypeId: this.problemDetail2._id, 
        categoryId: this.categoryId._id, 
        category: this.categoryId.category
      }
    }else {
      if (this.chequeSettingsForm.valid) {
        action = 'Added'
        model = {
          problemTypeId: this.problemDetail._id, 
          categoryObj:this.chequeSettingsForm.value
        }
      }
    }
    // console.log(type, model)
    if (model != undefined && type == 'update') {
      this.isLoadingResults = true
      this.report.updateTicket(model).subscribe((response: any)=> {
        // console.log(response)
        if (response.status == true) {
          this.utilService.triggerNotification(response.message)
          this.close()
          this.isLoadingResults = false
        }else {
          this.utilService.triggerNotification(response.message)
          this.isLoadingResults = false
        }
      },error=> {
        this.utilService.triggerNotification(error.message)
        this.isLoadingResults = false
      })
    }else if (model != undefined && type == 'add') {
      this.isLoadingResults = true
      this.report.addTicket(model).subscribe((response: any)=> {
        // console.log(response)
        if (response.status == true) {
          this.utilService.triggerNotification(response.message)
          this.close()
          this.isLoadingResults = false
        }else {
          this.utilService.triggerNotification(response.message)
          this.isLoadingResults = false
        }
      },error=> {
        this.utilService.triggerNotification(error.message)
        this.isLoadingResults = false
      })
    }
  }

  close() {
    this.dialogRef.close();

  }

  deleteType() {
    this.isLoadingResults = true
    this.report.deleteProblemType(this.problemDetail._id).subscribe((resp: any)=> {
      // console.log(resp)
        if (resp.status == true) {
          this.utilService.triggerNotification(resp.message)
          this.isLoadingResults = false
          this.close()
        }else {
          this.utilService.triggerNotification(`Failed`)
          this.isLoadingResults = false
        }
      },error=> {
        this.utilService.triggerNotification(error.message)
        this.isLoadingResults = false
      })
  }

  deleteCategory() {
    this.isLoadingResults = true
    this.report.deleteProblemCategory(this.problemDetail2._id, this.categoryId._id).subscribe((resp: any) => {
      // console.log(resp)
      if (resp.status == true) {
        this.utilService.triggerNotification(resp.message)
        this.isLoadingResults = false
        this.close()
      } else {
        this.utilService.triggerNotification(`Failed`)
        this.isLoadingResults = false
      }
    }, error => {
      this.utilService.triggerNotification(error.message)
      this.isLoadingResults = false
    })
  }

  closeTicket() {
    let model = {
      ticketId: this.ticketDetails._id
    }
    this.isLoadingResults = true
    this.report.closeTicket(model).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
        this.close()
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    },error=> {
      this.utilService.triggerNotification(error.message)
      this.isLoadingResults = false
    })
  }

  closeChequeBook() {
    let model = {
      chequeBookId: this.chequeDetail._id, 
      comment: this.chequeSettingsForm.value.reason
    }
    this.isLoadingResults = true
    this.chequeService.closCheckBook(model).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
        this.close()
      }
    }, err=> {
      this.utilService.triggerNotification('Please try again')
    })
  }

}
