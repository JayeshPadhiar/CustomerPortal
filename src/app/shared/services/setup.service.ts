import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorHandlingService } from 'src/app/shared/services/error-handling.service';
import { API_ROUTE_LIST } from '../constants/api-routes.constant';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetUpService {
  private ApiUrl = env.API_URL;
  private AuthorizationToken: string;
  private accountslug: string;
  // workspaceStatusSubject = new BehaviorSubject<any>('');
  // _workspaceStatusSubject = this.workspaceStatusSubject.asObservable();
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
    this.ApiUrl = 'https://' + this.accountslug + '.' + this.ApiUrl.split('/')[0];
  }

  // TODO: merge filter and listing function
  getSetUpGoalsList() {
    const apiurl = API_ROUTE_LIST.SET_UP;
    return this.http
      .get(apiurl, {
        headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
      })
      .pipe(
        map(data => {
          // console.log(data);
          let datas = { ...data };
          if (datas) {
            //  console.log(" tst " , datas['workspaceStatus']);
            //  this.workspaceStatusSubject.next(datas['workspaceStatus']);
          }
          return { ...data }; // data['goalDtos'];
        })
      );
  }

  postSetUpGoal(goalBody) {
    const apiurl = API_ROUTE_LIST.MARK_DO_LATER;
    return this.http.post(apiurl, goalBody, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }
}
