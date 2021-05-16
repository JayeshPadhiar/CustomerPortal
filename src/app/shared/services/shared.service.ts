import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import filestack from 'filestack-js';
import { environment } from 'src/environments/environment';

const client = filestack.init(environment.FILESTACK_APIKEY);

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isCreateConsignmentClickEnable: boolean = true;
  constructor() {}

  private count = new BehaviorSubject<any>('');
  storedCount = this.count.asObservable();
  private queryParams = new BehaviorSubject<any>('');
  storedQP = this.queryParams.asObservable();
  private warehouse = new BehaviorSubject<any>('');
  updateWarehouse = this.warehouse.asObservable();

  loaderSource = new Subject<{ status: boolean }>();
  loaderListener = this.loaderSource.asObservable();
  navHeader; //For Showing Nav Header in Product List Page While Redirection From Dashboard
  // bbDetails;

  showHideLoader(status: boolean) {
    this.loaderSource.next({ status: status });
  }

  /**
   * @author Saher Shaukat
   * @description marks form as touched
   * @param {FormGroup} formGroup formgroup to be marked as touched
   */
  markFormGroupTouched(formGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  uploadDocument(acceptedFormats) {
    return client.pick({
      maxFiles: 1,
      //  accept: ['.pdf', '.jpg', '.png', '.jpeg', '.txt', '.xls', 'xlsx', '.csv'], // formats
      accept: acceptedFormats, // formats

      uploadInBackground: false,
      startUploadingWhenMaxFilesReached: true,
      fromSources: ['local_file_system', 'imagesearch', 'googledrive', 'dropbox'],
      onOpen: () => {},
      rejectOnCancel: true,
      storeTo: {
        location: 'gcs',
        path: '/import_jobs/'
      }
    });
  }

  beforeUnload() {
    window.onbeforeunload = function(event) {
      event.returnValue = 'Reloading might cause loss of Data.';
    };
  }

  updateCounts(data) {
    this.count.next(data);
  }

  updateQueryParams(data) {
    this.queryParams.next(data);
  }

  updateWareHouseDetails(data) {
    this.warehouse.next(data);
  }

  getFileMetaData(fileKey) {
    return client.metadata(fileKey);
  }

  downloadFile(fileKey) {
    return client.retrieve(fileKey, {
      // metadata: true,
    });
  }
}
