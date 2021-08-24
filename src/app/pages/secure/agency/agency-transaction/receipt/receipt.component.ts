import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { agentTransactionTypes, differentRangeTypes, exportConfig } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit, AfterViewInit {

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
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'receipt_section', 'Receipt')



  constructor(
    public dialogRef: MatDialogRef<ReceiptComponent>,
    public formBuilder: FormBuilder,
    public agencyService: AgencyService,
    private exportAsService: ExportAsService,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {

    this.details = this.data.detail;
    this.status = this.data.status;
    
  }

  ngAfterViewInit(): void {


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
