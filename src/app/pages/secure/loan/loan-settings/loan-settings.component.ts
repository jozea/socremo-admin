import { LoanService } from 'src/app/services/loan/loan.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils/utils.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-loan-settings',
  templateUrl: './loan-settings.component.html',
  styleUrls: ['./loan-settings.component.scss']
})
export class LoanSettingsComponent implements OnInit {
  loanSettingsForm: FormGroup;
  editAdminFee: boolean = true;
  editInsuranceFee: boolean = true;
  editInterestRate: boolean = true;
  isLoadingResults: boolean = true;
  
  public Editor = ClassicEditor;
  public comment = '<p></p>';

  actions=['create', 'update']
  loanAction = 'create'
  loanSettings: any;
  isLoanDisabled: boolean;
  allLoanSettings: any;
  loanSettingsTitle: any
  loanSettingsPoints: any
  loanSettingsRequirements: any
  point: any
  requirement: any
  items: FormArray;
  add: boolean = false;
  addNewReq:boolean = false

  handleButtonEdit(type: string) {
    switch (type) {
      case 'admin':
        this.editAdminFee = !this.editAdminFee;
        this.editInsuranceFee = true
        this.editInterestRate = true
        break;
      case 'insurance':
        this.editInsuranceFee = !this.editInsuranceFee;
        this.editInterestRate = true
        this.editAdminFee = true
        break;
      case 'interest':
        this.editInterestRate = !this.editInterestRate;
        this.editInsuranceFee = true
        this.editAdminFee = true
        break;
      default:
        this.editAdminFee = true;
        this.editInsuranceFee = true;
        this.editInterestRate = true;
        break;
    }
  }

  async saveSettingsConfig() {
    this.editAdminFee = true;
    this.editInsuranceFee = true;
    this.editInterestRate = true;
    this.isLoadingResults = true;

    await this.updateSettings(this.loanSettingsForm.value)
    await this.fetchSettings()

  }

  discardChange() {
    this.isLoadingResults = true
    this.fetchSettings()
  }


  constructor(
    public formBuilder: FormBuilder,
    public loanService: LoanService,
    public utilService: UtilsService,
  ) { }

  ngOnInit() {
    this.loanSettingsForm = this.formBuilder.group({
      interestRate: new FormControl('',  Validators.required),
      processingFee: new FormControl('', Validators.required),
      minAmount: new FormControl('', Validators.required),
      maxAmount: new FormControl('', Validators.required),
      minTenure: new FormControl('', Validators.required),
      maxTenure: new FormControl('', Validators.required),
      disableLoan: new FormControl(''),
      title: new FormControl('', Validators.required),
      subtitle: new FormControl('', Validators.required),
      footer: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      points: this.formBuilder.array([ this.createItem()]),
      requirements: this.formBuilder.array([ this.createItemReq()])
    });
    this.fetchSettings()
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      point: new FormControl('', Validators.required),
    });
  }

  addItem(): void {
    this.items = this.loanSettingsForm.get('points') as FormArray;
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

  createItemReq(): FormGroup {
    return this.formBuilder.group({
      requirement: new FormControl('', Validators.required),
    });
  }

  addItemReq(): void {
    this.items = this.loanSettingsForm.get('requirements') as FormArray;
    this.items.push(this.createItemReq());
    if (this.items.length > 1) {
      this.addNewReq = true
    }
  }

  removevalueReq(){
    this.items.removeAt(1)
    if (this.items.length == 1) {
      this.addNewReq = false
    }
  }

  fetchSettings() {
    this.loanService.getLoanSettings().subscribe(response => {
      // console.log(response.data)
      if (response.status == true) {
        this.allLoanSettings = response.data
      }

      if (response.status === true) {
        const { adminFee, insuranceFee, interestRate } = response.data
        this.loanSettingsForm.reset({
          adminFee,
          insuranceFee,
          interestRate,
        });
      }
      this.isLoadingResults = false
    })
    this.isLoadingResults = false

  }

  updateSettings(model) {

    this.loanService.updateLoanSettings(model).subscribe(response => {
      this.utilService.triggerNotification(response.message)
    })
  }

  changeAction(event) {
    this.loanAction = event
    if (this.loanAction == 'create') {
      this.loanSettingsTitle = ''
    }
  }

  changeTitle(event) {
    this.loanSettingsTitle = event
    this.allLoanSettings.forEach(e => {
      if (this.loanSettingsTitle === e.title) {
        this.loanSettings = e
        this.loanSettingsPoints = this.loanSettings.body.points
        this.loanSettingsRequirements = this.loanSettings.requirements;
      }
    });
  }

  changeStatus(event) {
    // console.log(event.value)
    if (event.value == 'true') {
      this.isLoanDisabled = true
    }else if(event.value == 'false') {
      this.isLoanDisabled = false
    }
  }

  updatedPoint
  changePoint(event) {
    this.point = event
    this.updatedPoint = event
  }

  updatedRequirement
  changeRequirement(event) {
    this.requirement = event
    this.updatedRequirement = event
  }

  createLoanSettings() {
    let settingsValue = this.loanSettingsForm.value
    let points = settingsValue.points.map(function(item) {
      return item['point'];
    });
    let requirements = settingsValue.requirements.map(function(item) {
      return item['requirement'];
    });
    let model = {
      processingFee: settingsValue.processingFee,
      minAmount: settingsValue.maxAmount,
      maxAmount: settingsValue.maxAmount,
      minTenure: settingsValue.minTenure,
      maxTenure: settingsValue.maxTenure,
      disableLoan: this.isLoanDisabled,
      title: settingsValue.title,
      subtitle: settingsValue.subtitle,
      interestRate: settingsValue.interestRate,
      footer:settingsValue.footer,
      // imageUrl:"htp://sample-img.jpg",
      imageUrl:this.newImage,
      body: {
        header: settingsValue.header,
        points: points
      },
      requirements: requirements
    }

    // console.log(model)
    this.isLoadingResults = true
    this.loanService.createLoanSettings(model).subscribe((response: any)=> {
      // console.log(response)
        if (response.status == true) {
          this.utilService.triggerNotification(response.message)
          this.isLoadingResults = false
          this.resetForm()
        }else {
          this.utilService.triggerNotification(response.message)
          this.isLoadingResults = false
        }
      }, (error)=> {
        this.utilService.triggerNotification(error.message);
        this.isLoadingResults = false
      })
  }

  newPoint: any
  addPoint() {
    this.newPoint = this.point
    let newArr = this.loanSettingsPoints.map(e => {
      if (e === this.updatedPoint) {
        e = this.newPoint
      }
      return e
    });
    this.loanSettingsPoints = newArr
  }

  newRequirement: any
  addReq() {
    this.newRequirement = this.requirement
    let newArr = this.loanSettingsRequirements.map(e => {
      if (e === this.updateSettings) {
        e = this.newRequirement
      }
      return e
    });
    this.loanSettingsRequirements = newArr
  }

  updateLoanSettings() {
    let model = {
      processingFee: this.loanSettings.processingFee, 
      id: this.loanSettings._id,  
      body: {
        header: this.loanSettings.body.header,
        points: this.loanSettingsPoints
      }
    }
    // console.log(model)
    this.isLoadingResults = true
    this.loanService.updateLoanSetting(model).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
        this.resetForm()
      }else {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResults = false
      }
    }, (error)=> {
      this.utilService.triggerNotification(error.message);
      this.isLoadingResults = false
    })

  }

  resetForm() {
    if (this.loanAction == 'create') {
      this.loanSettingsForm.reset({
        interestRate: '',
        processingFee: '',
        minAmount: '',
        maxAmount: '',
        minTenure: '',
        maxTenure: '',
        disableLoan: new FormControl(''),
        title: '',
        subtitle: '',
        footer: '',
        header: '',
        points:[],
        requirements: []
      });
    }else if (this.loanAction == 'update') {
      location.reload()
    }
  }



  public files: any[];


  newImage
  baseUrl: string = environment.baseUrl;
  onFileChanged(event: any) {
    this.files = event.target.files;
    // console.log(this.files[0])
    this.newImage = this.files[0].name
    if (this.files.length > 0) {
      this.onUpload()
    }
  }

  onUpload() {
    const formData = new FormData();
    // console.log(this.files)
    for (const file of this.files) {
      formData.append('name', file, file.name);
      // console.log(formData)
    }
    this.loanService.imageUpload(formData).subscribe((response: any)=> {
      // console.log(response)
      if (response.status == true) {
        this.newImage = `${this.baseUrl}files/public/admin/loan-image/${response.data[0].filename}`
        // console.log(this.newImage)
        // http://167.172.100.241:3333/api/files/public/admin/loan-image/boy.jpg
      }
    })
    // this.http.post('url', formData).subscribe(x => ....);
  }


  

  // imageFile
  // imageFileLength
  // imageCompress
  // imgData
  // handleImageUpload(fileInput: any): void {
  //   console.log('image')
  //   this.imageFile = fileInput.target.files[0];
  //   this.imageFileLength = fileInput.target.files.length;
  //   if (fileInput.target.files && fileInput.target.files[0]) {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const image = new Image();
  //       image.src = e.target.result;
  //       image.onload = rs => {
  //         this.imgData = e.target.result;
  //         // image compression
  //         this.imageCompress.compressFile(e.target.result, -2, 50, 70).then(
  //           result => {
  //             this.imgData = result;
  //             // converting result back to a file
  //             fetch(this.imgData)
  //               .then(res => res.blob())
  //               .then(blob => {
  //                 this.imageFile = new File([blob], this.imageFile.name, {
  //                   type: this.imageFile.type,
  //                 });
  //               });
  //           }
  //         );
  //       };
  //     };
  //     reader.readAsDataURL(fileInput.target.files[0]);
  //   }
  // }

}
