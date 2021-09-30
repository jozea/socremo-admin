import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-ticket-action',
  templateUrl: './ticket-action.component.html',
  styleUrls: ['./ticket-action.component.scss']
})
export class TicketActionComponent implements OnInit {

  ticketSettingsForm2: FormGroup;
  ticketSettingsForm3: FormGroup;
  isLoadingResults = false;
  problemDetail: any;
  problemDetail2: any;
  action: any;
  categoryId: any;

  constructor(
    public formBuilder: FormBuilder,
    public utilService: UtilsService,
    private report: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TicketActionComponent>,



  ) { }

  ngOnInit(): void {
    // this.ticketSettingsForm2 = this.formBuilder.group({
    //   problemTypeId: new FormControl('', Validators.required),
    //   categoryId: new FormControl('', Validators.required),
    //   category: new FormControl('', Validators.required),
    // })

    this.ticketSettingsForm3 = this.formBuilder.group({
      // problemTypeId: new FormControl('', Validators.required),
      // categoryObj: this.formBuilder.group({
        category: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
      // })
    })

    // console.log(this.data)
    this.problemDetail2 = this.data.typeId
    this.problemDetail = this.data.ticket
    this.categoryId = this.data.ticket
    this.action = this.data.action
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
      if (this.ticketSettingsForm3.valid) {
        action = 'Added'
        model = {
          problemTypeId: this.problemDetail._id, 
          categoryObj:this.ticketSettingsForm3.value
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

}
