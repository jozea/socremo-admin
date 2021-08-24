import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ReportService } from 'src/app/services/report/report.service';


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  branchCreationForm: FormGroup;
  allStates = stateAndLocalGovt;
  isLoadingResults = false;


  constructor(
    public dialogRef: MatDialogRef<AddBranchComponent>,
    public formBuilder: FormBuilder,
    private utilService: UtilsService,
    private reportService: ReportService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {
    this.branchCreationForm = this.formBuilder.group({
      state: new FormControl('', Validators.required),
      branchName: new FormControl(''),
      branchAddress: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.compose([Validators.required])),
      longitude: new FormControl('', Validators.required),
      branchCode: new FormControl('', Validators.required),
    });
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

}
