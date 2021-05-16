import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPortalComponent } from './customer-portal.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerPortalComponent,
    data: { title: 'Customer Portal - Eshopbox' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerPortalRoutingModule {}
