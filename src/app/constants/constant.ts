import { ChartOptions } from 'chart.js';
import { ExportAsConfig } from 'ngx-export-as';


export const exportConfig = (type: any, elementId: string, fileName: string): ExportAsConfig => ({
  type: type,
  elementIdOrContent: elementId,
  fileName: fileName,
  options: {
    jsPDF: {
      orientation: 'landscape',
    },
    orientation: 'landscape',
    margins: {
      top: '20'
    }
  }
});

export const differentAccountTypes = [
  { value: false, name: 'Wallet' },
  { value: true, name: 'Account' },
  { value: '', name: 'All' },
];

export const allLoanActions = [
  { value: 'system', name: 'System' },
  { value: 'user', name: 'User' },
  { value: '', name: 'All' },
];

export const allLoanProcess = [
  { value: 'automatic', name: 'Automatic' },
  { value: 'manual', name: 'Manual' },
  { value: '', name: 'All' },
];

export const allChannels = [
  { value: 'mobile', name: 'Mobile' },
  { value: 'web', name: 'Web' },
  { value: 'ussd', name: 'USSD' },
  { value: '', name: 'All' },
];

export const genderSelection = [
  { name: "Male", value: 'M' },
  { name: "Female", value: 'F' },
  { name: "Others", value: 'O' },
];

export const booleanStatusTypes = [
  { value: false, name: 'False' },
  { value: true, name: 'True' },
  { value: '', name: 'All' },
];

export const pieChartCustomColors = [
  {
    backgroundColor: [
      'rgba(255,0,0,0.3)', 
      'rgba(0,255,0,0.3)', 
      'rgba(0,0,255,0.3)',
      'rgb(209, 212, 14)',
      'rgb(28, 14, 227)',
      'rgb(179, 14, 212)',
      'rgb(212, 14, 80)',
      ' rgb(209, 212, 14)',
      'rgb(54, 212, 14)',
    ],
    hoverBackgroundColor: [
      'rgba(255,0,0,0.3)', 
      'rgba(0,255,0,0.3)', 
      'rgba(0,0,255,0.3)',
      'rgb(209, 212, 14)',
      'rgb(28, 14, 227)',
      'rgb(179, 14, 212)',
      'rgb(212, 14, 80)',
      ' rgb(209, 212, 14)',
      'rgb(54, 212, 14)',
    ],
  },
];

export const ratingSelectionOptions = [
  { value: '0', name: '0' },
  { value: '1', name: '1' },
  { value: '2', name: '2' },
  { value: '3', name: '3' },
  { value: '4', name: '4' },
  { value: '5', name: '5' },
  { value: '', name: 'All' },
];

export const dashboardTopTabs = {
  customer: {
    title: "Total Registered Customer",
    icon: 'people',
    volume: "0",
    link: '/app/users',
    breakdown: [
      // {title: 'Web: ', count: '0'},
      {title: 'Mobile: ', count: '0'}
    ]
  },

  loan: {
    title: "Total Loan Count",
    icon: 'monetization_on',
    volume: "0",
    link: '/app/loans/management',
  },
  transactionVolume: {
    title: "Transaction Volume",
    icon: 'money',
    volume: "0",
    link: '/app/transactions',
    breakdown: [
      {title: 'Success:', count: '0'},
      {title: 'Failed:', count: '0'}
    ],
  },
  transactionValue: {
    title: "Transaction Value",
    icon: 'monetization_on',
    volume: "0",
    link: '/app/transactions',
    breakdown: [
      {title: 'Success: ', count: '0'},
      {title: 'Failed: ', count: '0'}
    ],
  },
  wallet: {
    title: "Total Ticket Raised",
    icon: 'note_add',
    volume: "0",
    breakdown: [
      // {title: 'Number of Tickets Raised: ', count: '0'},
    ]
  },
  revenue: {
    title: "Total Revenue Income",
    icon: 'account_balance_wallet',
    volume: 0,
    breakdown: [
      // {title: 'Web', count: 0},
      {title: 'Mobile', count: 0},
    ]
  },
}

export const agentTopTabs = {
  customer: {
    title: "Agents",
    icon: 'people',
    volume: "0",
    link: '/app/users',
  },
  loan: {
    title: "Accounts Opened",
    icon: 'monetization_on',
    volume: "0",
    link: '/app/loans/management',
  },
  transactionVolume: {
    title: "Transaction Volume",
    icon: 'money',
    volume: "0",
    link: '/app/transactions',
    breakdown: [
      {title: 'Success:', count: '0'},
      {title: 'Failed:', count: '0'}
    ],
  },
  transactionValue: {
    title: "Transaction Value",
    icon: 'monetization_on',
    volume: "0",
    link: '/app/transactions',
    breakdown: [
      {title: 'Success: ', count: '0'},
      {title: 'Failed: ', count: '0'}
    ],
  }

}

export const transactionTypes = [
  {value: 'intrabank', name: 'Intra Bank'},
  {value: 'interbank', name: 'Inter Bank'},
  // {value: 'airtime', name: 'Airtime'},
  // {value: 'transfer', name: 'Transfer'},
  // {value: 'electricity', name: 'Electricity'},
  // {value: 'insurance', name: 'Insurance'},
  // {value: 'fund-wallet', name: 'Fund Wallet'},
  // {value: 'cableTV', name: 'Cable TV'},
  // {value: 'waec-result', name: 'WAEC Result'},
  // {value: 'waec-registration', name: 'WAEC Registration'},
  // {value: 'data', name: 'Data'},
  // {value: '', name: 'All'},
];
export const agentTransactionTypes = [
  {value: 'airtime', name: 'Airtime'},
  {value: 'transfer', name: 'Fund Transfer'},
  {value: 'electricity', name: 'Electricity'},
  {value: 'insurance', name: 'Insurance'},
  {value: 'fund_wallet', name: 'Fund Wallet'},
  {value: 'cableTV', name: 'Cable TV'},
  {value: 'waec_result', name: 'WAEC Result'},
  {value: 'waec_registration', name: 'WAEC Registration'},
  {value: 'account_opening', name: 'Account Opening'},
  {value: 'cash_in', name: 'Cash In'},
  {value: 'cash_out', name: 'Cash Out'},
  {value: 'card_issuance', name: 'Card Issuance'},
  {value: 'card_activation', name: 'Card Activation'},
  {value: 'vat', name: 'Value Added Tax (VAT)'},
  {value: 'stamp_duty', name: 'Stamp Duty'},
  {value: 'tin', name: 'TIN'},
];
export const transactionStatus = [
  {value: 'success', name: 'Success'},
  {value: 'failed', name: 'Failed'},
  // {value: 'approved', name: 'Approved'},
  // {value: 'pending', name: 'Pending'},
  // {value: 'abandoned', name: 'Abandoned'},
  {value: '', name: 'All'}
];

export const differentRangeTypes = [
  {value: 'percent', name: 'Percent'},
  {value: 'flat', name: 'Flat Fee'},
];

// DASHBOARD

export const dashboardAccountCategories = {
  "total": { title: 'Total Number of Registered Customers', count: '0', value: "0" },
  "account": { title: 'Total Number of Accounts opened', count: '0', value: "0" },
  "tier1": { title: 'Total Number of Tier 1 Account ', count: '0', value: "0" },
  "tier2": { title: 'Total Number of Tier 2 Account ', count: '0', value: "0" },
  "tier3": { title: 'Total Number of Tier 3 Account ', count: '0', value: "0" },
  "wallet": { title: 'Total Number Wallet Users ', count: '0', value: "0" },
  "referral": { title: 'Total Number of Accounts opened via Referral ', count: '0', value: "0" },
  "organic": { title: 'Total Number of Accounts via non-referral ', count: '0', value: "0" },
}
export const dashboardLoanCategories = {
  "total": { title: 'Total Loans', count: '0', recommendedAmount: "0", requestedAmount: 0 },
  "pending": { title: 'Pending Loans', count: '0', recommendedAmount: "0", requestedAmount: 0 },
  "unapproved": { title: 'Unapproved Loans ', count: '0', recommendedAmount: "0", requestedAmount: 0 },
  "accepted": { title: 'Accepted Loans ', count: '0', recommendedAmount: "0", requestedAmount: 0 },
  "rejected": { title: 'Rejected Loans by User ', count: '0', recommendedAmount: "0", requestedAmount: 0 },
}





export const customChartColors = [
  { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  },
  { // dark grey
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }
];

export const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
  "July", "Aug", "Sept", "Oct", "Nov", "Dec"
];

export const pieChartConstOptions: ChartOptions = {
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
      display: true,
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return value;
      },
      font: {
        size: 10
    },      
      anchor: 'center',
      // rotation: 110,    
    },
  }
};


export const barChartConstOptions: ChartOptions = {
  responsive: true,
  elements: {
    line: {
      tension: 0
    }
  },
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
        if(ctx.dataset.label.includes("Value")) {
          value = `₦${(value * 1000).toLocaleString()}`
        }
        return value;
      },
      font: {
        size: 10
    },
    
    },
  },
  scales: {
    xAxes: [{
      display: true,
      scaleLabel: {
        display: true,
        labelString: 'Date of transaction'
      },
      ticks: {
        fontColor: 'black',
        fontFamily: 'Roboto',
        beginAtZero: true,
      },
      gridLines: {
        display: false
      }
    }],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          display: false,
        },
        ticks: {
          fontColor: 'black',
          fontFamily: 'Roboto',
          beginAtZero: true,
        },
        gridLines: {
          display: true
        }
      }
    ]
  },
};