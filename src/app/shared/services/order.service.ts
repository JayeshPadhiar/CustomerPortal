import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
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
  getOrdersList(requestBody) {
    const { searchKey } = requestBody;
    const apiurl = this.ApiUrl + '/searchOrderReturnIndexData?searchKey=' + searchKey;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  getOrderDetail(req) {
    const orderNo = req;
    const apiurl = this.ApiUrl + '/orders?page=1&perPage=10' + '&orderNumber=' + orderNo;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  filterOrders(requestBody) {
    const apiurl = this.ApiUrl + '/searchOrderReturnIndexData';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  sortOrders(req) {
    const apiurl = 'http://localhost:3000/sortfilterdata';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }
}
