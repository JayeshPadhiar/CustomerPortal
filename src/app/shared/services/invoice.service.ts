import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Configuration } from 'src/app/constants/config';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  accountSlug;

  awaitingPayment = new BehaviorSubject<string>('-');
  constructor(private api: ApiService, private authService: AuthService, private API_URL: Configuration) {
    // Get slug url
    this.accountSlug = this.authService.getAccountSlug();
  }

  getInvoiceList(queryParams) {
    return this.api.get(
      `https://${this.accountSlug}${environment.PAYMENTS_API_URL}${this.API_URL.CONFIG_URL.INVOICE_LIST}`,
      {
        params: queryParams
      }
    );
  }

  getExpensesList(queryParams) {
    return this.api.get(
      `https://${this.accountSlug}${environment.PAYMENTS_API_URL}${this.API_URL.CONFIG_URL.EXPENSE_LISTIING_URL}`,
      { params: queryParams }
    );
  }

  getOrderSettlementDetails(queryParams) {
    return this.api.get(`https://${this.accountSlug}${environment.PAYMENTS_API_URL}/getSettlementDetails`, {
      params: queryParams
    });
  }
}
