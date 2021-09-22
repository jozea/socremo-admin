import { dashboardAccountCategories, dashboardLoanCategories, pieChartCustomColors } from 'src/app/constants/constant';
import { ReportService } from 'src/app/services/report/report.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';
import { UserService } from 'src/app/services/user/user.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Label } from 'ng2-charts';
import { dashboardTopTabs, customChartColors, monthNames, barChartConstOptions, pieChartConstOptions } from 'src/app/constants/constant';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  Object = Object;
  userName = ""
  loanTransactionDataSource: any = []
  loanTransactionColumns: string[] = ['name', 'amount', 'status']

  public lineChartLoading = false;
  public displayChart = true;
  chartTextTitle = 'Number of transactions';
  dateForm: FormGroup;
  dashboardTabs: any = dashboardTopTabs;


  dateRangeType = "month"
  selectedChannel = "all";


  public barChartColors: any[] = customChartColors
  public barChartOptions: ChartOptions = barChartConstOptions;
  public barChartLabels: Label[] = monthNames;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Volume of transaction' },
    { data: [], label: 'Value of transaction(\'000)' }
  ];

  generalRequestModel = { startDate: new Date(new Date().getFullYear(), 0, 1).toISOString(), endDate: new Date(new Date().getFullYear(), 11, 31).toISOString(), dayRange: false }


  transactionStatusChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];
  transactionStatusChartType: ChartType = "pie";
  accountOpenedChartLabels: Label[] = [];
 
  accountCategories: any = dashboardAccountCategories;

  transactionStatusChartLabels: Label[] = [];
  transactionStatusChartData: number[] = [];

  loanCategories = dashboardLoanCategories

  incomePerChannelChartLabels: Label[] = [];
  incomePerTransactionTypeChartLabels: Label[] = [];
  accountRegistrationChartLabels: Label[] = [];

  incomePerChannelChartData: ChartDataSets[] = [
    { data: [], label: 'Mobile' },
    { data: [], label: 'Web' },
  ];

  accountOpenedChartData: ChartDataSets[] = [
    { data: [], label: 'Opened via referral' },
    { data: [], label: 'Non-referred' }
  ];

  incomePerTransactionTypeChartData: ChartDataSets[] = [
    { data: [], label: 'Airtime' },
    { data: [], label: 'Transfer' },
    { data: [], label: 'Data' },
    { data: [], label: 'Electricity' },
    { data: [], label: 'CableTV' },
  ];

  accountRegistrationChartData: ChartDataSets[] = [
    { data: [], label: 'Account' },
    { data: [], label: 'Wallet' },
  ];

  public pieChartOptions: ChartOptions = pieChartConstOptions;
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartPlugins = [pluginDataLabels];
  public pieChartLegend = true;
  public pieChartColors = pieChartCustomColors

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    private utilService: UtilsService,
    public transactionService: TransactionService,
    public loanService: LoanService,
    public reportService: ReportService,
    private cdref: ChangeDetectorRef

  ) {
}

  ngOnInit() {
    if (sessionStorage.user) {
      const user = JSON.parse(sessionStorage.user);
      this.userName = `${user.firstName} ${user.lastName}`
    }
    this.dateForm = this.formBuilder.group({
      startDate: new FormControl(new Date(new Date().getFullYear(), 0, 1).toISOString(), Validators.compose([Validators.required])),
      endDate: new FormControl(new Date(new Date().getFullYear(), 11, 31).toISOString(), Validators.compose([Validators.required]))
    });

    // this.updateDashboardTabs(this.generalRequestModel)
    // this.updateBarChart(this.generalRequestModel)
    // this.updatePieChart(this.generalRequestModel)
    // this.updateDashboardTables(this.generalRequestModel)
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

// DONE 
  updateDashboardTables(model) {

    this.accountCategories = dashboardAccountCategories;

    // DONE
    this.userService.accountSummary(model).subscribe(response => {
      const info = response.data[0]
      this.accountCategories.total.count = info.totalUsers[0].total
      this.accountCategories.account.count = info.accountOpened ? info.accountOpened[0].total : 0;
      this.accountCategories.tier1.count = info.accountTier[0] ? info.accountTier[0].total : 0;
      this.accountCategories.tier2.count = info.accountTier[1] ? info.accountTier[1].total : 0;
      this.accountCategories.tier3.count = info.accountTier[2] ? info.accountTier[2].total : 0;
      this.accountCategories.wallet.count = info.totalUsers[0].total - info.accountOpened[0].total
      this.accountCategories.referral.count = info.accountOpenedByReferral ? info.accountOpenedByReferral[0].total : 0;
      this.accountCategories.organic.count = info.totalUsers[0].total - info.accountOpenedByReferral[0].total;
    })

    // DONE
    this.transactionService.getTransactionStatus(model).subscribe(response => {
      this.transactionStatusChartLabels = []
      this.transactionStatusChartData = []
      response.data.map(item => {
        this.transactionStatusChartData.push(item.total)
        this.transactionStatusChartLabels.push(`${item._id}(${item.total})`)
      })
    })

    // DONE 
    this.loanService.fetchLoanSummary(model).subscribe(response => {
      // if(response.data[0].totalLoan[0] == undefined) {
      //   response.data[0].totalLoan[0] = ''
      // }if (response.data[0].disbursed[0] == undefined) {
      //   response.data[0].disbursed[0] = ''
      // }if (response.data[0].unapproved[0] == undefined) {
      //   response.data[0].unapproved[0] =''
      // }if (response.data[0].pending[0] == undefined) {
      //   response.data[0].pending[0] = ''
      // }if (response.data[0].declined[0] == undefined) {
      //   response.data[0].declined[0] = ''
      // }

      if ( response.data[0].totalLoan[0] || response.data[0].disbursed[0] || response.data[0].pending[0] || response.data[0].declined[0] == undefined) {
        return ''
      }else {
        response.data[0]
      }

      const totalLoanRes = response.data[0].totalLoan[0];
      const disbursedLoanRes = response.data[0].disbursed[0];
      const unapprovedLoanRes = response.data[0].unapproved[0];
      const pendingLoanRes = response.data[0].pending[0];
      const rejectedLoanRes = response.data[0].declined[0];


      this.loanCategories.total.count = totalLoanRes.volume
      this.loanCategories.total.recommendedAmount = totalLoanRes.recommendedValue
      this.loanCategories.total.requestedAmount = totalLoanRes.requestedValue

      this.loanCategories.accepted.count = disbursedLoanRes.volume
      this.loanCategories.accepted.recommendedAmount = disbursedLoanRes.recommendedValue
      this.loanCategories.accepted.requestedAmount = disbursedLoanRes.requestedValue

      this.loanCategories.pending.count = pendingLoanRes.volume
      this.loanCategories.pending.recommendedAmount = pendingLoanRes.recommendedValue
      this.loanCategories.pending.requestedAmount = pendingLoanRes.requestedValue

      this.loanCategories.unapproved.count = unapprovedLoanRes.volume
      this.loanCategories.unapproved.recommendedAmount = unapprovedLoanRes.recommendedValue
      this.loanCategories.unapproved.requestedAmount = unapprovedLoanRes.requestedValue

      this.loanCategories.rejected.count = rejectedLoanRes.volume
      this.loanCategories.rejected.recommendedAmount = rejectedLoanRes.recommendedValue
      this.loanCategories.rejected.requestedAmount = rejectedLoanRes.requestedValue

    })
    
    // DONE
    this.loanService
      .getLoanData(10, 1, model).subscribe(async (response) => {
        this.loanTransactionDataSource = response.data.docs;
        this.dashboardTabs.loan.volume = response.data.meta.total;
      })
  }

  updateDashboardTabs(model) {
// A
    this.userService.getUserCount(model).subscribe(response => {
      this.dashboardTabs.customer.volume = response.data[0].total
      this.dashboardTabs.customer.breakdown[0].count = response.data[0].web[0].total // web
      this.dashboardTabs.customer.breakdown[1].count = response.data[0].mobile[0].total // mobile
    })
// A
    this.reportService.getGlobalWalletBalance(model).subscribe(response => {
      this.dashboardTabs.wallet.volume = response.data[0].total / 100
      this.dashboardTabs.wallet.breakdown[0].count = response.data[0].count
    })
// A
    this.transactionService.getAllTransactionVolumeValue(model).subscribe(response => {
      const { totalValue, totalVolume, failed, success } = response.data[0]

      this.dashboardTabs.transactionValue.volume = Number(totalValue).toFixed(2);
      this.dashboardTabs.transactionVolume.volume = totalVolume
      this.dashboardTabs.transactionValue.breakdown[0].count = success.length > 0 ? Number(success[0].value).toFixed(1) : 0  //success
      this.dashboardTabs.transactionValue.breakdown[1].count = failed.length > 0 ? Number(failed[0].value).toFixed(1) : 0    //failed
      this.dashboardTabs.transactionVolume.breakdown[0].count = success.length > 0 ? success[0].volume : 0 //success
      this.dashboardTabs.transactionVolume.breakdown[1].count = failed.length > 0 ? failed[0].volume : 0   //failed

    })
  }

  refreshPage() {
    this.generalRequestModel = { startDate: new Date(new Date().getFullYear(), 0, 1).toISOString(), endDate: new Date(new Date().getFullYear(), 11, 31).toISOString(), dayRange: false }

    this.dateRangeType = "month";

    this.dateForm.addControl("startDate", this.formBuilder.control("", Validators.compose([Validators.required])))
    this.dateForm.addControl("endDate", this.formBuilder.control(new Date(new Date().getFullYear(), 11, 31).toISOString(), Validators.compose([Validators.required])))

    this.updateDashboardTabs(this.generalRequestModel)
    this.updateBarChart(this.generalRequestModel)
    this.updatePieChart(this.generalRequestModel)
    this.updateDashboardTables(this.generalRequestModel)
  }


  filterDataBasedOnDate() {
    this.generalRequestModel = {
      startDate: new Date(this.dateForm.value.startDate).toJSON().slice(0, 10),
      endDate: new Date(this.dateForm.value.endDate).toJSON().slice(0, 10),
      dayRange: this.dateRangeType === "month" ? false : true,
    }

    this.updateBarChart(this.generalRequestModel)
    this.updateDashboardTabs(this.generalRequestModel)
    this.updatePieChart(this.generalRequestModel)
    this.updateDashboardTables(this.generalRequestModel)

  }

  handleDateRangeSelection(e) {
    this.dateRangeType = e.value
  }


  handleTransactionChannel(e) {
    this.lineChartLoading = true
    this.selectedChannel = e.value;

    this.updateTransactionVolValWithChannel(this.generalRequestModel);
  }

  updateTransactionVolValWithChannel(model) {
    model.channel = this.selectedChannel === "all" ? "" : this.selectedChannel;

    this.barChartLabels = []
    this.barChartData[0].data = []
    this.barChartData[1].data = []

    this.transactionService.getTransactionVolValByDateRange(model)
      .subscribe(async (response) => {
        response.data.map(item => {
          let date = this.dateRangeType === "month" ? `${monthNames[item.date.slice(5) - 1]} ${item.date.slice(0, 4)}` : item.date;
          this.barChartLabels.push(date)
          this.barChartData[0].data.push(item.transactionVolume)
          this.barChartData[1].data.push(+(item.transactionValue / 1000).toFixed(2))
        })
        this.lineChartLoading = false;
      })

  }


  updateBarChart(model: any) {

    this.accountOpenedChartData[0].data = []
    this.accountOpenedChartLabels = []
    this.accountOpenedChartData[1].data = []

    this.incomePerChannelChartData[0].data = []
    this.incomePerChannelChartLabels = []
    this.incomePerChannelChartData[1].data = []
    
    this.accountRegistrationChartLabels = []
    this.accountRegistrationChartData[0].data = []
    this.accountRegistrationChartData[1].data = []

    this.incomePerTransactionTypeChartLabels = []
    this.incomePerTransactionTypeChartData[0].data = []
    this.incomePerTransactionTypeChartData[1].data = []
    this.incomePerTransactionTypeChartData[2].data = []
    this.incomePerTransactionTypeChartData[3].data = []
    this.incomePerTransactionTypeChartData[4].data = []

    this.userService.accountRegistrationType(model).subscribe(response => {
      response.data.map(item => {
        let date = this.dateRangeType === "month" ? `${monthNames[item.date.slice(5) - 1]} ${item.date.slice(0, 4)}` : item.date;
        this.accountRegistrationChartLabels.push(date)
        this.accountRegistrationChartData[0].data.push(+item.account)
        this.accountRegistrationChartData[1].data.push(+item.wallet)
      })
    })

    this.transactionService.getIncomePerTransactionType(model).subscribe(response => {
      response.data.map(item => {
        let date = this.dateRangeType === "month" ? `${monthNames[item.date.slice(5) - 1]} ${item.date.slice(0, 4)}` : item.date;
        this.incomePerTransactionTypeChartLabels.push(`${date}`)
        this.incomePerTransactionTypeChartData[0].data.push(+item.airtime.toFixed(2))
        this.incomePerTransactionTypeChartData[1].data.push(+item.transfer.toFixed(2))
        this.incomePerTransactionTypeChartData[2].data.push(+item.data.toFixed(2))
        this.incomePerTransactionTypeChartData[3].data.push(+item.electricity.toFixed(2))
        this.incomePerTransactionTypeChartData[4].data.push(+item.cableTV.toFixed(2))
      })
      
    })

    this.updateTransactionVolValWithChannel(this.generalRequestModel)

    this.userService.accountReferralChart(model).subscribe(response => {

      response.data.map(item => {
        let date = this.dateRangeType === "month" ? `${monthNames[item.date.slice(5) - 1]} ${item.date.slice(0, 4)}` : item.date;
        this.accountOpenedChartLabels.push(date)
        this.accountOpenedChartData[1].data.push(item.nonReferredAccount)
        this.accountOpenedChartData[0].data.push(+(item.all - item.nonReferredAccount))
      })
    })


    this.transactionService.getIncomePerChannel(model).subscribe(response => {
      this.dashboardTabs.revenue.volume = 0;
      this.dashboardTabs.revenue.breakdown[0].count = 0;
      this.dashboardTabs.revenue.breakdown[1].count = 0;
      
      response.data.map(item => {
        this.dashboardTabs.revenue.volume += +(item.all.toFixed(2));
        this.dashboardTabs.revenue.breakdown[0].count += +(item.web.toFixed(2));
        this.dashboardTabs.revenue.breakdown[1].count += +(item.mobile.toFixed(2));

        let date = this.dateRangeType === "month" ? `${monthNames[item.date.slice(5) - 1]} ${item.date.slice(0, 4)}` : item.date;
        this.incomePerChannelChartLabels.push(date)
        this.incomePerChannelChartData[0].data.push(+item.mobile.toFixed(2))
        this.incomePerChannelChartData[1].data.push(+item.web.toFixed(2))
      })
    })
  }

  updatePieChart(model: any) {
    this.transactionService.getTransactionCategories(model)
      .subscribe(async (response) => {

        this.pieChartLabels = [];
        this.pieChartData = [];

        response.data.map(item => {
          this.pieChartLabels.push(`${item._id} (${item.total})`)
          this.pieChartData.push(item.total)
        })
      }, (error: any) => {
        this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
      })
  }

}
