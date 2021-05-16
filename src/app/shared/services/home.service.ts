import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  accountSlug: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.accountSlug = this.authService.getAccountSlug();
  }

  getCurrentSalesPerformance(params) {
    const url = `v1/dashboard/sales/performance`;
    return this.http.get(url, { params });
  }

  getOrderFulfillmentSummary(params) {
    const url = `v1/dashboard/order/fulfilment`;
    return this.http.get(url, { params });
  }

  getOrderReturnsSummary(params) {
    const url = `v1/dashboard/orders/returnSumary`;
    return this.http.get(url, { params });
  }

  getSalesChannelContribution(params) {
    const url = `v1/dashboard/sales/channelsContribution`;
    return this.http.get(url, { params });
  }

  getTrendingSummary(params) {
    const url = `v1/dashboard/trending`;
    return this.http.get(url, { params });
  }

  getInventoryIdealDistribution(params) {
    const url = `v1/dashboard/inventory/idealDistribution`;
    return this.http.get(url, { params });
  }
  salesChannels(params) {
    const url = `v1/channel`;
    return this.http.get(url, { params });
  }
  locations(params) {
    const url = `v1/warehouse`;
    return this.http.get(url, { params });
  }
  getInventoryAvailableData(params) {
    const url = `product-engine/api/v1/salesChannelInventory`;
    return this.http.get(url, { params });
  }
  getInventoryCurrentDistribution(params) {
    const url = `product-engine/api/v1/locationWiseInventoryDistribution`;
    return this.http.get(url, { params });
  }

  getInventorySnapshot(params) {
    const url = `product-engine/api/v1/snapshotInventoryStatus`;
    return this.http.get(url, { params });
  }

  getReturnProcessedData(params) {
    const url = `v1/dashboard/return`;
    return this.http.get(url, { params });
  }

  getRevenueStory(params) {
    const url = `https://${this.accountSlug}${environment.PAYMENTS_API_URL}/dashboardRevenue`;
    return this.http.get(url, { params });
  }

  dateHandler(selected_date) {
    let fromDate: any;
    let toDate: any;
    switch (selected_date) {
      case 'today':
        fromDate = moment()
          .startOf('day')
          .valueOf();
        toDate = Date.now();
        break;
      case 'yesterday':
        fromDate = moment()
          .subtract(1, 'days')
          .startOf('day')
          .valueOf();
        toDate = moment()
          .subtract(1, 'days')
          .endOf('day')
          .valueOf();
        break;
      case 'last_7_day':
        fromDate = moment()
          .subtract(7, 'days')
          .startOf('day')
          .valueOf();
        toDate = Date.now();
        break;
      case 'last_30_day':
        fromDate = moment()
          .subtract(30, 'days')
          .startOf('day')
          .valueOf();
        toDate = Date.now();
        break;
      case 'this_week':
        fromDate = moment()
          .subtract(0, 'weeks')
          .startOf('week')
          .valueOf();
        toDate = Date.now();
        break;
      case 'last_week':
        fromDate = moment()
          .subtract(1, 'weeks')
          .startOf('week')
          .valueOf();
        toDate = moment()
          .subtract(1, 'weeks')
          .startOf('week')
          .valueOf();
        break;
      case 'this_month':
        fromDate = moment()
          .startOf('month')
          .valueOf();
        toDate = Date.now();
        break;
      case 'last_month':
        fromDate = moment()
          .subtract(1, 'months')
          .startOf('month')
          .valueOf();
        toDate = moment()
          .subtract(1, 'months')
          .endOf('month')
          .valueOf();
        break;
      default:
        break;
    }
    return { fromDate, toDate };
  }
}
