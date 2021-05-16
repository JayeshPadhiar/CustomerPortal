import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { API_ROUTE_LIST } from '../constants/api-routes.constant';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private ApiUrl = environment.PLATFORM_API_URL;
  private AuthorizationToken: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Get access token
    this.AuthorizationToken = this.authService.getAuthToken();
    this.AuthorizationToken = 'Bearer ' + this.AuthorizationToken;
  }

  createExportJob(requestBody) {
    return this.http.post(this.ApiUrl + API_ROUTE_LIST.CREATE_EXPORT_JOB_ORDER_RETURN, requestBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  createTemplate(body) {
    const url = `${this.ApiUrl}/export-job/template`;
    return this.http.post(url, body);
  }

  createScheduleJob(body) {
    const url = `${this.ApiUrl}/export-job/schedule`;
    return this.http.post(url, body);
  }

  getTeamMembers() {
    const url = 'v1/user?page=1&perPage=1000';
    return this.http.get(url).pipe(
      map(res => {
        return res['data'].filter(x => x['status'] == '1');
      })
    );
  }

  getTemplates(jobType) {
    const url = `${this.ApiUrl}/export-job/template?jobType=${jobType}`;
    return this.http.get(url);
  }
}
