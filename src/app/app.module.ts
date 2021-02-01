import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

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

import { AppComponent } from './app.component';
import { CPortalComponent } from './c-portal/c-portal.component';
import { CustomizeExpComponent } from './customize-exp/customize-exp.component';
import { OrchMessComponent } from './orch-mess/orch-mess.component';
import { SetControlComponent } from './set-control/set-control.component';
import { ManageUnexComponent } from './manage-unex/manage-unex.component';
import { MobileComponent } from './mobile/mobile.component';
import { MobileDialogComponent } from './mobile-dialog/mobile-dialog.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { NotifModalComponent } from './notif-modal/notif-modal.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

import { CustomerPortalBackendService } from './customer-portal-backend.service';
import { CPortalInterceptor } from './cportal.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CPortalComponent,
    CustomizeExpComponent,
    OrchMessComponent,
    SetControlComponent,
    ManageUnexComponent,
    MobileComponent,
    MobileDialogComponent,
    AddDomainComponent,
    NotifModalComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

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
    MatButtonToggleModule,
  ],
  providers: [CustomerPortalBackendService, {
    provide: HTTP_INTERCEPTORS,
    useClass: CPortalInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
