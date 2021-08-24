  import { pieChartCustomColors } from 'src/app/constants/constant';
  import { ReportService } from 'src/app/services/report/report.service';
  import { UtilsService } from 'src/app/services/utils/utils.service';
  import { LoanService } from 'src/app/services/loan/loan.service';
  import { TransactionService } from 'src/app/services/transaction/transaction.service';
  import { UserService } from 'src/app/services/user/user.service';
  import { Component, OnInit } from '@angular/core';
  import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
  import * as pluginDataLabels from 'chartjs-plugin-datalabels';
  import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
  import { Label } from 'ng2-charts';
  import { agentTopTabs, customChartColors, monthNames,barChartConstOptions, pieChartConstOptions } from 'src/app/constants/constant';
  
  @Component({
    selector: 'app-agency-analytics',
    templateUrl: './agency-analytics.component.html',
    styleUrls: ['./agency-analytics.component.scss']
  })
  export class AgencyAnalyticsComponent implements OnInit {
    Object = Object;
    userName = ""
    recentActivitiesDataSource: any = []
    loggedInUsersDataSource: any = []
    loanTransactionDataSource: any = []
    displayedRecentActivitiesColumns: string[] = ['action', 'firstName', 'amount', 'time',]
    loggedInUsersColumns: string[] = ['firstName', 'currentLogin']
    loanTransactionColumns: string[] = ['name', 'amount', 'status']
  
    dailyTransaction = {
      successful: {
        icon: 'home',
        title: "Daily Successful Transactions",
        value: "123213212",
        volume: "123",
        class: "success mx-2 mb-0 pb-0"
      },
      pending: {
        icon: 'success',
        title: "Daily Pending Transactions",
        value: "123213212",
        volume: "123",
        class: "pending mx-2 mb-0 pb-0"
      },
      failed: {
        icon: 'success',
        title: "Daily Unsuccessful Transactions",
        value: "123213212",
        volume: "123",
        class: "failed mx-2 mb-0 pb-0"
      },
    }
  
  
    public lineChartLoading = false;
    public displayChart = true;
    chartTextTitle = 'Number of transactions';
    dateForm: FormGroup;
    dashboardTabs: any = agentTopTabs
    dateRangeType = "month"
  
  
    public barChartColors: any[] = customChartColors
    public barChartOptions: ChartOptions = barChartConstOptions;
    public barChartLabels: Label[] = monthNames;
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins = [];
  
  
  
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
    ) { }
  
    ngOnInit() {
      if (sessionStorage.user) {
        const user = JSON.parse(sessionStorage.user);
        this.userName = `${user.firstName} ${user.lastName}`
      }
      this.dateForm = this.formBuilder.group({
        startDate: new FormControl('', Validators.compose([Validators.required])),
        barStartDate: new FormControl('', Validators.compose([Validators.required])),
        endDate: new FormControl('', Validators.compose([Validators.required])),
        barEndDate: new FormControl('', Validators.compose([Validators.required])),
      });
      // 
      this.updateBarChart({ startDate: "2020-01-01", endDate: "2020-12-31", dayRange: false })
      this.updatePieChart({})
      // this.updateDashboardTables()
    }
  
    updateDashboardTables() {
      this.userService.getCurrentlyLoggedInUsers().subscribe(response => {
        this.loggedInUsersDataSource = response.data.docs;
      })
  
    }

  
  
  
    fetchTransactionValueVolumeData() {
      const dateTransactionModel = {
        startDate: new Date(this.dateForm.value.startDate).toJSON().slice(0, 10),
        endDate: new Date(this.dateForm.value.endDate).toJSON().slice(0, 10),
        dayRange: this.dateRangeType === "month" ? false : true,
      }
      this.updateBarChart(dateTransactionModel)
    }
  
    handleDateRangeSelection(e) {
      this.dateRangeType = e.value
    }
    public barChartData: ChartDataSets[] = [
      { data: [], label: 'Volume of transaction' },
      { data: [], label: 'Value of transaction(\'000)' }
    ];
  
  
  
    updateBarChart(model: any) {
      this.barChartLabels = []
      this.barChartData[0].data = []
      this.barChartData[1].data = []
      this.transactionService.getTransactionVolValByDateRange(model)
        .subscribe(async (response) => {
          response.data.map(item => {
            let date = this.dateRangeType === "month" ? `${monthNames[item.date.slice(5) - 1]} ${item.date.slice(0,4)}` : item.date;
            this.barChartLabels.push(date)
            this.barChartData[0].data.push(item.transactionVolume)
            this.barChartData[1].data.push(+(item.transactionValue/1000).toFixed(2))
          })
        })
      }
  
    updatePieChart(model: any) {
      this.transactionService.getTransactionCategories(model)
        .subscribe(async (response) => {
          response.data.map(item => {
            this.pieChartLabels.push(`${item._id} (${item.total})`)
            this.pieChartData.push(item.total)
          })
        }, (error: any) => {
          this.utilService.triggerNotification(error.status ? 'Error fetching data' : 'Network Issues. Try again')
        })
    }
  
  }
  
