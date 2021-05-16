import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';
import { Router } from '@angular/router';
import { Configuration } from 'src/app/constants/config';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private ApiUrl = env.API_URL;
  private AuthorizationToken: string;
  private accountslug: string;
  private PaymentURL = env.PAYMENTS_API_URL;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService,
    private router: Router,
    private API_URL: Configuration
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
    this.PaymentURL = 'https://' + this.accountslug + this.PaymentURL;
  }

  addFeeRule(requestBody) {
    var apiurl = this.PaymentURL + '/feeRule';
    if (this.router.url == '/settings/add-fees-rule') {
      apiurl = this.PaymentURL + '/addFeeRule';
    }
    return this.http.post(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  editFeeRule(requestBody) {
    const apiurl = this.PaymentURL + '/feeRule';
    return this.http.put(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getFeeList(requestParams) {
    const apiurl = this.PaymentURL + '/getFeesList?';
    return this.http.get(
      /*apiurl +
        'page=' +
        requestParams['page'] +
        '&perPage=' +
        requestParams['per_page'] +
        '&portalId=' +
        requestParams['portalId'] +
        '&feeName=' +
        requestParams['feeName'] +
        '&startDate=' +
        requestParams['startDate'] +
        '&endDate=' +
        requestParams['endDate'] +
        '&status=' +
        requestParams['status'] +
        '&orderBy=' +
        requestParams['orderBy'],*/
      apiurl,
      {
        params: requestParams,
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
      }
    );
  }

  getAllFeeList(var1 = '') {
    /*return this.http.get(`https://v15-dot-payment-reco-dev.appspot.com/_ah/api/epr/v1/fetchFees?portalId=` + var1);*/
    const apiurl = this.PaymentURL + '/fetchFees?';
    if (var1 == '') {
      return this.http.get(apiurl);
    } else {
      return this.http.get(apiurl + `portalId=` + var1);
    }
  }

  /**
   * @description Service to get unique channel list for adding new transaction rules
   *
   * @author Chandrika <chandrika@eshopbox.com>
   */
  getUniqueChannelListForAddTransactionRules() {
    return this.http.get(`${this.PaymentURL}/${this.API_URL.CONFIG_URL.GET_UNIQUE_CHANNELS_FOR_ADD_TRANSACTION_RULES}`);
  }

  getTransactionRule(params) {
    // const apiurl = this.PaymentURL + '/fetchTransactionRules?';

    // return this.http.get(
    //   apiurl +
    //     `page=` +
    //     params['page'] +
    //     `&perPage=` +
    //     params['per_page'] +
    //     `&channelId=` +
    //     params['channelId'] +
    //     `&status=` +
    //     params['status'] +
    //     `&settlementType=` +
    //     params['settlementType'] +
    //     `&isDescending=` +
    //     params['isDescending'],
    //   {
    //     headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    //   }
    //);

    const apiurl = this.PaymentURL + '/fetchTransactionRules';

    if (params['perPage']) {
      params['perPage'] = params['perPage'];
    }

    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: params
    });
  }

  // to get fees
  getTransactionRules(id) {
    const apiurl = this.PaymentURL + '/fetchFees?';
    return this.http.get(apiurl + `portalId=` + id + `&flag=true`);
  }

  saveEditTransactionRules(requestParams, id) {
    const type = !!id ? 'put' : 'post';
    const url = !!id ? this.PaymentURL + '/updateTransactionRule' : this.PaymentURL + '/saveTransactionRule';

    return this.http[type](url, requestParams);
  }

  getVersionsList(requestBody) {
    const apiurl = this.PaymentURL + '/getVersions?';
    //`portalId=` + var1 + `&feeId=` + var2
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  getCategoryList(var1) {
    const apiurl = this.PaymentURL + '/getCategory?';
    return this.http.get(apiurl + `portalId=` + var1);
  }

  /**
   * @description Get fee details for requested parameters
   * @param params
   */
  getFeeDetailsList(params) {
    const apiurl = this.PaymentURL + '/getFeesDetails';
    // Set per_page key with perPage key as per request format
    if (params['perPage']) {
      params['perPage'] = params['perPage'];
    }

    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: params
    });
  }

  reviseFeeRule(requestBody) {
    const apiurl = this.PaymentURL + '/reviseFeeRule';
    return this.http.post(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  uploadFileInBulk(requestBody) {
    const apiurl = this.PaymentURL + '/import-job';
    return this.http.post(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  uploadFileInFeesCorrection(requestBody) {
    const apiurl = this.PaymentURL + '/import-job';
    return this.http.post(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getUploadFileInBulk(requestParams) {
    const apiurl = this.PaymentURL + '/import-job?';
    return this.http.get(apiurl + 'id=' + requestParams, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  cloneFee(requestBody) {
    const apiurl = this.PaymentURL + '/cloneFeeRule';
    return this.http.post(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getFeeRuleById(requestParams) {
    const apiurl = this.PaymentURL + '/getFeesDetailByDocumentId?';
    return this.http.get(apiurl + requestParams[0] + '=' + requestParams[1], {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  saveRevisedFees(req) {
    const apiurl = this.PaymentURL + '/import-job';
    if (req != '') {
      return this.http.post(apiurl, req, {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
      });
    }
  }

  downloadFeeDetails(req) {
    const apiurl = this.PaymentURL + '/export-job';
    if (req != '') {
      return this.http.post(apiurl, req, {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
      });
    }
  }

  getPropertyDetails(req) {
    const apiurl = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(apiurl);
  }
}
