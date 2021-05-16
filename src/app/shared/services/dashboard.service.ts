import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';
import { API_ROUTE_LIST } from '../constants/api-routes.constant';
import { tap, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Configuration } from '../../constants/config';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private ApiUrl = env.API_URL;
  private AuthorizationToken: string;
  private accountslug: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService,
    private API_CONFIG_URL: Configuration,
    private api: ApiService
  ) {
    // Get access token
    this.AuthorizationToken = this.authService.getAuthToken();
    if (this.AuthorizationToken === undefined || this.AuthorizationToken == null) {
      this.errorHandlingService.logoutOnError('Session timed out');
    }
    this.AuthorizationToken = 'Bearer ' + this.AuthorizationToken;

    // Get slug url
    this.accountslug = this.authService.getAccountSlug();
    if (this.accountslug === undefined || this.accountslug == null) {
      // TODO:: redirect
    }
    this.ApiUrl = 'https://' + this.accountslug + '.' + this.ApiUrl.split('/')[0];
  }

  getFcLists() {
    return this.api.get(`${this.API_CONFIG_URL.CONFIG_URL.GET_FULFILLMENT_CENTERS}`);
  }

  getChannelLists(channelPayloadData) {
    let qObj;
    if (channelPayloadData['isFetchLiveData']) {
      qObj = { days: '7', warehouseId: channelPayloadData['warehouseData'], refresh: 'true' };
    } else {
      qObj = { days: '7', warehouseId: channelPayloadData['warehouseData'] };
    }
    const apiurl = API_ROUTE_LIST.CHANNEL;
    return this.http.get(apiurl, { params: qObj }).pipe(
      tap(data => {
        return data['data'];
      })
    );
  }

  getSellsSummary(params: any) {
    let resultantObj = {};
    if (params) {
      resultantObj = Array.isArray(params.warehouseId)
        ? { days: params.days, warehouseId: params.warehouseId.toString() }
        : { ...params };
    }
    const apiurl = API_ROUTE_LIST.SELLS_SUMMARY;
    return this.http.get('v1/dashboard/sales', { params: resultantObj }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getOrderSummary(orderSummaryPayloadData) {
    let warehouses = '';
    let [firstWSID, ...restWSID] = [...orderSummaryPayloadData['warhouses'].split(',')];
    for (let i = 0; i < restWSID.length; i++) {
      warehouses += `OR%20(warehouseDTO.wareHouseCode:${restWSID[i]})`;
    }
    let qparam: any;
    if (orderSummaryPayloadData.isAllSelected) {
      qparam = `facets=orderStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${this.accountslug})`;
    } else {
      qparam = `facets=orderStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${this.accountslug})AND%20(warehouseDTO.wareHouseCode:${firstWSID})${warehouses}`;
    }
    return this.http.get(`es_prod?${qparam}`).pipe(map(data => data['facets']));
  }

  getExtraDataOrderSummary(orderSummaryPayloadData) {
    let warehouses = '';
    let from = moment().startOf('day');
    let [firstWSID, ...restWSID] = [...orderSummaryPayloadData['warhouses'].split(',')];
    for (let i = 0; i < restWSID.length; i++) {
      warehouses += `OR%20(warehouseDTO.wareHouseCode:${restWSID[i]})`;
    }
    let qparam: any;
    if (orderSummaryPayloadData.isAllSelected) {
      qparam = `facets=orderStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${
        this.accountslug
      })AND%20(orderStatus:shipped)AND%20(shipmentDTO.dispatchedOnFilter:${from} TO ${Date.now()})`;
    } else {
      qparam = `facets=orderStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${
        this.accountslug
      })AND%20(warehouseDTO.wareHouseCode:${firstWSID})${warehouses}AND%20(orderStatus:shipped)AND%20(shipmentDTO.dispatchedOnFilter:${from} TO ${Date.now()})`;
    }
    return this.http.get(`es_prod?${qparam}`).pipe(map(data => data['facets']));
  }

  getReturnSummary(returnSummaryPayloadData) {
    let warehouses = '';
    let [firstWSID, ...restWSID] = [...returnSummaryPayloadData['warehouses'].split(',')];
    for (let i = 0; i < restWSID.length; i++) {
      warehouses += `OR%20(warehouseDTO.wareHouseCode:${restWSID[i]})`;
    }
    let qparam: any;
    if (returnSummaryPayloadData.isAllSelected) {
      qparam = `facets=returnStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${this.accountslug})`;
    } else {
      qparam = `facets=returnStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${this.accountslug})AND%20(warehouseDTO.wareHouseCode:${firstWSID})${warehouses}`;
    }
    return this.http.get(`es_prod?${qparam}`).pipe(map(data => data['facets']));
  }

  getExtraDataReturnSummary(returnSummaryPayloadData) {
    let warehouses = '';
    let from = moment().startOf('day');
    let [firstWSID, ...restWSID] = [...returnSummaryPayloadData['warehouses'].split(',')];
    for (let i = 0; i < restWSID.length; i++) {
      warehouses += `OR%20(warehouseDTO.wareHouseCode:${restWSID[i]})`;
    }
    let qparam: any;
    if (returnSummaryPayloadData.isAllSelected) {
      qparam = `facets=returnStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${
        this.accountslug
      })AND%20(returnStatus:complete)AND%20(returnDTO.warehouseReversePickupLastUpdated:${from} TO ${Date.now()})`;
    } else {
      qparam = `facets=returnStatus&page=0&hitsPerPage=0&X-Algolia-API-Key=46b906536f53aa56c22a9315453b5447&X-Algolia-Application-Id=W7AL34LYP4&filters=(account:${
        this.accountslug
      })AND%20(warehouseDTO.wareHouseCode:${firstWSID})${warehouses}AND%20(returnStatus:complete)AND%20(returnDTO.warehouseReversePickupLastUpdated:${from} TO ${Date.now()})`;
    }
    return this.http.get(`es_prod?${qparam}`).pipe(map(data => data['facets']));
  }

  getInventorySummary(params: any) {
    let qpms;
    if (params['isFetchLiveData']) {
      qpms = { ...params, refresh: 'true' };
    } else {
      delete params['isFetchLiveData'];
      qpms = { ...params };
    }
    const apiurl = API_ROUTE_LIST.INVENTORY_SUMMARY;
    return this.http.get(apiurl, { params: qpms }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getConsignmentSummary(params: any) {
    let resultantObj = {};
    if (params) {
      if (params['isFetchLiveData']) {
        resultantObj = Array.isArray(params.warehouseId)
          ? { warehouseId: params.warehouseId.toString(), refresh: 'true' }
          : { ...params, refresh: 'true' };
      } else {
        delete params['isFetchLiveData'];
        resultantObj = Array.isArray(params.warehouseId)
          ? { warehouseId: params.warehouseId.toString() }
          : { ...params };
      }
    }
    const apiurl = API_ROUTE_LIST.CONSIGNMENT_SUMMARY;
    return this.http.get(apiurl, { params: resultantObj }).pipe(
      map(data => {
        return data;
      })
    );
  }

  getLastUpdatedTime(isFetchActiveData) {
    let queryParams;
    if (isFetchActiveData) {
      queryParams = { refresh: 'true' };
    } else {
      queryParams = {};
    }
    return this.http.get('v1/dashboard', { params: queryParams });
  }
}
