import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  snackbar$: Subscription;

  private INVALID_ACCESS_TOKEN_MESSAGE: string;

  constructor(private snackbar: MatSnackBar, private authService: AuthService) {
    this.INVALID_ACCESS_TOKEN_MESSAGE = 'invalid access token';
  }

  /**
   * Logout from application on error
   *
   * @author Chandrika Aggarwal <chandrika@eshopbox.com>
   * @param errorMessage
   */
  logoutOnError(message: any = 'Something went wrong !!') {
    let snackbarRef;

    // TODO:: Styling is not working
    // Show error notification after 1.5 sec
    setTimeout(() => {
      snackbarRef = this.snackbar.open(message, '', {
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }, 1500);

    // Hide bar after 6 sec
    setTimeout(() => {
      snackbarRef.dismiss();
    }, 6000);

    // Logout
    this.authService.logout();
  }

  /**
   * Error notification functionality
   *
   * @param message
   * @param isSplit
   *
   * @author Chandrika Aggarwal <chandrika@eshopbox.com>
   */
  errorNotification(message: any = null, isSplit: boolean = false) {
    // Split message if requested
    if (isSplit) {
      message = this.splitMessage(message);
    }

    if (message == this.INVALID_ACCESS_TOKEN_MESSAGE) {
      this.logoutOnError('Session is expired');
      return false;
    }

    const snackbarRef = this.snackbar.open(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar']
    });

    setTimeout(() => {
      snackbarRef.dismiss();
    }, 5000);
  }

  /**
   * Show success notification
   *
   * @param message
   * @author Chandrika Aggarwal <chandrika@eshopbox.com>
   */
  successNotification(message: any = null) {
    const snackbarRef = this.snackbar.open(message, '', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['success-snackbar']
    });

    setTimeout(() => {
      snackbarRef.dismiss();
    }, 5000);
  }

  /**
   * Split requested string message by requested separator
   *
   * @param stringMessage
   * @param separator
   *
   * @author Chandrika Aggarwal <chandrika@eshopbox.com>
   */
  splitMessage(stringMessage, separator: any = ':') {
    if (!stringMessage) {
      return stringMessage;
    }

    const splittedString = stringMessage.split(separator);

    if (splittedString[1]) {
      return splittedString[1];
    }

    return stringMessage;
  }
}
