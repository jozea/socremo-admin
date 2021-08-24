import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-app-version',
  templateUrl: './app-version.component.html',
  styleUrls: ['./app-version.component.scss']
})
export class AppVersionComponent implements OnInit {

  appVersion: string;
  appVersionId: string;
  isLoading = false;
  isLoadingResults = false;
  appVersionForm: FormGroup;

  appUpdate
  yes = true
  no = false

  constructor(
    public dialogRef: MatDialogRef<AppVersionComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {

    this.appVersionForm = this.formBuilder.group({
      version: new FormControl('', Validators.required),
    })

    this.authService.getAppVersion().subscribe(response => {
      if(response.status === true) {
        this.appVersion = response.data[0].currentVersion;
        this.appVersionId = response.data[0]._id;
      }else {
        this.utilService.triggerNotification(response.message)
      }
    }, (err) => {
      this.utilService.triggerNotification(err.message || "Could not fetch current version")
    })
  }

  
  forceAppUpdate(e) {
    if (e.value == true) {
      this.appUpdate = true
    }else {
      this.appUpdate = false
    }
  }

  
  updateAppVersion() {
    this.isLoading =true;
    const model = {
      _id: this.appVersionId,
      currentVersion: this.appVersionForm.value.version,
      forceUpdate: this.appUpdate
    }
    this.authService.updateAppVersion(model).subscribe(response => {
      this.utilService.triggerNotification(response.message || 'App Version Updated');
      this.close()
    }, (err: any) => {
      this.utilService.triggerNotification(err.message || 'Could not update app version');
      this.close()
    })
  }

  close(): void {
    this.dialogRef.close();
  }

}
