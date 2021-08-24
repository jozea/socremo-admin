import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { genderSelection } from 'src/app/constants/constant';
import { ISelection } from 'src/app/models/iselection';
import { AgencyService } from 'src/app/services/agency_banking/agency.service';
import { UtilsService } from 'src/app/services/utils/utils.service';


@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.scss']
})
export class AddAgentComponent implements OnInit {

  details: any;
  agentCreationForm: FormGroup;

  genderTypes: ISelection[] = genderSelection;
  allStates = stateAndLocalGovt;
  allLocalGovernment = []
  allBanks = []
  isLoadingResults = false;


  constructor(
    public dialogRef: MatDialogRef<AddAgentComponent>,
    public formBuilder: FormBuilder,
    public agencyService: AgencyService,
    private utilService: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  ngOnInit() {
    this.fetchAllBanks()

      this.agentCreationForm = this.formBuilder.group({
        // personal information
        firstName: new FormControl('', Validators.required),
        middleName: new FormControl(''),
        lastName: new FormControl('', Validators.required),
        dateOfBirth: new FormControl('', Validators.compose([Validators.required])),
        emailAddress: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        aggregator: new FormControl(''),
        // business information
        businessName: new FormControl('', Validators.required),
        businessAddress: new FormControl('', Validators.required),
        businessPhone: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])),
        businessState: new FormControl('', Validators.required),
        businessLGA: new FormControl('', Validators.required),
        // account information
        accountNumber: new FormControl('', Validators.compose([Validators.maxLength(10), Validators.minLength(10)])),
        accountName: new FormControl('', Validators.required),
        bank: new FormControl('', Validators.required),
        bvn: new FormControl('', Validators.compose([Validators.maxLength(11), Validators.minLength(11)])),
        username: new FormControl('', Validators.required),
      });
  }

  fetchAllBanks() {
    this.agencyService.getAllBanks().subscribe((response) => {
      this.allBanks = response.data;
    })
  }

  async handleStateSelection() {    
    let filteredState = this.allStates.filter(item => item.alias === this.agentCreationForm.value.businessState );
    this.allLocalGovernment = filteredState[0].lgas;
  }

  async handleAddAgent() {
    this.isLoadingResults = true

    if(this.agentCreationForm.valid) {
      const { dateOfBirth, bvn, ...rest} = this.agentCreationForm.value;
      const model = {
        bvn: bvn ? bvn : "",
        dateOfBirth: dateOfBirth.toLocaleDateString(),
        ...rest
      }
      this.agencyService.createAgent(model).subscribe(response => {
        this.isLoadingResults = false;

        if(response.status) {
          this.utilService.triggerNotification("Agent created Successfully")
          this.dialogRef.close();
        }else {
          this.utilService.triggerNotification("Agent creation Failed")
        }
      }, (error) => {
        this.isLoadingResults = false;
        this.utilService.triggerNotification("Agent creation Failed")
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
