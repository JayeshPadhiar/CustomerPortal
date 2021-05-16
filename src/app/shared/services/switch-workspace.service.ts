import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthActionTypes } from '../../auth/actions/auth.actions';
import { getCurrentAccount } from '../../auth/reducers/auth.selectors';
import { ROUTES } from 'src/app/constants/routes';

@Injectable({ providedIn: 'root' })
export class SwitchWorkspaceService {
  accountSubscription$: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private store: Store<{ auth }>
  ) {}

  switchToWorkspace(accountSlug, redirectUrl, queryParams?) {
    console.log('queryParams optional', queryParams);
    this.authService.setWorkspace(accountSlug);
    this.authService.getWorkspaceList().subscribe((ws: any) => {
      if (ws.data !== undefined) {
        const workspace = ws.data.filter(x => x.accountSlug == accountSlug)[0];

        this.onWorkspaceSelection(workspace, redirectUrl, queryParams);
      }
    });
  }

  onWorkspaceSelection(workspace, redirectUrl, queryParams) {
    this.authService.setWorkspace(workspace.accountSlug);
    this.redirectUser(workspace, redirectUrl, queryParams);
  }

  redirectUser(workspace, redirectUrl, queryParams) {
    if (environment.production) {
      window.location.href =
        'https://' + workspace.accountSlug + environment.BASE_DOMAIN + redirectUrl + `?${queryParams}`;
    } else {
      this.getUserProfile();
      this.getUserAccountDetails();
    }
  }

  getUserProfile() {
    this.store.dispatch({ type: AuthActionTypes.GET_USER_PROFILE });
  }

  getUserAccountDetails() {
    this.accountSubscription$ = this.store.pipe(select(getCurrentAccount)).subscribe(result => {
      if (
        !result ||
        (null !== result &&
          (result.accountSlug + '').toLowerCase() != (this.authService.getAccountSlug() + '').toLowerCase())
      ) {
        console.log('INSIDE iF');
        this.store.dispatch({ type: AuthActionTypes.GET_USER_ACCOUNT_DETAILS });
        return;
      }
      this.router.navigate([ROUTES.DASHBOARD_OVERVIEW]);
      // switch (result.status) {
      //   case '0':
      //     this.router.navigate([ROUTES.ON_SIGNUP_SUCCESS], {
      //       queryParams: { type: ROUTES.UNDER_REVIEW }
      //     });
      //     this.authService.deleteItemFromCookie(this.authService.REDIRECT_URL_KEY);
      //     break;

      //   case '1':
      //     const returnUrl = this.authService.getReturnUrl();
      //     if (returnUrl && result['stepsCompleted'] > 4) {
      //       const urlWithoutHttp = (returnUrl || '').split('//')[1];
      //       const slugFromReturnUrl = urlWithoutHttp.split('.')[0];
      //       const navigateToUrl = urlWithoutHttp.substring(urlWithoutHttp.indexOf('/'));
      //       if ((slugFromReturnUrl || '').toLowerCase() === (this.authService.getAccountSlug() || '').toLowerCase()) {
      //         this.authService.deleteItemFromCookie(this.authService.REDIRECT_URL_KEY);
      //         window.location.href = returnUrl;
      //       }
      //     }

      //     if (result['userAccountMappingRole'] === 'admin' || result['userAccountMappingRole'] === 'user') {
      //       this.navigateTo(5);
      //     } else {
      //       this.navigateTo(result['stepsCompleted']);
      //     }
      //     break;

      //   default:
      //     this.authService.deleteItemFromCookie(this.authService.REDIRECT_URL_KEY);
      //     this.alertService.showError(ALERT_MESSAGES.INACTIVE_USER);
      //     break;
      // }
      if (this.accountSubscription$) {
        this.accountSubscription$.unsubscribe();
      }
    });
  }

  navigateTo(step) {
    switch (step) {
      case 1:
        this.router.navigate([ROUTES.REGISTRATION_COMPANY]);
        break;

      case 2:
        this.router.navigate([ROUTES.REGISTRATION_WAREHOUSE]);
        break;

      case 3:
        this.router.navigate([ROUTES.REGISTRATION_BRAND]);
        break;

      case 4:
        this.router.navigate([ROUTES.REGISTRATION_TEAM]);
        break;

      case 5:
        this.router.navigate([ROUTES.DASHBOARD_OVERVIEW]);
        break;

      default:
        this.router.navigate([ROUTES.ON_SIGNUP_SUCCESS], { queryParams: { type: 'welcome' } });
        break;
    }
  }
}
