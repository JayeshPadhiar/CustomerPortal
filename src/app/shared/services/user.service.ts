import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Configuration } from 'src/app/constants/config';
import { tap } from 'rxjs/operators';
import { LocalStorageChangeDetectionService } from './detect-local-storage-change.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private api: ApiService,
    private API_URL: Configuration,
    private lsd: LocalStorageChangeDetectionService
  ) {}

  getUserProfile() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_PROFILE}`).pipe(
      tap(res => {
        if (res['hashHmac']) {
          this.lsd.setItem('hmac', res['hashHmac']);
          this.lsd.setItem('phoneNo', res['phone']);
          this.lsd.setItem('email', res['email']);
          this.lsd.setItem(
            'fullName',
            `${res['firstName'] ? res['firstName'] : ''} ${res['lastName'] ? res['lastName'] : ''}`
          );
        }
      })
    );
  }

  hitUserLoginApi() {
    return this.api.put(`${this.API_URL.CONFIG_URL.HIT_USER_LOGIN}`, {});
    //  .subscribe(data=> {
    //    console.log("res: ", data);
    //  })
  }

  // fee detail page is ot using this one
  getCategoryList(var1) {
    return this.api.get(` https://v12-dot-payment-reco-dev.appspot.com/_ah/api/epr/v1/getCategory?portalId=` + var1);
  }

  // fee detail page is ot using this one
  getBrandsList() {
    return this.api.get(` https://v12-dot-payment-reco-dev.appspot.com/_ah/api/epr/v1/getBrand`);
  }

  getAccountDetails() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_ACCOUNT_DETAILS}`).pipe(
      tap(res => {
        if (res) {
          localStorage.setItem('workspaceStatus', res['workspaceStatus'] ? res['workspaceStatus'] : 0);
        }
      })
    );
  }

  updateAccountDetails(requestParams, accountId) {
    return this.api.put(`${this.API_URL.CONFIG_URL.UPDATE_ACCOUNT_DETAILS}/${accountId}`, requestParams);
  }

  saveEditWarehouseDetails(requestParams, id) {
    const type = !!id ? 'put' : 'post';
    const url = !!id
      ? `${this.API_URL.CONFIG_URL.SAVE_WAREHOUSE_DETAILS}/${id}`
      : `${this.API_URL.CONFIG_URL.SAVE_WAREHOUSE_DETAILS}`;
    return this.api[type](url, requestParams);
  }

  getBrandDetailsById(id) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_BRAND}${id}`);
  }

  getWarehouseDetailsById(id) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_WAREHOUSE_BY_ID}${id}`);
  }

  getTeamMemberDetailsById(id) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_TEAM_MEMBER_BY_ID}${id}`);
  }

  saveEditBrandDetails(requestParams, id) {
    const type = !!id ? 'put' : 'post';
    const url = !!id
      ? `${this.API_URL.CONFIG_URL.SAVE_BRAND_DETAILS}/${id}`
      : `${this.API_URL.CONFIG_URL.SAVE_BRAND_DETAILS}`;
    return this.api[type](url, requestParams);
  }

  getWarehouseList(type = null) {
    if (type) {
      return this.api.get(`${this.API_URL.CONFIG_URL.GET_WAREHOUSE_DETAILS}&type=${type}`);
    } else {
      return this.api.get(`${this.API_URL.CONFIG_URL.GET_WAREHOUSE_DETAILS}`);
    }
  }

  getBrandList() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_BRAND_DETAILS}`);
  }

  getTeamMemberList() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_TEAM_MEMBER_DETAILS}`);
  }

  getUserGroupList() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_USER_GROUP_LIST}`);
  }

  saveEditTeamMember(requestParams, id) {
    const type = !!id ? 'put' : 'post';
    const url = !!id
      ? `${this.API_URL.CONFIG_URL.SAVE_TEAM_MEMBER}/${id}`
      : `${this.API_URL.CONFIG_URL.SAVE_TEAM_MEMBER}`;
    return this.api[type](url, requestParams);
  }

  getCountryList() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_COUNTRY_LIST}`);
  }

  getStateList(country) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_STATE_LIST}&country=${country}`);
  }

  getCityList(country, state) {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_CITY_LIST}&country=${country}&state=${state}`);
  }

  getVerticalList() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_VERTICALS_LIST}`);
  }

  searchPincodeDetails(pincode) {
    return this.api.get(`${this.API_URL.CONFIG_URL.SEARCH_PINCODE_DETAILS}${pincode}`);
  }

  createUserGroup(requestParams) {
    return this.api.post(`${this.API_URL.CONFIG_URL.CREATE_USER_GROUP}`, requestParams);
  }

  addFee(data) {
    return this.api.post('https://v20-dot-payment-reco-dev.appspot.com/_ah/api/epr/v1/feeRule', data);
  }

  acceptInvite(accountMappingId) {
    const url = `${this.API_URL.CONFIG_URL.UPDATE_INVITE}${accountMappingId}`;
    return this.api.put(url, { status: '1' });
  }
}
