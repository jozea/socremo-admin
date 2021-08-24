import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { exportConfig } from 'src/app/constants/constant';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-assign-terminal',
  templateUrl: './assign-terminal.component.html',
  styleUrls: ['./assign-terminal.component.scss']
})
export class AssignTerminalComponent implements OnInit {

  userDetail: any;
  isLoadingResults = false;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'add_terminal_section', 'Receipt')

  allBanks = [];
  assignTerminalForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AssignTerminalComponent>,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {

    this.assignTerminalForm = this.formBuilder.group({
      bankId: new FormControl('', Validators.required),
    })
    this.userDetail = this.data.detail;    
  }

  async downloadFile(type: any) {

    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Receipt').subscribe((response) => {
      // save started
    }, (err) => {
      this.utilService.triggerNotification(err)     
      // console.log(err)
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
