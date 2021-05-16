import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';
import { API_ROUTE_LIST } from '../constants/api-routes.constant';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {
  private ApiUrl = env.API_URL;
  private AuthorizationToken: string;
  private accountslug: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService
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
    this.ApiUrl = 'https://' + this.accountslug + '.' + this.ApiUrl;
  }

  // TODO: merge filter and listing function
  getReturnsList(requestBody) {
    const apiurl = this.ApiUrl + '/returns';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  getReturnDetail(req) {
    const returnNo = req;
    const apiurl = this.ApiUrl + '/returns?page=1&perPage=10' + '&returnNumber=' + returnNo;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  filterReturns(requestBody) {
    const apiurl = this.ApiUrl + '/searchOrderReturnIndexData';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  sortReturns(req) {
    const apiurl = 'http://localhost:3000/sortfilterdata';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * Create export job service
   * @param requestBody
   *
   * @author Chandrika Aggarwal <chandrika@eshopbox.com>
   */
  createExportJobService(requestBody) {
    return this.http.post(this.ApiUrl + API_ROUTE_LIST.CREATE_EXPORT_JOB_ORDER_RETURN, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }
}
