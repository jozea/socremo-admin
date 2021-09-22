import { AppVersionComponent } from './../../pages/secure/admin/app-version/app-version.component';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../utils/animations/animations'
import { SidenavService } from 'src/app/services/sidenav/sidenav.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class SideMenuComponent implements OnInit, AfterViewInit {

  public sideNavState: boolean = false;
  public linkText: boolean = false;
  dynamic: boolean = true;




  mainMenu: any = [
    {
      title: 'Personal Banking',
      icon: 'perm_identity',
      list: [
      ]
    },
    
  ]

  mainMenu2: any = [
    // {
    //   title: 'Corporate Banking',
    //   icon: 'supervisor_account',
    //   list: [
    //   ]
    // }
  ]

  pages: any = [
    { name:  marker('menu.dashboard'), link: '/app/dashboard', icon: 'home' },
    { name: marker('menu.transactionListing'), link: '/app/transactions', icon: 'account_balance' },
    { name: marker('menu.customerManagement'), link: '/app/users', icon: 'person' },
    { name: marker('menu.productManagement'), link: '/app/product/management', icon: 'business' },
    // { name: 'Dashboard', permission: 'transaction', link: '/app/dashboard', icon: 'home' },
    // { name: 'Transaction Listing', permission: 'transaction', link: '/app/transactions', icon: 'account_balance' },
    // { name: 'Customer Management', permission: 'users', link: '/app/users', icon: 'person' },
    { name: 'Broadcast', permission: 'users', link: '/app/broadcast', icon: 'cast' },

    // { name: 'Card Management', permission: 'users', link: '/app/broadcast', icon: 'payments' },
  ]
  nestedPages: any = [
    {
      title: marker('menu.branchManagement'),
      icon: 'inbox',
      list: [
    //     // {
    //     //   name: "Feedback",
    //     //   permission: 'feedback',
    //     //   link: "/app/report/feedback",
    //     //   icon: "feedback"
    //     // },
    //     {
    //       name: "Referral",
    //       permission: 'referral',
    //       link: "/app/report/referral",
    //       icon: "directions"
    //     },
    //     {
    //       name: "Log",
    //       permission: 'referral',
    //       link: "/app/report/log",
    //       icon: "notes"
    //     },
    //     {
    //       name: "Third Parties",
    //       permission: 'referral',
    //       link: "/app/report/platforms",
    //       icon: "360"
    //     },
        {
          name: marker('menu.branches'),
          permission: 'roles_permissions',
          link: "/app/report/branches",
          icon: "add_business"
        },
      ]
    },
    // {
    //   title: marker('menu.productManagement'),
    //   icon: 'inbox',
    //   list: [
    //     {
    //       name: marker('menu.productMan'),
    //       permission: 'referral',
    //       link: "/app/product/listing",
    //       icon: "sms"
    //     }
    //   ]
    // },
    {
      title: marker('menu.ticketManagement'),
      icon: 'inbox',
      list: [
        {
          name: marker('menu.ticketListing'),
          permission: 'referral',
          link: "/app/ticket/management",
          icon: "sms"
        },
        // {
        //   name: "Feedback",
        //   permission: 'feedback',
        //   link: "/app/enquiries/feedback",
        //   icon: "feedback"
        // },
      ]
    },
    // {
    //   title: 'Enquiries',
    //   icon: 'inbox',
    //   list: [
    //     {
    //       name: "Enquires & Complaints",
    //       permission: 'referral',
    //       link: "/app/enquiries/enquiries",
    //       icon: "perm_phone_msg"
    //     },
    //     {
    //       name: "Feedback",
    //       permission: 'feedback',
    //       link: "/app/enquiries/feedback",
    //       icon: "feedback"
    //     },
    //   ]
    // },
    // {
    //   title: 'Loan Management',
    //   icon: 'monetization_on',
    //   list: [
        // {
        //   name: "Analytics",
        //   permission: 'loan_dashboard',
        //   link: "/app/loans/dashboard",
        //   icon: "graphic_eq"
        // },
        // {
        //   name: "Loan Management",
        //   // permission: 'loan_management',
        //   link: "/app/loans/management",
        //   icon: "developer_board"
        // },
        // {
        //   name: "Loan Card",
        //   permission: 'loan_management',
        //   link: "/app/loans/cards",
        //   icon: "card_travel"
        // },
        // {
        //   name: "Loan Card Responses",
        //   permission: 'loan_management',
        //   link: "/app/loans/cardResponse",
        //   icon: "receipt"
        // },
        // {
        //   name: "Upload File",
        //   permission: 'loan_management',
        //   link: "/app/loans/fileUpload",
        //   icon: "get_app"
        // },
      //   {
      //     name: "Settings",
      //     // permission: 'loan_settings',
      //     link: "/app/loans/settings",
      //     icon: "enhanced_encryption"
      //   },
      // ]
    // },
    // {
    //   title: 'Investment Listing',
    //   icon: 'money',
    //   list: [
    //     {
    //       name: "Investments",
    //       permission: 'investment',
    //       link: "/app/investment/investment",
    //       icon: "table_chart"
    //     },
    //     {
    //       name: "Settings",
    //       permission: 'investment',
    //       link: "/app/investment/settings",
    //       icon: "build"
    //     },
    //   ]
    // },
    // {
    //   title: 'Goals Listing',
    //   icon: 'g_translate',
    //   list: [
    //     {
    //       name: "Goals ",
    //       permission: 'Goals/Saving',
    //       link: "/app/goals/goal",
    //       icon: "assignment_turned_in"
    //     },
    //   ]
    // },
    // {
    //   title: 'Agency Banking',
    //   icon: 'business',
    //   list: [
    //     {
    //       name: "Analytics",
    //       link: "/app/agency/analytics",
    //       permission: 'agency_banking_dashboard',
    //       icon: "graphic_eq"
    //     },
    //     {
    //       name: "Agents",
    //       link: "/app/agency/agent",
    //       permission: 'agency_banking_agents',
    //       icon: "business_center"
    //     },
    //     {
    //       name: "Central Purse",
    //       link: "/app/agency/central-purse",
    //       permission: 'agency_banking_agents',
    //       icon: "center_focus_strong"
    //     },
    //     {
    //       name: "Agent Purse",
    //       link: "/app/agency/agent-purse",
    //       permission: 'agency_banking_agents',
    //       icon: "account_tree"
    //     },
    //     {
    //       name: "Transaction",
    //       permission: 'agency_banking_transactions',
    //       link: "/app/agency/transaction",
    //       icon: "monitor"
    //     },
    //     {
    //       name: "Convenience Fee",
    //       permission: 'agency_banking_transactions',
    //       link: "/app/agency/settings",
    //       icon: "settings_input_component"
    //     },
    //   ]
    // },
    {
      title: marker('menu.settings'),
      icon: 'settings',
      list: [
        // {
        //   name: "Audit",
        //   permission: 'audit',
        //   link: "/app/setting/audit",
        //   icon: "account_box"
        // },
        // {
        //   name: "Permissions and Roles",
        //   permission: 'roles_permissions',
        //   link: "/app/setting/permission",
        //   icon: "enhanced_encryption"
        // },
        // {
        //   name: marker('menu.admin'),
        //   permission: 'roles_permissions',
        //   link: "/app/setting/admin-user",
        //   icon: "enhanced_encryption"
        // },
        {
          name: marker('menu.createAdmin'),
          permission: 'change_password',
          link: "/app/setting/createProfile",
          icon: "supervised_user_circle"
        },
        {
          name: marker('menu.changePassword'),
          permission: 'change_password',
          link: "/app/setting/password",
          icon: "security"
        },
        // {
        //   name: "Change App Version",
        //   permission: 'change_password',
        //   method: true,
        //   icon: "app_settings_alt"
        // },
      ]

    },
  ]



  



  constructor(
    private _sidenavService: SidenavService,
    public dialog: MatDialog,

  ) { }

  async ngAfterViewInit(): Promise<void> {
    
  }

  openAppVersionModal() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '40vw';
    dialogConfig.maxHeight = 'auto';
    const dialogRef = this.dialog.open(AppVersionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(_ => {

    });
  }

  loggedInUserPermissions = [];
  permissions = {};

  ngOnInit() {
  //   this.loggedInUserPermissions = JSON.parse(sessionStorage.getItem('user')).permissions.permissions;
  //   this.loggedInUserPermissions.map(item => 
  //     this.permissions[item.action] = item.isPermitted,
      
  //  );
  //  console.log(this.loggedInUserPermissions)
  //  console.log(this.permissions)
  }

  onSinenavToggle(state) {
    if(state === 'menu') {
      this.dynamic = !this.dynamic;
      this.sideNavState = true
    }else {
      if(this.dynamic) {
      this.sideNavState = !this.sideNavState
    }
    }

    setTimeout(() => {
    this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}
