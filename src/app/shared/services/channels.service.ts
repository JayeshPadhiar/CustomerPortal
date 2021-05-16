import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Subject } from 'rxjs';
import { Configuration } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  constructor(private api: ApiService, private API_URL: Configuration) {}

  public formSubmitted = new Subject<boolean>();

  getSalesChannelList() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_SALES_CHANNELS}`);
  }
  getChannelAccountList(portalId) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_CHANNELS_ACCOUNT_LIST}${portalId}&page=1&perPage=100`);
  }
  getPortalList() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_PORTAL_LIST}`);
  }
  getIntegrationModelList(portalId) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_INTEGRATION_MODEL}${portalId}&page=1&perPage=50`);
  }
  getChannelDetailById(id) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_CHANNEL_BY_ID}${id}`);
  }
  createChannelAccount(params) {
    return this.api.post(`${this.API_URL.CONFIG_URL.CREATE_CHANNEL_ACCOUNT}`, params);
  }
  createChannel(params) {
    return this.api.post(`${this.API_URL.CONFIG_URL.CREATE_SALES_CHANNEL}`, params);
  }
  editSubscription(id, params) {
    return this.api.put(`${this.API_URL.CONFIG_URL.EDIT_CHANNEL_SUBSCRIPTION}${id}`, params);
  }
}
