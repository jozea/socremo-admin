import { customChartColors } from 'src/app/constants/constant';
// import { TransactionService } from './../../../services/transaction/transaction.service';
  // import { UserService } from '../../../services/user/user.service';
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { MatTableDataSource } from '@angular/material/table';
  import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
  import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
  
  @Component({
    selector: 'app-loan-dashboard',
    templateUrl: './loan-dashboard.component.html',
    styleUrls: ['./loan-dashboard.component.scss']
  })  
  export class LoanDashboardComponent implements OnInit {
    Object = Object;
    userName = ""
    disbursedDataSource: any = [
      // {action: 'Login successful', author: 'Ibrahim', time: 'a minute ago'},
    ]
    rejectedDataSource: any = [
      // {name: 'Suulola Oluwaseyi', time: 'a minute ago'},
    ]
    pendingDataSource: any = [
      // {name: 'Suu', amount: '150000', status: 'Repaid'},
    ]
    disbursedColumns: string[] = ['name', 'amount', 'time']
    rejectedColumns: string[] = ['name', 'amount', 'time']
    pendingColumns: string[] = ['name', 'amount', 'time']
    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  
  
    public lineChartLoading = false;
    public displayChart = true;
    chartTextTitle = 'Number of transactions';
    dateForm: FormGroup; 
  
    
  
  
  
    dashboardTabs: any = {
      totalLoan: {
        title:  "All Loans",
        volume: "-",
        value: "-",
      },
      disbursed: {
        title:  "Loan Disbursed",
        volume: "-",
        value: "-",
      },
      repaid: {
        title:  "Loan Repaid",
        volume: "-",
        value: "-",
      },
      overdue: {
        title:  "Overdue Loan",
        volume: "-",
        value: "-",
      },
      badDebt: {
        title:  "Bad Debt",
        volume: "-",
        value: "-",
      },
      rejected: {
        title:  "Rejected Loan",
        volume: "-",
        value: "-",
      },

    }
  
    dashboardCharts: any = [
      {
        title: "Number of transaction"
      },
      {
        title: "Loans"
      },
      {
        title: "Users"
      },
      {
        title: "Account"
      },
  
    ]
  

    public lineChartData: ChartDataSets[] = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Repayment' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Disbursement' },
    ];
    public lineChartLabels: Label[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    public lineChartOptions: (ChartOptions) = {
      responsive: true,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          // fontColor: 'black'
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
      },
    };
    public lineChartColors: Color[] = customChartColors;
    
    public lineChartLegend = true;
    public lineChartType: ChartType = 'bar';
  
    public pieChartOptions: ChartOptions = {
      responsive: true,
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 10,
          fontColor: 'black'
        }
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            const label = ctx.chart.data.labels[ctx.dataIndex];
            return label;
          },
        },
      }
    };
    public pieChartLabels: Label[] = ['Loading', 'Loading', 'Loading'];
    public pieChartData: number[] = [20, 50, 10];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    // public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
      {
        backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
      },
    ];

  
    constructor(
      // public userService: UserService,
      public formBuilder: FormBuilder,
      // public transactionService: TransactionService,
    ) { }
  
    ngOnInit() {
     if(sessionStorage.user) {
      const user = JSON.parse(sessionStorage.user);
      // console.log(user);
      this.userName = `${user.firstName} ${user.lastName}`
     }
     this.dateForm = this.formBuilder.group({
      startDate: new FormControl('', Validators.compose([Validators.required])),
      endDate: new FormControl('', Validators.compose([Validators.required]))
    });
    // 
     this.updateDashboardTabs()
    }
  
    updateCard() {
      // this.userService.getUserCount().subscribe(response => {
      //   this.dashboardTabs.customer.volume = response.data[0].total
      // })
    }
  
    fetchTransactionValueVolumeData() {
      const dateTransactionModel = {
        startDate: new Date(this.dateForm.value.startDate).toJSON().slice(0,10),
        endDate: new Date(this.dateForm.value.endDate).toJSON().slice(0,10),
        dayRange: this.dateRangeType === "month" ? false : true,
  
      }
      this.updateBarChart(dateTransactionModel)
    }
    dateRangeType = "month"
    handleDateRangeSelection(e) {
      this.dateRangeType = e.value
    }
  
    updateBarChart(model: any) {
      // this.transactionService.getTransactionVolValByDateRange(model.startDate, model.endDate, model.dayRange)
      // .subscribe(async(response) => {
      // })
    }
    
    updatePieChart(model: any) {
      // this.transactionService.getTransactionTypeByDateRange(model.startDate, model.endDate, model.dayRange)
      // .subscribe(async(response) => {
      // })
    }
  
  
    updateDashboardTabs() {
      // this.userService.getUserCount().subscribe(response => {
      //   this.dashboardTabs.customer.volume = response.data[0].total
      // })
  
    }
  
  }
  