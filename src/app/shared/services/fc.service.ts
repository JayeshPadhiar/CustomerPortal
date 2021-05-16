import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Configuration } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class FcService {
  constructor(private api: ApiService, private API_URL: Configuration) {}

  getFulfillmentCentres() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_FULFILLMENT_CENTERS}`);
  }
  getFulfillmentCentreById(id) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_FC_BY_ID}${id}`);
  }

  editSubscription(id, params) {
    return this.api.put(`${this.API_URL.CONFIG_URL.EDIT_SUBSCRIPTION}${id}`, params);
  }

  getExternalWMSAccounts() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_EXTERNAL_WMS_ACCOUNTS}`);
  }
  createSubscription(params) {
    return this.api.post(`${this.API_URL.CONFIG_URL.CREATE_SUBSCRIPTION}`, params);
  }

  saveExternalWMS(params) {
    return this.api.post(`${this.API_URL.CONFIG_URL.CREATE_EXTERNAL_WMS}`, params);
  }
}
