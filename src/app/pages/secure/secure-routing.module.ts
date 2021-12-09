import { BroadcastComponent } from './broadcast/broadcast.component';
import { ThirdPartiesComponent } from './report/third-parties/third-parties.component';
import { LogComponent } from './report/log/log.component';
import { ViewusersComponent } from './admin/viewusers/viewusers.component';
import { AgentPurseComponent } from './agency/agent-purse/agent-purse.component';
import { CentralPurseComponent } from './agency/central-purse/central-purse.component';
import { AgencySettingsComponent } from './agency/agency-settings/agency-settings.component';
import { RoleGuard } from './../../guard/role.guard';
import { AuthenticationGuard } from './../../guard/authentication.guard';
import { LoanSettingsComponent } from './loan/loan-settings/loan-settings.component';
import { LoanManagementComponent } from './loan/loan-management/loan-management.component';
import { ReferralComponent } from './report/referral/referral.component';
import { FeedbackComponent } from './report/feedback/feedback.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { AuditComponent } from './admin/audit/audit.component';
import { AgencyTransactionComponent } from './agency/agency-transaction/agency-transaction.component';
import { AgencyAgentsComponent } from './agency/agency-agents/agency-agents.component';
import { AgencyAnalyticsComponent } from './agency/agency-analytics/agency-analytics.component';
import { LoanDashboardComponent } from './loan/loan-dashboard/loan-dashboard.component';
import { PermissionsComponent } from './admin/permissions/permissions.component';
import { SecureComponent } from './secure.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BranchesComponent } from './report/branches/branches.component';
import { LoanCardComponent } from './loan/loan-card/loan-card.component';
import { InvestmentListingComponent } from './investment/investment-listing/investment-listing.component';
import { GoalsListingComponent } from './goals/goals-listing/goals-listing.component';
import { LoanCardResponseComponent } from './loan/loan-card-response/loan-card-response.component';
import { LoanFileuploadComponent } from './loan/loan-fileupload/loan-fileupload.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AuthorizerComponent } from './authorizer/authorizer.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { CorporateInvestmentComponent } from './investments/corporate-investment/corporate-investment.component';
import { CorporateTransactionsComponent } from './corporate-transactions/corporate-transactions.component';
import { InvestmentSettingComponent } from './investment/investment-setting/investment-setting.component';
import { RegisterComponent } from '../auth/register/register.component';
import { TicketManagementComponent } from './enquiries/ticket-management/ticket-management.component';
import { ProductManagementComponent } from './product/product-management/product-management.component';
import { TicketSettingsComponent } from './enquiries/ticket-settings/ticket-settings.component';
import { ChequeManagementComponent } from './cheque/cheque-management/cheque-management.component';
import { CardManagementComponent } from './cards/card-management/card-management.component';
import { InsuranceManagementComponent } from './insurance/insurance-management/insurance-management.component';

const routes: Routes = [{
  path: '',
  component: SecureComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: "dashboard",
      component: DashboardComponent,
      // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['dashboard'] }
    },
    {
      path: 'transactions',
      component: TransactionsComponent,
      // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['transaction'] }
    },
    {
      path: 'broadcast',
      component: BroadcastComponent,
      // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['transaction'] }
    },
    // {
    //   path: 'cardmanagement',
    //   component: CardManagement,
    //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['transaction'] }
    // },
    {
      path: 'users',
      children: [
        {
          path: '',
          pathMatch: 'full',
          component: UsersComponent,
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['users'] }
        },
        {
          path: 'details/:id',
          component: UserDetailComponent,
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['users'] }
        },

      ]
    },
    {
      path: 'report',
      children: [
    //     {
    //       path: 'referral',
    //       component: ReferralComponent,
    //       canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['referral'] }
    //     },
    //     {
    //       path: 'feedback',
    //       component: FeedbackComponent,
    //       canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['feedback'] }
    //     },
    //     {
    //       path: 'log',
    //       component: LogComponent,
    //       canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['feedback'] }
    //     },
    //     {
    //       path: 'platforms',
    //       component: ThirdPartiesComponent,
    //       canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['roles_permissions'] }
    //     },
        {
          path: 'branches',
          component: BranchesComponent,
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['roles_permissions'] }
        },
      ]
    },
    {
      path: 'setting',
      children: [
        // {
        //   path: 'audit', component: AuditComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['audit'] }
        // },
        {
          path: 'createProfile', 
          component: RegisterComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
        {
          path: 'password', 
          component: ResetpasswordComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
        {
          path: 'permission', 
          component: PermissionsComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['roles_permissions'] }
        },
        {
          path: 'admin-user', 
          component: ViewusersComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['roles_permissions'] }
        },
      ]
    },
    {
      path: 'product',
      children: [
        {
          path: 'management', 
          component: ProductManagementComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
      ]
    },
    {
      path: 'ticket',
      children: [
        {
          path: 'management', 
          component: TicketManagementComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
        {
          path: 'settings', 
          component: TicketSettingsComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
      ]
    },
    {
      path: 'cheque',
      children: [
        {
          path: 'management', 
          component: ChequeManagementComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
      ]
    },
    {
      path: 'card',
      children: [
        {
          path: 'management', 
          component: CardManagementComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
      ]
    },
    {
      path: 'insurance',
      children: [
        {
          path: 'management', 
          component: InsuranceManagementComponent, 
          // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['change_password'] }
        },
      ]
    },
    {
      path: 'loans', children:
        [
          {
            path: 'management',
            component: LoanManagementComponent,
            // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_management'] }
          },
          // {
          //   path: 'cards',
          //   component: LoanCardComponent,
          //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_management'] }
          // },
          // {
          //   path: 'cardResponse',
          //   component: LoanCardResponseComponent,
          //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_management'] }
          // },
          // {
          //   path: 'fileUpload',
          //   component: LoanFileuploadComponent,
          //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_management'] }
          // },
          // {
          //   path: 'dashboard', 
          //   component: LoanDashboardComponent, 
          //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_dashboard'] }
          // },
          {
            path: 'settings', 
            component: LoanSettingsComponent, 
            // canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_settings'] }
          },
          

        ]
    },
    // {
    //   path: 'investment', children:
    //     [
    //       {
    //         path: 'investment',
    //         component: InvestmentListingComponent,
    //         canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['investment'] }
    //       },
    //       {
    //         path: 'settings',
    //         component: InvestmentSettingComponent,
    //         canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['investment'] }
    //       },
          

    //     ]
    // },
    // {
    //   path: 'goals', children:
    //     [
    //       {
    //         path: 'goal',
    //         component: GoalsListingComponent,
    //         canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['Goals/Saving'] }
    //       },
          

    //     ]
    // },
    // {
    //   path: 'agency', children: 
    //     [
    //       {
    //         path: 'analytics',
    //         component: AgencyAnalyticsComponent,
    //         canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['agency_banking_dashboard'] }
    //       },
    //       {
    //         path: 'agent', component: AgencyAgentsComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['agency_banking_agents'] }
    //       },
    //       {
    //         path: 'transaction', component: AgencyTransactionComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['agency_banking_transactions'] }
    //       },
    //       {
    //         path: 'settings', component: AgencySettingsComponent, canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['agency_banking_transactions'] }
    //       },
    //       {
    //         path: 'central-purse', 
    //         component: CentralPurseComponent, 
    //         canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_settings'] }
    //       },
    //       {
    //         path: 'agent-purse', 
    //         component: AgentPurseComponent, 
    //         canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['loan_settings'] }
    //       },
    //     ]
    // },
    // {
    //   path: 'enquiries',
    //   children: [
    //     {
    //       path: 'enquiries',
    //       component: EnquiriesComponent,
    //       canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['referral'] }
    //     },
    //     {
    //       path: 'feedback',
    //       component: FeedbackComponent,
    //       canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['feedback'] }
    //     },
    //   ]
    // },
    // {
    //   path: 'corporate-investment',
    //   component: CorporateInvestmentComponent,
    //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['transaction'] }
    // },
    // {
    //   path: 'corporate-transaction',
    //   component: CorporateTransactionsComponent,
    //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['transaction'] }
    // },
    // {
    //   path: 'onboard',
    //   component: OnboardingComponent,
    //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['transaction'] }
    // },
    // {
    //   path: 'authorizer',
    //   component: AuthorizerComponent,
    //   canActivate: [AuthenticationGuard, RoleGuard], data: { allowedPermissions: ['transaction'] }
    // },
  ]
}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
// export const AuthRoutes = RouterModule.forChild(routes);
