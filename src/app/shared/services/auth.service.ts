import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';
import { Configuration } from '../../constants/config';
import { AlertService } from './alert.service';
import { ROUTES } from '../../constants/routes';
import { ALERT_MESSAGES } from 'src/app/constants/constants';
import { AuthActionTypes } from 'src/app/auth/actions/auth.actions';
import { UserService } from './user.service';
import { ERROR_MESSAGES } from 'src/app/constants/error_code_messages';
import { FcActionTypes } from 'src/app/fc/actions/fc.action';
import { ChannelsActionTypes } from 'src/app/channels/actions/channels.action';
import { BehaviorSubject, of } from 'rxjs';
import { Auth0LockPasswordless } from 'auth0-lock';
import { catchError, map, tap } from 'rxjs/operators';
// import { Auth0Lock } from 'auth0-lock';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth0 = new Auth0LockPasswordless(environment.AUTH.CLIENT_ID, environment.AUTH.DOMAIN, {
    oidcConformant: false,
    autoclose: true,
    closable: false,
    rememberLastLogin: false,
    allowSignup: false,
    container: 'hiw-login-container',
    auth: {
      autoParseHash: false,
      redirectUrl: environment.AUTH.REDIRECT,
      responseType: 'token id_token',
      audience: environment.AUTH.AUDIENCE,
      params: {
        scope: 'openid profile email'
      }
    },
    theme: {
      logo: 'assets/img/logo.svg',
      primaryColor: '#31324F',
      displayName: 'Sign in'
    },
    languageDictionary: {
      emailInputPlaceholder: 'Email Address',
      title: 'Log in to Eshopbox workspace',
      codeInputPlaceholder: 'Enter your 6 digit code',
      submitLabel: 'Continue',
      signUpTerms: ``,
      passwordlessEmailInstructions: 'We’ll email you a magic code for a password-free sign in.',
      // passwordlessEmailCodeInstructions: `We've sent 6-digit code to %s. The code expires shortly, so please enter it soon.`,
      resendCodeAction: `Didn't get the code? Retry`
      // passwordless:{
      //   'lock.fallback':'This email is not registered.'
      // }
    },
    allowedConnections: ['email'],
    passwordlessMethod: 'code'
    // allowedConnections: ['Username-Password-Authentication'],
  });

  authSuccessUrl = '';
  authFailureUrl = 'auth/login';
  ACCESS_TOKEN = 'access_token';
  WORKSPACE_KEY = 'accountSlug';
  WORKSPACE_LENGTH = 'noOfAccounts';
  WORKSPACE_LIST_KEY = 'listOfAccounts';
  REDIRECT_URL_KEY = 'redirectUrl';
  REFRESH_TOKEN = 'refresh_token';
  // access_token = new BehaviorSubject<any>(0);
  // updated_access_token = this.access_token.asObservable();
  WORKSPACE_NAME = 'workspaceName';
  private segmentsApiUrl = environment.PLATFORM_API_URL;

  constructor(
    private api: ApiService,
    private router: Router,
    private API_URL: Configuration,
    private cookieService: CookieService,
    private alertService: AlertService,
    private userService: UserService,
    private store: Store<{ auth; fc }>
  ) {}

  public handleAuthenticationWithHash(): void {
    this.auth0.resumeAuth(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setAuth(authResult.accessToken);
        let expiresAt = authResult.expiresIn * 1000 + Date.now();
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));
        const redirectUrl = this.getReturnUrl();
        if (redirectUrl) {
          this.redirectToStoredUrl(redirectUrl);
          return;
        }
        this.router.navigate(['/auth/signin-complete']);
        // this.router.navigate([this.authSuccessUrl]);
      } else if (err) {
        alert(`Error: ${err.error}. Check the console for further details.`);
        this.router.navigate([this.authFailureUrl]);
      }
    });
  }

  checkSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult) {
        console.log('SESSION RENEWED', authResult);
        let expiresAt = authResult.expiresIn * 1000 + Date.now();
        localStorage.setItem('expires_at', JSON.stringify(expiresAt));
        this.setAuth(authResult.accessToken);
      } else if (err) {
        console.log('err', err);
      }
    });
  }

  renewToken() {
    const url = `api/v2/access_token`;
    const body = {
      refreshToken: this.getRefreshToken()
    };
    return this.api.post(url, body).pipe(
      tap(res => {
        if (res['accessToken']) {
          this.setAuth(res['accessToken']);
        }
      })
    );
  }

  /*** @description - Method To Get Get Stream Token To Access Get Stream Data*/
  public getActivityToken() {
    const TOKEN_API_URL = environment.ACTIVITY_TOKEN;
    return this.api.get(TOKEN_API_URL);
  }

  /*** @description - Method To Set Activity Token To Cookies*/
  public setGetStreamToken(getStreamToken) {
    // Set Activity token in storage When user selects Workspace
    this.cookieService.set('getStream_token', getStreamToken, 3, '/', environment.COOKIE_DOMAIN, false, 'Lax');
  }

  /*** @description - Method To Fetch Get Stream Workspace Token From Cookies*/
  public fetchGetStreamToken() {
    if (this.cookieService.get('getStream_token') && this.cookieService.get('getStream_token') !== '') {
      return this.cookieService.get('getStream_token');
    } else {
      return null;
    }
  }

  /*** @description - Method To Get FulfillmentCenter Data From Backend*/
  public getFulfillmentCentreData() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_FULFILLMENT_CENTERS}`);
  }

  /*** @description - Method To Get Sales Channel Data From Backend*/
  public getSalesChannelData() {
    return this.api.get(`${this.API_URL.CONFIG_URL.GET_SALES_CHANNELS}`);
  }

  /*** @description - Method To Get Segments Data From Backend*/
  public getSegmentsData() {
    const API_URL = this.segmentsApiUrl + '/segment';
    const queryParams = { page: 1, per_page: 100 };
    return this.api.get(API_URL, { params: queryParams });
  }

  redirectToStoredUrl(redirectUrl) {
    const redirectUrlSlug = redirectUrl.split('//')[1].split('.')[0];
    this.getWorkspaceList().subscribe(
      res => {
        if (res) {
          const workspace = this.checkUserHasAccessToAccount(redirectUrlSlug, res['data']);
          if (workspace) {
            this.onWorkspaceSelection(workspace, res['data']);
          } else {
            this.router.navigate(['/auth/signin-complete']);
          }
        }
      },
      error => {
        const errorCode = error.error.error ? (error.error.error.message || '').split(':')[0] : '';
        if (!!ERROR_MESSAGES.GET_ACCOUNT_LIST[errorCode]) {
          this.alertService.showError(ERROR_MESSAGES.GET_ACCOUNT_LIST[errorCode]);
        }
      }
    );
  }

  onWorkspaceSelection(workspace, workspaceList) {
    this.setNumberOfWorkspace(workspaceList.length);
    const slugArray = workspaceList.map(item => item.accountSlug);
    this.setListOfAccounts(slugArray);
    this.setWorkspace(workspace.accountSlug);

    switch (workspace.userAccountMappingStatus) {
      case '0':
        this.userService.acceptInvite(workspace.userAccountMappingId).subscribe(res => {
          if (res) {
            window.location.href = 'https://' + workspace.accountSlug + environment.BASE_DOMAIN;
          }
        }); // accept invite directly if invitation pending
        break;

      case '1':
        window.location.href = 'https://' + workspace.accountSlug + environment.BASE_DOMAIN;
        break;

      case '2':
        //logout if status inactive
        this.alertService.showError(ALERT_MESSAGES.INACTIVE_USER);
        setTimeout(() => {
          this.store.dispatch({ type: AuthActionTypes.LOGOUT });
        }, 3000);
        break;

      default:
        this.alertService.showError(ALERT_MESSAGES.INACTIVE_USER);
        setTimeout(() => {
          this.store.dispatch({ type: AuthActionTypes.LOGOUT });
        }, 3000);
        break;
    }
  }

  /**
   *
   * returns workspace if user has access to return url slug else null
   *
   * @author Saher Shaukat
   * @param accountSlug slug from redirect url
   * @param accountList list of workspaces user has access to
   */
  checkUserHasAccessToAccount(accountSlug, accountList) {
    if (!!accountList.length) {
      for (let i = 0; i < accountList.length; i++) {
        if (accountList[i].accountSlug.toLowerCase() === accountSlug.toLowerCase()) {
          return accountList[i];
        }
      }
    }
    return null;
  }

  signUp(user) {
    return this.api.post(`${this.API_URL.CONFIG_URL.SIGNUP}`, user);
  }
  signupViaInvite(user) {
    return this.api.post(`${this.API_URL.CONFIG_URL.SIGNUP}?acceptInvite=true`, user);
  }

  validateOtp(body) {
    const url = 'v2/user/otp/validate';
    return this.api.post(url, body);
  }

  createAccount(body) {
    return this.api.post(`${this.API_URL.CONFIG_URL.CREATE_ACCOUNT}`, body).pipe(
      map(res => {
        return res;
      }),
      catchError(error => of(error))
    );
  }

  createAccountSlug(payload) {
    const url = `${this.API_URL.CONFIG_URL.CREATE_ACCOUNT}/${payload.id}`;
    return this.api.put(url, payload.body);
  }

  getWorkspaceList() {
    // this.checkSession()
    return this.api.get(`${this.API_URL.CONFIG_URL.ACCOUNT_LIST}`);
  }

  login() {
    this.auth0.show();
  }

  forgotPassword(email) {
    this.auth0.changePassword(
      {
        connection: 'Username-Password-Authentication',
        email: email
      },
      function(err, res) {
        if (err) {
          return alert('Something went wrong: ' + err.message);
        }
        return alert(res);
      }
    );
  }

  /**
   * @author Saher Shaukat
   * @description sets user authentication token
   * @param {string} accessToken authentication token
   */
  setAuth(accessToken) {
    this.cookieService.set(this.ACCESS_TOKEN, accessToken, 3, '/', environment.COOKIE_DOMAIN, false, 'Lax');
    // this.cookieService.set(this.ACCESS_TOKEN, accessToken, 3, '/', environment.COOKIE_DOMAIN, true, 'Lax');
  }

  removeAuthToken() {
    // Remove token from storage
    this.cookieService.delete(this.ACCESS_TOKEN);
  }

  /**
   * @author Saher Shaukat
   * @description returns user authentication token
   * @return {string} null if token not present
   */
  getAuthToken() {
    if (this.cookieService.get(this.ACCESS_TOKEN) && this.cookieService.get(this.ACCESS_TOKEN) !== '') {
      return this.cookieService.get(this.ACCESS_TOKEN);
    } else {
      return null;
    }
  }

  getRefreshToken() {
    if (this.cookieService.get(this.REFRESH_TOKEN) && this.cookieService.get(this.REFRESH_TOKEN) !== '') {
      return this.cookieService.get(this.REFRESH_TOKEN);
    } else {
      return null;
    }
  }

  /**
   * @author Saher Shaukat
   * @description sets user's workspace
   * @param {string} workspace user's current workspace
   */
  setWorkspace(workspace) {
    // Set accountSlug in storage
    this.cookieService.set(this.WORKSPACE_KEY, workspace, 3, '/', environment.COOKIE_DOMAIN, false, 'Lax');
    // this.cookieService.set(this.WORKSPACE_KEY, workspace, 3, '/', environment.COOKIE_DOMAIN, true, 'Lax');
  }

  setRefreshToken(refreshToken) {
    // Set accountSlug in storage
    this.cookieService.set(this.REFRESH_TOKEN, refreshToken, 3, '/', environment.COOKIE_DOMAIN, false, 'Lax');
    // this.cookieService.set(this.WORKSPACE_KEY, workspace, 3, '/', environment.COOKIE_DOMAIN, true, 'Lax');
  }
  setWorkspaceName(workspaceName) {
    this.cookieService.set(this.WORKSPACE_NAME, workspaceName, 3, '/', environment.COOKIE_DOMAIN, false, 'Lax');
  }

  setNumberOfWorkspace(length) {
    // Set no. of accounts in storage
    this.cookieService.set(this.WORKSPACE_LENGTH, length, 3, '/', environment.COOKIE_DOMAIN, false, 'Lax');
    // this.cookieService.set(this.WORKSPACE_LENGTH, length, 3, '/', environment.COOKIE_DOMAIN, true, 'Lax');
  }

  setReturnUrl(url) {
    // Set return url in storage to redirect to after login
    this.cookieService.set(this.REDIRECT_URL_KEY, url, 3, '/', environment.COOKIE_DOMAIN, false, 'Lax');
    // this.cookieService.set(this.REDIRECT_URL_KEY, url, 3, '/', environment.COOKIE_DOMAIN, true, 'Lax');
  }

  /**
   * @author Saher Shaukat
   * @description returns user's workspace count
   * @return {number} null if no of workspaces not present
   */
  getNumberOfWorkspaces() {
    if (this.cookieService.get(this.WORKSPACE_LENGTH) && this.cookieService.get(this.WORKSPACE_LENGTH) !== '') {
      return +this.cookieService.get(this.WORKSPACE_LENGTH);
    } else {
      return null;
    }
  }

  setListOfAccounts(accountList) {
    // Set list of accounts in storage
    this.cookieService.set(
      this.WORKSPACE_LIST_KEY,
      JSON.stringify(accountList),
      3,
      '/',
      environment.COOKIE_DOMAIN,
      false,
      'Lax'
    );

    // this.cookieService.set(this.WORKSPACE_LIST_KEY, accountList, 3, '/', environment.COOKIE_DOMAIN, true, 'Lax');
  }

  /**
   * @author Saher Shaukat
   * @description returns user's workspace count
   * @return {number} null if no of workspaces not present
   */
  getReturnUrl() {
    if (this.cookieService.get(this.REDIRECT_URL_KEY) && this.cookieService.get(this.REDIRECT_URL_KEY) !== '') {
      return this.cookieService.get(this.REDIRECT_URL_KEY);
    } else {
      return null;
    }
  }

  /**
   * @author Saher Shaukat
   * @description returns user's workspace count
   * @return {number} null if no of workspaces not present
   */
  getListOfAccounts() {
    if (this.cookieService.get(this.WORKSPACE_LIST_KEY) && this.cookieService.get(this.WORKSPACE_LIST_KEY) !== '') {
      return JSON.parse(this.cookieService.get(this.WORKSPACE_LIST_KEY));
    } else {
      return null;
    }
  }

  deleteItemFromCookie(key) {
    this.cookieService.delete(key, '/', environment.COOKIE_DOMAIN);
  }

  /**
   * @author Saher Shaukat
   * @description returns user's current workspace
   * @return {string} null if workspace not present
   */
  getAccountSlug() {
    if (this.cookieService.get(this.WORKSPACE_KEY) && this.cookieService.get(this.WORKSPACE_KEY) !== '') {
      return this.cookieService.get(this.WORKSPACE_KEY);
    } else {
      return null;
    }
  }
  getAccountName() {
    if (this.cookieService.get(this.WORKSPACE_NAME) && this.cookieService.get(this.WORKSPACE_NAME) !== '') {
      return this.cookieService.get(this.WORKSPACE_NAME);
    } else {
      return null;
    }
  }
  /**
   * @author Saher Shaukat
   * @description returns whether user is logged in or not
   * @return {Boolean} true if user is logged in else false
   */
  get isLoggedIn() {
    if (this.getAuthToken() == null) {
      return false;
    }
    return true;
  }

  /**
   * @author Saher Shaukat
   * @description This does a refresh and redirects back to homepage
   */
  logout() {
    this.cookieService.deleteAll('/', environment.COOKIE_DOMAIN);
    localStorage.clear();
    !environment.production
      ? this.router.navigate([ROUTES.LOGIN])
      : (window.location.href = 'https://' + environment.DOMAIN);
  }

  clearLocalData() {
    const returnUrl = this.getReturnUrl();
    this.cookieService.deleteAll('/', environment.COOKIE_DOMAIN);
    localStorage.clear();
    if (returnUrl) {
      this.setReturnUrl(returnUrl);
    }
  }

  switchWorkspace() {
    this.store.dispatch({ type: FcActionTypes.RESET_STATE });
    this.store.dispatch({ type: ChannelsActionTypes.RESET_STATE });
    if (this.getNumberOfWorkspaces() && this.getNumberOfWorkspaces() > 1) {
      !environment.production
        ? this.router.navigate([ROUTES.ON_SIGNIN_COMPLETE])
        : (window.location.href = 'https://' + environment.DOMAIN + ROUTES.ON_SIGNIN_COMPLETE);
    }
  }
  redirectToCreateAccount() {
    this.store.dispatch({ type: FcActionTypes.RESET_STATE });
    this.store.dispatch({ type: ChannelsActionTypes.RESET_STATE });
    // if (this.getNumberOfWorkspaces() && this.getNumberOfWorkspaces() > 1) {
    !environment.production
      ? this.router.navigate([ROUTES.CREATE_ACCOUNT], { queryParams: { fromLogin: true } })
      : (window.location.href = 'https://' + environment.DOMAIN + ROUTES.CREATE_ACCOUNT + '?fromLogin=true');
    // localStorage.setItem('fromLogin', 'true');
    // }
  }

  inviteTeamMembers(body) {
    return this.api.post('v1/user-account-mapping', body);
  }

  resendOtp(email) {
    const url = `${this.API_URL.CONFIG_URL.SIGNUP}?type=resend`;
    return this.api.post(url, email);
  }
}
