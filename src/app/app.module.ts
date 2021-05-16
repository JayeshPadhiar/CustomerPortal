import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerPortalRoutingModule } from './customer-portal-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
//import { HttpClientModule } from '@angular/common/http';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthService } from '../shared/services/auth.service';
import { AlertService } from '../shared/services/alert.service';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MobileComponent } from '../customer-portal/components/mobile/mobile.component';
import { CPortalComponent } from '../customer-portal/components/c-portal/c-portal.component';
import { OrchMessComponent } from '../customer-portal/components/orch-mess/orch-mess.component';
import { AddDomainComponent } from '../customer-portal/components/add-domain/add-domain.component';
import { SetControlComponent } from '../customer-portal/components/set-control/set-control.component';
import { ManageUnexComponent } from '../customer-portal/components/manage-unex/manage-unex.component';
import { NotifModalComponent } from '../customer-portal/components/notif-modal/notif-modal.component';
import { CustomizeExpComponent } from '../customer-portal/components/customize-exp/customize-exp.component';
import { MobileDialogComponent } from '../customer-portal/components/mobile-dialog/mobile-dialog.component';
import { CustomerPortalComponent } from '../customer-portal/customer-portal.component';
import { ConfirmationDialogComponent } from '../customer-portal/components/confirmation-dialog/confirmation-dialog.component';

// import { CustomerPortalBackendService } from '../shared/services/customer-portal-backend.service';
// import { CPortalInterceptor } from './cportal.interceptor';

@NgModule({
  declarations: [
    CustomerPortalComponent,
    CPortalComponent,
    CustomizeExpComponent,
    OrchMessComponent,
    SetControlComponent,
    ManageUnexComponent,
    MobileComponent,
    MobileDialogComponent,
    AddDomainComponent,
    NotifModalComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    //BrowserModule,
    CustomerPortalRoutingModule,
    //HttpClientModule,
    ReactiveFormsModule,
    //BrowserAnimationsModule,

    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatStepperModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonToggleModule
  ],
  providers: [AuthService],
  //bootstrap: [CustomerPortalComponent],
  entryComponents: [MobileDialogComponent, AddDomainComponent, NotifModalComponent, ConfirmationDialogComponent]
})
export class CustomerPortalModule {}
