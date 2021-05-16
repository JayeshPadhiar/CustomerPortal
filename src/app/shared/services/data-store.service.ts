import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Records } from 'src/app/records/containers/form-runner/form-base';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  handleBarDetils: any = '';
  FieldDetails: any;
  buildingBlockDetails: any;
  buildingBlockActions: any;
  allBuildingBlockRecords: any[] = [];
  currentFieldHandleBar: string = '';
  allFieldsData: any[] = [];
  allFiles: any[] = [];
  allKeywords: any[] = [];
  currentAction: any;
  currentField: any;
  currentStepperIndex: number = 0;
  savedActionsRecordsResponses: any[] = [];
  selectedRecordFromRecordList: any;

  public getUpdatedRecords = new Subject();
  public getUpdatedFilesFromRight = new Subject();
  public getUpdatedFilesFromLeft = new Subject();
  public hideShowMobileView = new Subject();
  public getUpdateWhenHiddenField = new Subject();
  public getActionUpdatesFromLeft = new Subject();
  public getReferenceFromPopupToLeft = new Subject();
  public getReferenceFromPopupToRight = new Subject();
  public hidePopup = new Subject();
  public updateReferenceDetailsToLeftParent = new Subject();
  public updateReferenceDetailsToRightParent = new Subject();
  public updateKeywordsToRightSide = new Subject();

  constructor() {}

  setUpdatedRecordsToLeftSide(data: any) {
    this.getUpdatedRecords.next(data);
  }
  setUpdatedFilesToLeftSide(data: any) {
    this.getUpdatedFilesFromRight.next(data);
  }
  setUpdatedFilesToRightSide(data: any) {
    this.getUpdatedFilesFromLeft.next(data);
  }

  changeMobileView(data: any) {
    this.hideShowMobileView.next(data);
  }

  updateWhenHiddenField(data: any) {
    this.getUpdateWhenHiddenField.next(data);
  }

  updateActionsDetailsToRight(data: any) {
    this.getActionUpdatesFromLeft.next(data);
  }

  updateReferenceToLeft(data: any) {
    this.getReferenceFromPopupToLeft.next(data);
  }

  updateReferenceToRight(data: any) {
    this.getReferenceFromPopupToRight.next(data);
  }

  closePopup(data: any) {
    this.hidePopup.next(data);
  }

  updateReferenceDetailsToLeft(data: any) {
    this.updateReferenceDetailsToLeftParent.next(data);
  }

  updateReferenceDetailsToRight(data: any) {
    this.updateReferenceDetailsToRightParent.next(data);
  }

  updateKeywordsToRight(data: any) {
    this.updateKeywordsToRightSide.next(data);
  }
}

export class DataStoreServicePopUp {
  handleBarDetils: any = '';
  FieldDetails: any;
  buildingBlockDetails: any;
  buildingBlockActions: any;
  allBuildingBlockRecords: any[] = [];
  currentFieldHandleBar: string = '';
  allFieldsData: Records[] = [];
  allFiles: any[] = [];
  allKeywords: any[] = [];
  currentAction: any;
  currentField: any;
  currentStepperIndex: number = 0;
  savedActionsRecordsResponses: any[] = [];

  public getUpdatedRecords = new Subject();
  public getUpdatedFilesFromRight = new Subject();
  public getUpdatedFilesFromLeft = new Subject();
  public hideShowMobileView = new Subject();
  public hideShowPopUpActionView = new Subject();
  public getUpdateWhenHiddenField = new Subject();
  public getActionUpdatesFromLeft = new Subject();
  public getReferenceFromPopupToLeft = new Subject();
  public getReferenceFromPopupToRight = new Subject();
  public hidePopup = new Subject();
  public updateReferenceDataToPopup = new Subject();
  public updateReferenceDetailsToLeftParent = new Subject();
  public updateReferenceDetailsToRightParent = new Subject();
  public updateKeywordsToRightSide = new Subject();

  constructor() {}

  setUpdatedRecordsToLeftSide(data: any) {
    this.getUpdatedRecords.next(data);
  }
  setUpdatedFilesToLeftSide(data: any) {
    this.getUpdatedFilesFromRight.next(data);
  }
  setUpdatedFilesToRightSide(data: any) {
    this.getUpdatedFilesFromLeft.next(data);
  }

  changeMobileView(data: any) {
    this.hideShowMobileView.next(data);
  }

  changePopUpActionView(data: any) {
    this.hideShowPopUpActionView.next(data);
  }

  updateWhenHiddenField(data: any) {
    this.getUpdateWhenHiddenField.next(data);
  }

  updateActionsDetailsToRight(data: any) {
    this.getActionUpdatesFromLeft.next(data);
  }

  updateReferenceToLeft(data: any) {
    this.getReferenceFromPopupToLeft.next(data);
  }

  updateReferenceToRight(data: any) {
    this.getReferenceFromPopupToRight.next(data);
  }

  closePopup(data: any) {
    this.hidePopup.next(data);
  }

  updatePopupTableList(data: any) {
    this.updateReferenceDataToPopup.next(data);
  }

  updateReferenceDetailsToLeft(data: any) {
    this.updateReferenceDetailsToLeftParent.next(data);
  }

  updateReferenceDetailsToRight(data: any) {
    this.updateReferenceDetailsToRightParent.next(data);
  }

  updateKeywordsToRight(data: any) {
    this.updateKeywordsToRightSide.next(data);
  }
}
