import { AddBranchComponent } from './add-branch/add-branch.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { exportConfig,  transactionStatus } from 'src/app/constants/constant';
import { ReportService } from 'src/app/services/report/report.service';
import { ISelection } from 'src/app/models/iselection';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { stateAndLocalGovt } from 'src/app/constants/nigeria_state';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['position', 'branchName', 'contactEmail', 'contactNumber', 'region', 'area', 'gpsLocation'];
  dataSource: any = new MatTableDataSource([]);;
  searchFilterForm: FormGroup;
  exportAsConfig: ExportAsConfig = exportConfig('pdf', 'branches_table', 'Referral')
  maxDate: Date;
  isLoadingResults = false;
  requestModel: any = {}
  allStatus: ISelection[] = transactionStatus;
  maxall: number = 1000;
  allStates = stateAndLocalGovt;

  renewalScoreRecord:any;
  submitButton: boolean = false;
  renewalScore: any 

  branchData: any[] = [
    // {branchName:'Baixa',	contactEmail:'Isabel.Augusto@Socremo.com',	contactNumber:'877618804', region:'Maputo',	area:'Baixa',	gpsLocation:'25°58\'16.2"S 32°34\'04.5"E'},
    // {branchName:'Sede',	contactEmail:'Info@Socremo.com',	contactNumber:'843211565',	region:'Maputo',	area:'Museu',	 gpsLocation:'25°58\'28.10"S 32°35\'22.70"E'},
    // {branchName:'Xiquelene', contactEmail:'Diquisson.Longote@Socremo.com',	contactNumber:'877618802',	region:'Maputo',	area:'Xiquelene',	gpsLocation:'25°55\'33.4"S 32°36\'21.5"E'},
    // {branchName:'Benfica', contactEmail:'Ersilio.Churi@Socremo.com',	contactNumber:'877618805',	region:'Maputo',	area:'Benfica',	gpsLocation:'25°53\'42.8"S 32°33\'49.4"E'},
    // {branchName:'Xipamanine', contactEmail:'Marcelo.Junior@Socremo.com',	contactNumber:'877618801',	region:'Maputo',	area:'Alto-Maé',	gpsLocation:'23°52\'05.0"S 35°23\'07.5"E'},
    // {branchName:'Boane', contactEmail:'Nico.Mahanjane@Socremo.com',	contactNumber:'867618797',	region:'Maputo',	area:'Boane',	gpsLocation:'26°02\'38.6"S 32°19\'43.0"E'},
    // {branchName:'Matola', contactEmail:'Dulce.chissumba@Socremo.com',	contactNumber:'877618803',	region:'Maputo',	area:'Matola 700',	gpsLocation:'25°56\'07.8"S 32°28\'02.3"E'},
    // {branchName:'Beira', contactEmail:'Sandra.Mandude@Socremo.com',	contactNumber:'877618794',	region:'Sofala',	area:'Chaimite',	gpsLocation:'19°50\'05.7"S 34°50\'12.9"E'},
    // {branchName:'Quelimane', contactEmail:'Andre.Chamussora@Socremo.com',	contactNumber:'877618791',	region:'Quelimane',	area:'Quelimane',	gpsLocation:'17°52\'41.80"S 36°53\'8.40"E'},
    // {branchName:'Tete', contactEmail:'David.Mumba@Socremo.com',	contactNumber:'867618792',	region:'Tete',	area:'Tete',	gpsLocation:'16°09\'32.8"S 33°35\'00.5"E'},
    // {branchName:'Chimoio', contactEmail:'Malven.Pedro@Socremo.com',	contactNumber:'877618795',	region:'Manica',	area:'Chimoio',	gpsLocation:'19°06\'47.3"S 33°28\'55.8"E'},
    // {branchName:'Xai-Xai', contactEmail:'Alexandre.Nweti@Socremo.com',	contactNumber:'877618796',	region:'Gaza',	area:'Xai-Xai',	gpsLocation:'25°02\'54.9"S 33°38\'44.7"E'},
    // {branchName:'Maxixe', contactEmail:'Florinda.Mauaie@Socremo.com',	contactNumber:'877618798',	region:'Inhambane',	area:'Maxixe',	gpsLocation:'23°51\'34.3"S 35°20\'51.7"E'},
    // {branchName:'Inhambane', contactEmail:'Iolanda.Joaquim@Socremo.com',	contactNumber:'877618800',	region:'Inhambane',	area:'Inhambane', 	gpsLocation:'23°52\'05.0"S 35°23\'07.5"E'},
    // {branchName:'Nampula', contactEmail:'Daniel.Junior@Socremo.com',	contactNumber:'877618793',	region:'Nampula',	area:'Nampula',	gpsLocation:'15°07\'38.9"S 39°15\'51.1"E'},
    // {branchName:'Manica', contactEmail:'Nelson.Antonio@Socremo.com',	contactNumber:'870000569',	region:'Manica',	area:'Manica',	gpsLocation:'18°56\'12.2"S 32°52\'36.2"E'},

  ]


  constructor(
    private reportService: ReportService,
    private utilService: UtilsService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder,
    private exportAsService: ExportAsService,
    private ngxCsvParser: NgxCsvParser
  ) { }

  ngOnInit() {
    const currentYear = new Date();
    this.maxDate = new Date(currentYear);
    this.searchFilterForm = this.formBuilder.group({
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      state: new FormControl(''),
      branchCode: new FormControl(''),
      branchName: new FormControl(''),
    });
    // this.fetchBranches(10, 1, this.requestModel)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '80vw';
    dialogConfig.maxHeight = 'auto';
    dialogConfig.data = { };
    const dialogRef = this.dialog.open(AddBranchComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {
      
    });
  }

  fetchBranches(limit: number, page: number, model: any) {
    this.reportService.getBranches(limit, page, model).subscribe(async (response: any) => {
      this.dataSource = new MatTableDataSource(response.data.docs);
      this.maxall = response.data.meta.total;
      this.isLoadingResults = false
    }, (error: any) => {
      this.isLoadingResults = false
      this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
    })
  }

  async search() {
    this.isLoadingResults = true;
    let { startDate, endDate, branchCode, branchName, state } = this.searchFilterForm.value;
    startDate = startDate ? new Date(startDate).toDateString() : ''
    endDate = endDate ? new Date(endDate).toDateString() : ''

    this.requestModel.startDate = startDate;
    this.requestModel.endDate = endDate;
    this.requestModel.branchCode = branchCode;
    this.requestModel.state = state;
    this.requestModel.branchName = branchName;

    this.fetchBranches(10, 1, this.requestModel)
  }

  onPageFired(event) {
    this.isLoadingResults = true;
    this.fetchBranches(event.pageSize, event.pageIndex + 1, this.requestModel)
  }

  exportTable(type: any) {
    this.exportAsConfig.type = type;
    this.exportAsService.save(this.exportAsConfig, 'Branch Report').subscribe((response) => {
      this.utilService.triggerNotification('File Downloaded')
    }, (error) => {
      this.utilService.triggerNotification(error)
    });
  }

  convertFile(ev) {
    // console.log(ev);
    this.utilService.triggerNotification("File added successfully");
    this.isLoadingResults = true
    let files = ev.target.files;
    this.ngxCsvParser.parse(files[0], { header: true, delimiter: "," })
      .pipe()
      .subscribe((result: Array<any>) => {
        console.log(result)
        this.submitButton = true;
        this.renewalScore = result
        this.renewalScoreRecord = {
          renewalScoreRecord: result
        }
        this.isLoadingResults = false
        this.dataSource = new MatTableDataSource(this.renewalScore);
        // this.maxall = response.data.meta.total;
        // this.isLoadingResults = false;
      }, (error: NgxCSVParserError) => {
        this.utilService.triggerNotification("Could not process csv file");
        this.isLoadingResults = false
      }
      );
  }

  storeRenewalScoreRecord() {
    this.isLoadingResults = true
    this.submitButton = false;
    // console.log(this.renewalScoreRecord)
    // this.loan.storeRenewalScore(this.renewalScoreRecord).subscribe((res: any)=>{
    //   // console.log(res)
    //   if (res.status == true) {
    //     this.utilService.triggerNotification(res.message)
    //     this.isLoadingResults = false
    //   }
    // }, (error: any) => {
    //   this.utilService.triggerNotification(error.status ?'Network Issues. Try again' : 'Error processing data')
    //   this.dataSource = new MatTableDataSource([]);
    //   this.isLoadingResults = false;
    // })
  }

  uploadFile() {
    document.getElementById("fileID").click();
  }

}
