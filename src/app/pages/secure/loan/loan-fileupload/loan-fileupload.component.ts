import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxCsvParser } from "ngx-csv-parser";
import { NgxCSVParserError } from "ngx-csv-parser";
import { LoanService } from 'src/app/services/loan/loan.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-loan-fileupload',
  templateUrl: './loan-fileupload.component.html',
  styleUrls: ['./loan-fileupload.component.scss']
})
export class LoanFileuploadComponent implements OnInit {

  renewalScore: any 
  loading: boolean = false;
  dataSource: any = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'position',
    'address',
    'approvalOfficer',
    'balanceOutstanding',
    'branch',
    'businessAddress',
    'cef',
    'cifLoanOfficer',
    'cif',
    'contractNo',
    'clientName',
    'groupId', 
    'groupName', 
    'loanCycle',
    'loanProduct',
    'maturityDate',
    'maxNewLoan',
    'mobileNo',
    'newTerm',
    'oldLoan', 
    'oldTerm',
    'process',
    'scoreDate',
    'strategy',
    'totalScore' 
  ] 
  renewalScoreRecord:any;
  submitButton: boolean = false;
  
  constructor(
    private ngxCsvParser: NgxCsvParser, private loan: LoanService,
    private utilService: UtilsService
    ) { }

  ngOnInit(): void {
    // this.formatUploadDate('08/02/2021')
  }

  formatUploadDate(date) {
    let newDate = new Date(date);
    // console.log(newDate)
    let d = this.utilService.formatDate(newDate)
    // console.log(d)
    return d

  }

  convertFile(ev) {
    // console.log(ev);
    this.utilService.triggerNotification("File added successfully");
    this.loading = true
    let files = ev.target.files;
    this.ngxCsvParser.parse(files[0], { header: true, delimiter: "," })
      .pipe()
      .subscribe((result: Array<any>) => {
        this.submitButton = true;
        this.renewalScore = result
        this.renewalScoreRecord = {
          renewalScoreRecord: result
        }
        this.loading = false
        this.dataSource = new MatTableDataSource(this.renewalScore);
        // this.maxall = response.data.meta.total;
        // this.loading = false;
      }, (error: NgxCSVParserError) => {
        this.utilService.triggerNotification("Could not process csv file");
        this.loading = false
      }
      );
  }

  storeRenewalScoreRecord() {
    this.loading = true
    this.submitButton = false;
    // console.log(this.renewalScoreRecord)
    this.loan.storeRenewalScore(this.renewalScoreRecord).subscribe((res: any)=>{
      // console.log(res)
      if (res.status == true) {
        this.utilService.triggerNotification(res.message)
        this.loading = false
      }
    }, (error: any) => {
      this.utilService.triggerNotification(error.status ?'Network Issues. Try again' : 'Error processing data')
      this.dataSource = new MatTableDataSource([]);
      this.loading = false;
    })
  }

  uploadFile() {
    document.getElementById("fileID").click();
  }

}


// let d = JSON.stringify(result)
        // console.log(d)
        // let o = d.replace(/( +)(?=[(\w* *]*":)/g, "")
        // let j = d.replace(/[^A-Z0-9]+/ig, "")
        // console.log(o)
        // let k = JSON.parse(o)
        // let r = JSON.stringify(j)
        
        // const obj1 = {"example1.":"sometext.","example2.":"anothertext."};
        // const obj2 = {};
        // for (const key of Object.getOwnPropertyNames(d)) {
        //   obj2[key.replace(/[|&;$%@."<>()+,]/g, "")] = d[key];
        // }
        
        // console.log(obj2);
        
        // console.log(k)
        // console.log(j)
        // console.log(r)

        // let renewalRecord = k.map(rec => {
        //   return {
        //     'address': rec.Address,
        //     'approvalOfficer': rec.ApprovalOfficer,
        //     'balanceOutstanding': rec.BalanceOutstanding,
        //     'branch': rec.Branch,
        //     'businessAddress': rec.BusinessAddress ,
        //     'cef': rec.CEF,
        //     'cifLoanOfficer': rec.CIFLoanOfficer ,
        //     'cif': rec.CIF,
        //     'contractNo': rec.CONTRACTNO,
        //     'clientName': rec.ClientName,
        //     'groupId': rec.GroupID, 
        //     'groupName': rec.GroupName, 
        //     'loanCycle': rec.LoanCycle,
        //     'loanProduct': rec.LoanProduct,
        //     'maturityDate': rec.MaturityDate,
        //     'maxNewLoan': rec.MaxNewLoan,
        //     'mobileNo': rec.MobileNo,
        //     'newTerm': rec.NewTerm,
        //     'oldLoan': rec.OldLoan, 
        //     'oldTerm': rec.OldTerm,
        //     'process': rec.Process,
        //     'scoreDate': rec.ScoreDate,
        //     'strategy': rec.Strategy,
        //     'totalScore': rec.TotalScore
                       
        //      }
        //   })
