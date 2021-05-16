import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/constants/config';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  accountSlug;
  constructor(private api: ApiService, private authService: AuthService, private API_URL: Configuration) {
    // Get slug url
    this.accountSlug = this.authService.getAccountSlug();
  }

  public formSubmitted = new Subject<boolean>();

  savePaymentBookingDetails(params) {
    return this.api.post(`https://${this.accountSlug}${environment.PAYMENTS_API_URL}/save`, params);
  }

  saveStandardPaymentBookingDetails(params) {
    return this.api.post(`https://${this.accountSlug}${environment.PAYMENTS_API_URL}/standardPayout`, params);
  }

  fetchPaymentStatus(params) {
    return this.api.post(`https://${this.accountSlug}${environment.PAYMENTS_API_URL}/fetchPaymentReportStatus`, params);
  }
  getPreviousPayments(queryParams) {
    return this.api.get(`https://${this.accountSlug}${environment.PAYMENTS_API_URL}/payout`, {
      params: queryParams
    });
  }

  getStatementsList(params) {
    return this.api.get(`https://${this.accountSlug}${environment.PAYMENTS_API_URL}/statement`, { params: params });
  }

  checkTransactionDetails(params) {
    return this.api.get(`${this.API_URL.CONFIG_URL.CHECK_PAYOUT_STATUS_URL}/reportDetailsOnParams`, { params: params });
  }

  getTemplateData(params) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_TEMPLATE_LIST_URL}`, { params: params });
  }
}
