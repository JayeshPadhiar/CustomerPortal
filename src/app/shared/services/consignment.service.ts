import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';
import { API_ROUTE_LIST as apiRoute, API_ROUTE_LIST } from '../../shared/constants/api-routes.constant';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentService {
  private ApiUrl = env.API_URL;
  private ExportApiUrl = env.PLATFORM_API_URL;
  private PaymentURL = env.PAYMENTS_API_URL;
  private AuthorizationToken: string;
  private accountslug: string;
  private headers: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private api: ApiService,
    private errorHandlingService: ErrorHandlingService
  ) {
    // Get access token
    this.AuthorizationToken = this.authService.getAuthToken();
    if (this.AuthorizationToken === undefined || this.AuthorizationToken == null) {
      //this.errorHandlingService.logoutOnError('Session timed out');
    }
    this.AuthorizationToken = 'Bearer ' + this.AuthorizationToken;
    //this.AuthorizationToken = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJVVXdSREZCUVRSRFFqQkdORFUxTVVZeE16ZEdPRFJHTnpORk5EaEJSVEU0TVVORk5qVTJOdyJ9.eyJpc3MiOiJodHRwczovL2VzaG9wYm94LXBheW1lbnQtcmVjby5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWM0MmIwMDdhMTZlNjg3ZTgxNjg5Y2Y4IiwiYXVkIjpbImh0dHBzOi8vZXNob3Bib3gtcG9ydGFsLWRldi5hcHBzcG90LmNvbSIsImh0dHBzOi8vZXNob3Bib3gtcGF5bWVudC1yZWNvLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE1NTgwMDcyMjMsImV4cCI6MTU1ODI2NjQyMywiYXpwIjoieVpyNzY3QzQ1TXh5RlVETjJZMnIxZEk0ZndSQVk5bEEiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIGFkZHJlc3MgcGhvbmUgZGVsZXRlOnVzZXJzIiwiZ3R5IjoicGFzc3dvcmQifQ.dQDFjMmJ4Cdc69Jh2Wl63XHJFElN12J98UR5OIPOr0UGSX4Hm2V-gBR_1oZMm879rwBQGT5Qzx2p31dKoMSngAEO4KngxxrmWmGqxG3QnrLpj_irdvVhCrgxeJWjO1zTMDU1mwCR1hNplTziln7CBFSYNfHNtlqj4_0amCY81LRzclZdeOLKVbiP2i_YgwdKmSNixYdxkuagyWEYPZif-Sru-gI_YRwZzO4OkBN4VirHMi-yzPwkKqMKRlbP3EZQW173CdObaBqiEtUh-LHRxmlGxTlXdE86cUhVTuh1bzchd65r59ywKJGupIO8-R8-WhjgP0J6pzW_gVXPmwITSg';

    // Get slug url
    this.accountslug = this.authService.getAccountSlug();
    if (this.accountslug === undefined || this.accountslug == null) {
      // TODO:: redirect
    }
    this.ApiUrl = 'https://' + this.accountslug + '.' + this.ApiUrl;
    this.PaymentURL = 'https://' + this.accountslug + this.PaymentURL;
    // Set headers
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.AuthorizationToken);
  }

  /**
   * Service to get consignment details for requested consignment number
   *
   * @param consignmentNumber
   */
  getConsignmentDetail(consignmentNumber) {
    // console.log('CALLED');
    const apiurl =
      this.ApiUrl +
      '/consignments?page=1&perPage=10&consignmentDetails=true' +
      '&consignment_number=' +
      consignmentNumber;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * Get GRN Details
   *
   * @param requestBody
   * @author Chandrika Aggarwal <chandrika.aggarwal@eshopbox.com>
   */
  getGrnDetails(requestBody) {
    const apiurl = this.ApiUrl + '/consignment/grnItems';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  /**
   * Service to create consignment
   *
   * @param req
   */
  createConsignment(req) {
    const apiurl = this.ApiUrl + '/consignment';

    let requestBody = {};
    requestBody['consignment_type'] = req.consignment_type;
    requestBody['refFromPartyID'] = req.refFromPartyID;
    requestBody['warehouseID'] = req.warehouseID;
    requestBody['itemsFileUrl'] = req.itemsFileUrl;

    if (req.refConsignmentNumber) {
      requestBody['refConsignmentNumber'] = req.refConsignmentNumber;
    }

    if (req.consignmentNumber) {
      requestBody['consignmentNumber'] = req.consignmentNumber;
    }

    if (req.isReplaceSheet) {
      requestBody['isReplaceSheet'] = req.isReplaceSheet;
    }

    return this.http.post(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * Service to schedule consignment
   *
   * @param requestBody
   */
  scheduleConsignment(requestBody) {
    const apiurl = this.ApiUrl + '/consignment';

    return this.http.put(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * Service to get supplier type party list
   *
   * @param requestBody
   */
  fetchPartyList() {
    const apiurl = this.ApiUrl + '/party?page=1&perPage=100&type=supplier&status=1';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * Service to get billing type party list
   *
   * @param req
   */
  fetchWarehouseList() {
    const apiurl = this.ApiUrl + '/party?page=1&perPage=100&type=billing';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * Service to get consignment list for requested filters
   *
   * @param requestBody
   */
  filterConsignments(requestBody) {
    // // if(requestBody && (!requestBody.status || (requestBody && requestBody.status && requestBody.status.length > 0 && typeof(requestBody.status) != 'string' ))) {
    // //   requestBody.status = ['COMPLETE', 'COMPLETED', 'CREATED', 'APPROVED', 'RECEIVED', 'PROCESSING']
    // // }
    // if (requestBody && requestBody.status && typeof(requestBody.status)==='object') {

    // }
    // if (requestBody && requestBody.status && typeof(requestBody.status) === 'string') {

    // }
    const apiurl = this.ApiUrl + '/consignments';
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  /**
   * Service to get all export job list
   *
   * @author Ravi Tripathi
   */
  getAllEximJobs(requestBody) {
    const apiurl = `${this.ApiUrl}/export-job`;
    // const apiurl = `${this.ExportApiUrl}/export-job`;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  /**
   * For Fetching Export Job List in Sidebar Files Section
   *
   * @author Varun Mittal
   */
  getAllExportJobs(requestBody) {
    const apiurl = `${this.ExportApiUrl}/export-job`;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  getAllImportJobs(requestBody) {
    const apiUrl = `${this.ExportApiUrl}/import-job`;
    // const apiUrl = `api/v1/import-job`
    return this.http.get(apiUrl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken),
      params: requestBody
    });
  }

  /**
   * Service to cancel consignment for requested consignment number
   *
   * @param consignmentNumber
   */
  cancelConsignment(consignmentNumber) {
    const apiurl = this.ApiUrl + '/consignment/cancellation?consignmentNumber=' + consignmentNumber;
    return this.http.put(
      apiurl,
      {},
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
      }
    );
  }

  /**
   * Get available time slots
   *
   * @param requestBody
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  getAvailableTimeSlots(requestBody) {
    const apiurl =
      this.ApiUrl + '/timeSlotAvailability?warehouseId=' + requestBody.warehouseId + '&qty=' + requestBody.qty;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * To create export job for GRN Items
   *
   * @param requestBody
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  createGRNReportService(requestBody) {
    const apiurl = this.ApiUrl + '/export-job';
    return this.http.post(apiurl, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * To download grn items report for requested createGRNReportID
   *
   * @param createGRNReportID
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  getGRNReportService(createGRNReportID) {
    const apiurl = this.ApiUrl + '/export-job/' + createGRNReportID;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * To get mapped warehouse list
   *
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  getWarehouseListService() {
    const apiurl = this.ApiUrl + apiRoute.WAREHOUSE_LIST;
    return this.http.get(apiurl, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  /**
   * To create recall consignment
   *
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  createRecallConsignment(requestBody) {
    const apiurl = this.ApiUrl + apiRoute.RECALL_CONSIGNMENT;
    const headers = { headers: this.headers };
    return this.http.post(apiurl, requestBody, headers);
  }

  /**
   * To update recall consignment
   *
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  updateRecallConsignment(requestBody) {
    const apiurl =
      this.ApiUrl +
      apiRoute.RECALL_CONSIGNMENT_UPDATE +
      encodeURIComponent(encodeURIComponent(requestBody['consignmentNumber']));
    const headers = { headers: this.headers };
    return this.http.put(apiurl, requestBody, headers);
  }

  /**
   * To get recall consignment details for requested number
   *
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  getRecallConsignmentDetails(consignmentNumber) {
    const apiurl =
      this.ApiUrl + apiRoute.RECALL_CONSIGNMENT + '/' + encodeURIComponent(encodeURIComponent(consignmentNumber));
    const headers = { headers: this.headers };
    return this.http.get(apiurl, headers);
  }

  /**
   * To get recall consignment list
   *
   * @author Chandrika Aggarwal <chandrika.agarwal@eshopbox.com>
   */
  getRecallConsignmentList(requestBody) {
    const apiurl = this.ApiUrl + apiRoute.RECALL_CONSIGNMENT_LIST;
    const param2 = {
      headers: this.headers,
      params: requestBody
    };
    return this.http.get(apiurl, param2);
  }

  /**
   * Get available time slots for Recall
   *
   * @param requestBody
   * @author Saher Shaukat
   */
  getRecallAvailableTimeSlots(warehouseId) {
    return this.api.get(`${API_ROUTE_LIST.GET_RECALL_AVAILABLE_TIMESLOTS}${warehouseId}`);
  }

  /**
   * Get GRN Report for Recall
   *
   * @param requestBody
   * @author Saher Shaukat
   */
  getRecallGRNReport(requestBody) {
    const consignmentNumber = requestBody.consignmentNumber;
    delete requestBody.consignmentNumber;
    return this.api.get(
      `${API_ROUTE_LIST.RECALL_GET_GRN_REPORT}${encodeURIComponent(encodeURIComponent(consignmentNumber))}`,
      { params: requestBody }
    );
  }

  /**
   * Create recall consignment export job service
   *
   * @param consignmentNumber
   * @author Chandrika Aggarwal
   */
  createRecallConsignmentExportJobService(consignmentNumber) {
    const headers = { headers: this.headers };
    const apiUrl = this.ApiUrl + API_ROUTE_LIST.CREATE_RECALL_CONSIGNMENT_EXPORT_JOB;
    const requestBody = {
      jobType: 'gatepass_items',
      exportFilters: {
        consignmentNumber: consignmentNumber
      }
    };

    return this.api.post(apiUrl, requestBody, headers);
  }
}
