import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CPortalComponent } from './c-portal/c-portal.component';

import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { CustomizeExpComponent } from './customize-exp/customize-exp.component';
import { OrchMessComponent } from './orch-mess/orch-mess.component';
import { SetControlComponent } from './set-control/set-control.component';
import { ManageUnexComponent } from './manage-unex/manage-unex.component';

@NgModule({
  declarations: [
    AppComponent,
    CPortalComponent,
    CustomizeExpComponent,
    OrchMessComponent,
    SetControlComponent,
    ManageUnexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
