import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaqService } from 'src/app/services/faq/faq.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-faq-settings',
  templateUrl: './faq-settings.component.html',
  styleUrls: ['./faq-settings.component.scss']
})
export class FaqSettingsComponent implements OnInit {

  faqForm: FormGroup
  isLoadingResult: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private faqService: FaqService,
    private utilService: UtilsService
  ) { }

  ngOnInit(): void {
    this.faqForm = this.formBuilder.group({
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required)
    });
  }

  addFaq() {
    let model = {
      question: this.faqForm.value.question, 
      answer:this.faqForm.value.answer
    }
    // console.log(model)
    this.isLoadingResult =true
    this.faqService.addFAQ(model).subscribe((response: any)=> {
      if (response.status == true) {
        this.utilService.triggerNotification(response.message)
        this.isLoadingResult = false
      }
    }, error=>{
      this.utilService.triggerNotification(error.message)
      this.isLoadingResult = false
    })

  }

  editFaq() {
    let model = {
      question:"Do you have insurance products", 
      answer:"Yes we do", 
      faqId:"61bf9ad420c5de82b20d3c02"
    }
    console.log(model)

  }

  // close(): void {
  //   this.dialogRef.close();
  // }

}
