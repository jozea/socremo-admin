import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ticket-comments',
  templateUrl: './ticket-comments.component.html',
  styleUrls: ['./ticket-comments.component.scss']
})
export class TicketCommentsComponent implements OnInit {

  public Editor = ClassicEditor;
  public comment = '<p></p>';


  // comment: any;
  isLoadingResults: boolean = false;
  ticketDetails: any;

  constructor(
    public dialogRef: MatDialogRef<TicketCommentsComponent>,
    public formBuilder: FormBuilder,
    public utilService: UtilsService,
    public userService: UserService,
    private report: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.ticketDetails = this.data.ticket

  }

  close() {

  }

  commentOnTicket() {
    let model = {
      ticketId: this.ticketDetails._id,
      message: this.comment
    }
    // console.log(model)
    this.isLoadingResults = true
    this.report.commentOnTicket(model).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
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
