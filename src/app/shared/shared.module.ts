import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgAisModule } from 'angular-instantsearch';
import { Ng5SliderModule } from 'ng5-slider';
import {
  MatRadioModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatListModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatButtonModule,
  MatChipsModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatMenuModule,
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatCardModule
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DownloadWidgetModule } from '../download-widget/download-widget.module';
import { NgOtpInputModule } from 'ng-otp-input';

//COMPONENTS
import { OrderReturnModalComponent } from '../order-return-modal/order-return-modal.component';
import { SortComponent } from '../components/sort/sort.component';
import { FiltersComponent } from './component/filters/filters.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { UploadSheetComponent } from './component/upload-sheet/upload-sheet.component';
import { DownloadTemplateComponent } from './component/download-template/download-template.component';
import { UploadStatusComponent } from './component/upload-status/upload-status.component';
import { DateFilterComponent } from './component/date-filter/date-filter.component';
import { SortingComponent } from './component/sorting/sorting.component';
// import { DownloadComponent } from './component/download/download.component';
import { FilteredChipsComponent } from './component/filtered-chips/filtered-chips.component';
//PIPES
import { GetTruncatedName } from './pipes/string-operations.pipe';
import { Uniquearray } from '../shared/pipes/uniquearray.pipe';
import { TransformDatePipe } from '../_pipes/date-transform.pipe';
import { GetNameFromList } from './pipes/get-portal-name.pipe';
import { GetSum } from './pipes/get-sum.pipe';
import { NumericPipe } from './pipes/numeric.pipe';
import { StringFormatterPipe } from './pipes/stringFormatter.pipe';
//DIRECTIVES
import { NumberOnlyDirective } from './directives/number-only.directive';
//OTHERS
import { Configuration } from '../constants/config';
import { ProductService } from '../shared/services/product.service';
import { BrowserUnsupportedComponent } from './component/browser-unsupported/browser-unsupported.component';
import { ServeErrorPageComponent } from './component/serve-error-page/serve-error-page.component';
import { OtpInputComponent } from './component/otp-input/otp-input.component';
import { ImportFileDialogComponent } from './component/import-file-dialog/import-file-dialog.component';
import { TableDataComponent } from './component/table-element/table-data/table-data.component';
import { AttachFilesComponent } from './component/table-element/attach-files/attach-files.component';
import { EditDialogComponent } from './component/table-element/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './component/table-element/delete-dialog/delete-dialog.component';
import { FieldDetailsFormComponent } from './component/field-details-form/field-details-form.component';
import { MultiValueWidgetComponent } from './component/table-element/multi-value-widget/multi-value-widget.component';
const modules = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  MatRadioModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatSliderModule,
  MatListModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatButtonModule,
  MatChipsModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatTableModule,
  MatDialogModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatMenuModule,
  MatTableModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  RouterModule,
  Ng5SliderModule,
  NgxMatSelectSearchModule,
  NgOtpInputModule
];
const cmps = [
  OrderReturnModalComponent,
  SortComponent,
  FileUploadComponent,
  FiltersComponent,
  PaginationComponent,
  UploadSheetComponent,
  DownloadTemplateComponent,
  UploadStatusComponent,
  DateFilterComponent,
  SortingComponent,
  // DownloadComponent,
  FilteredChipsComponent,
  ServeErrorPageComponent,
  BrowserUnsupportedComponent,
  ImportFileDialogComponent,
  TableDataComponent,
  AttachFilesComponent,
  EditDialogComponent,
  DeleteDialogComponent,
  OtpInputComponent,
  FieldDetailsFormComponent,
  MultiValueWidgetComponent
];
const pipes = [
  GetTruncatedName,
  Uniquearray,
  TransformDatePipe,
  GetNameFromList,
  GetSum,
  NumericPipe,
  StringFormatterPipe
];
const drvs = [NumberOnlyDirective];

@NgModule({
  declarations: [...cmps, ...pipes, ...drvs],
  imports: [...modules, NgAisModule],
  providers: [Configuration, GetSum, ProductService],
  entryComponents: [EditDialogComponent, DeleteDialogComponent],
  exports: [...cmps, ...pipes, ...drvs]
})
export class SharedModule {}
