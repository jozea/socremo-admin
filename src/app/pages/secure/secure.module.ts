import { BranchesComponent } from './report/branches/branches.component';
import { LoanActionComponent } from './loan/loan-action/loan-action.component';
import { AddBroadcastComponent } from './broadcast/add-broadcast/add-broadcast.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { ReceiptComponent } from './agency/agency-transaction/receipt/receipt.component';
import { AddAgentComponent } from './agency/agency-agents/add-agent/add-agent.component';
import { AssignTerminalComponent } from './agency/agency-agents/assign-terminal/assign-terminal.component';
import { ThirdPartiesComponent } from './report/third-parties/third-parties.component';
import { LogComponent } from './report/log/log.component';
import { UpdateAdminComponent } from './admin/viewusers/update-admin/update-admin.component';
import { AgentPurseComponent } from './agency/agent-purse/agent-purse.component';
import { CentralPurseComponent } from './agency/central-purse/central-purse.component';
import { ViewusersComponent } from './admin/viewusers/viewusers.component';
import { SettingModalComponent } from './agency/agency-settings/setting-modal/setting-modal.component';
import { AgencySettingsComponent } from './agency/agency-settings/agency-settings.component';
import { AuthImagePipe } from './../../utils/auth-image.pipe';
import { LoanSettingsComponent } from './loan/loan-settings/loan-settings.component';
import { LoanManagementComponent } from './loan/loan-management/loan-management.component';
import { ReferralComponent } from './report/referral/referral.component';
import { FeedbackComponent } from './report/feedback/feedback.component';
import { LoanDetailComponent } from './loan/loan-detail/loan-detail.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UsersComponent } from './users/users.component';
import { AgencyTransactionComponent } from './agency/agency-transaction/agency-transaction.component';
import { AgencyAnalyticsComponent } from './agency/agency-analytics/agency-analytics.component';
import { AuditComponent } from './admin/audit/audit.component';
import { LoanDashboardComponent } from './loan/loan-dashboard/loan-dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PermissionsComponent } from './admin/permissions/permissions.component';
import { SecureRoutingModule } from './secure-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuComponent } from './../../shared/side-menu/side-menu.component';
import { SidenavService } from '../../services/sidenav/sidenav.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureComponent } from './secure.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgChartjsModule } from 'ng-chartjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table'  
import { MatPaginatorModule } from '@angular/material/paginator'  
import { MatNativeDateModule } from '@angular/material/core';
import { AgencyAgentsComponent } from './agency/agency-agents/agency-agents.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ExportAsModule } from 'ngx-export-as';
import { MatSnackBarModule  } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { BnNgIdleService } from 'bn-ng-idle';
import { AppVersionComponent } from './admin/app-version/app-version.component'
import { AddBranchComponent } from './report/branches/add-branch/add-branch.component'
import { KycTierComponent } from './admin/kyc-tier/kyc-tier.component';
import { LoanCardComponent } from './loan/loan-card/loan-card.component';
import { InvestmentListingComponent } from './investment/investment-listing/investment-listing.component';
import { GoalsListingComponent } from './goals/goals-listing/goals-listing.component';
import { LoanCardResponseComponent } from './loan/loan-card-response/loan-card-response.component';
import { LoanFileuploadComponent } from './loan/loan-fileupload/loan-fileupload.component';
import { NgxCsvParserModule } from "ngx-csv-parser";
import {MatRadioModule} from '@angular/material/radio';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AuthorizerComponent } from './authorizer/authorizer.component';
import { AmendComponent } from './onboarding/amend/amend/amend.component';
import { ApprovalComponent } from './authorizer/approval/approval/approval.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { CompalaintsComponent } from './enquiries/compalaints/compalaints.component';
import { CorporateInvestmentComponent } from './investments/corporate-investment/corporate-investment.component';
import { CorporateTransactionsComponent } from './corporate-transactions/corporate-transactions.component';
import { GoalsDetailsComponent } from './goals/goals-details/goals-details.component';
import { InvestmentDetailsComponent } from './investment/investment-details/investment-details.component';
import { InvestmentSettingComponent } from './investment/investment-setting/investment-setting.component';
import { SettingsUpdateComponent } from './investment/settings-update/settings-update.component';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient  } from '@angular/common/http';
import { TicketManagementComponent } from './enquiries/ticket-management/ticket-management.component';
import { TicketDetailsComponent } from './enquiries/ticket-details/ticket-details.component';
import { ProductManagementComponent } from './product/product-management/product-management.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { TicketSettingsComponent } from './enquiries/ticket-settings/ticket-settings.component';
import { ProblemDetailsComponent } from './enquiries/problem-details/problem-details.component';
import { TicketActionComponent } from './enquiries/ticket-action/ticket-action.component';
import { TicketCommentsComponent } from './enquiries/ticket-comments/ticket-comments.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ChequeManagementComponent } from './cheque/cheque-management/cheque-management.component';
import { InsuranceManagementComponent } from './insurance/insurance-management/insurance-management.component';
import { CardManagementComponent } from './cards/card-management/card-management.component';
import { CardDetailsComponent } from './cards/card-details/card-details.component';
import { ChequeDetailsComponent } from './cheque/cheque-details/cheque-details.component';
import { ChequeActionComponent } from './cheque/cheque-action/cheque-action.component';
import { CardActionComponent } from './cards/card-action/card-action.component';
import { InsuranceListingComponent } from './insurance/insurance-listing/insurance-listing.component';
import { InsuranceDetailsComponent } from './insurance/insurance-details/insurance-details.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}




@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    CommonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTabsModule,
    MatDividerModule,
    MatSortModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    SecureRoutingModule,
    ChartsModule,
    NgChartjsModule,
    ExportAsModule,
    NgxCsvParserModule,
    MatRadioModule,
    CKEditorModule,
  ],
  declarations: [
    SecureComponent,
    DashboardComponent,
    FeedbackComponent,
    ReferralComponent,
    PermissionsComponent,
    LoanDetailComponent,
    TransactionsComponent,
    SideMenuComponent,
    LoanDashboardComponent,
    LoanSettingsComponent,
    LoanManagementComponent,
    AuditComponent,
    ResetpasswordComponent,
    AgencyAnalyticsComponent,
    AgencyAgentsComponent,
    AgencyTransactionComponent,
    UsersComponent,
    UserDetailComponent,
    AgencySettingsComponent,
    SettingModalComponent,
    AddAgentComponent,
    ReceiptComponent,
    AuthImagePipe,
    ViewusersComponent,
    CentralPurseComponent,
    AgentPurseComponent,
    UpdateAdminComponent,
    BroadcastComponent,
    LogComponent,
    BranchesComponent,
    ThirdPartiesComponent,
    AddBroadcastComponent,
    AssignTerminalComponent,
    LoanActionComponent,
    AppVersionComponent,
    AddBranchComponent,
    KycTierComponent,
    LoanCardComponent,
    InvestmentListingComponent,
    GoalsListingComponent,
    LoanCardResponseComponent,
    LoanFileuploadComponent,
    OnboardingComponent,
    AuthorizerComponent,
    AmendComponent,
    ApprovalComponent,
    EnquiriesComponent,
    CompalaintsComponent,
    CorporateInvestmentComponent,
    CorporateTransactionsComponent,
    GoalsDetailsComponent,
    InvestmentDetailsComponent,
    InvestmentSettingComponent,
    SettingsUpdateComponent,
    UserSettingsComponent,
    TicketManagementComponent,
    TicketDetailsComponent,
    ProductManagementComponent,
    ProductDetailComponent,
    CreateProductComponent,
    UpdateProductComponent,
    TicketSettingsComponent,
    ProblemDetailsComponent,
    TicketActionComponent,
    TicketCommentsComponent,
    ChequeManagementComponent,
    InsuranceManagementComponent,
    CardManagementComponent,
    CardDetailsComponent,
    ChequeDetailsComponent,
    ChequeActionComponent,
    CardActionComponent,
    InsuranceListingComponent,
    InsuranceDetailsComponent,
  ],
  providers: [SidenavService, MatDatepickerModule, AuthImagePipe, BnNgIdleService],
  entryComponents: [
    LoanDetailComponent,
    SettingModalComponent,
    UpdateAdminComponent,
    AddAgentComponent,
    ReceiptComponent,
    AddBroadcastComponent,
    LoanActionComponent,
    AssignTerminalComponent,
    AppVersionComponent,
    AddBranchComponent,
  ]
})
export class SecureModule { }
