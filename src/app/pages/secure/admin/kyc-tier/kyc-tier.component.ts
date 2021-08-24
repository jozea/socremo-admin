import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-kyc-tier',
  templateUrl: './kyc-tier.component.html',
  styleUrls: ['./kyc-tier.component.scss']
})
export class KycTierComponent implements OnInit {

  KycTier: string;
  KycTierId: string;
  isLoadingResults = false;
  KycTierForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<KycTierComponent>,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {

    this.KycTierForm = this.formBuilder.group({
      version: new FormControl('', Validators.required),
    })

    this.authService.getKycTier().subscribe(response => {
      if(response.status === true) {
        this.KycTier = response.data[0].currentVersion;
        this.KycTierId = response.data[0]._id;
      }else {
        this.utilService.triggerNotification(response.message)
      }
    }, (err) => {
      this.utilService.triggerNotification(err.message || "Could not fetch current version")
    })
  }

  updateKycTier() {
    const model = {
      _id: this.KycTierId,
      currentVersion: this.KycTierForm.value.version,
    }

    this.authService.updateKycTier(model).subscribe(response => {
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
