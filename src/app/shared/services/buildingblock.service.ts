import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildingblockService {
  constructor(private http: HttpClient, private authService: AuthService) {
    // Get access token
    this.AuthorizationToken = this.authService.getAuthToken();
    this.AuthorizationToken = 'Bearer ' + this.AuthorizationToken;
  }

  private AuthorizationToken: string;
  buildingBlockUrl = 'buildingBlock';
  BB_API_URL = environment.BUILDINGBLOCK_API_URL;
  BB_LIST = this.BB_API_URL + this.buildingBlockUrl + '?isCore=|IS|false';
  buildingBlocks = this.BB_API_URL + this.buildingBlockUrl;
  buildingBlock = this.BB_API_URL + this.buildingBlockUrl;

  getBuildingBlock(handlebar): Observable<any> {
    return this.http.get(this.buildingBlock + '/' + handlebar, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getBuildingBlocks(): Observable<any> {
    return this.http.get(this.BB_LIST, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  // getBuildingBlock(params): Observable<any> {
  //   // console.log(params);
  //   let bb = this.buildingBlocks + '/' + params;
  //   // console.log(bb);
  //   return this.http.get(bb, {
  //     headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
  //   });
  // }

  getAllBuildingBlocks(): Observable<any> {
    return this.http.get(this.buildingBlocks, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getRecords(handleBar, filters): Observable<any> {
    // console.log(params);
    // console.log(params[0].handleBar);
    let RECORD_LIST;
    if (filters === undefined) {
      RECORD_LIST = this.BB_API_URL + handleBar + '/record';
    } else {
      RECORD_LIST = this.BB_API_URL + handleBar + '/record?' + filters;
    }
    return this.http.get(RECORD_LIST, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  // getRecords(params): Observable<any> {
  //   let RECORD_LIST = this.BB_API_URL + params.handlebar + '/record';
  //   return this.http.get(RECORD_LIST, {
  //     headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
  //   });
  // }

  getRecordsWithID(bbhandleBar, recordID) {
    // console.log(bbhandleBar + ' ------->>>>>> ' + recordID);
    let RECORD_LIST = this.BB_API_URL + bbhandleBar + '/record/' + recordID;
    // console.log('In Record IISISISISISISISI');
    return this.http.get(RECORD_LIST, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getRecordswithFilter(filterQuery): Observable<any> {
    // console.log(params);
    // console.log(params[0].handleBar);
    console.log(filterQuery);
    let RECORD_LIST = this.BB_API_URL + 'test' + '/record' + '?' + filterQuery;
    console.log(RECORD_LIST);
    return this.http.get(RECORD_LIST, {
      // params: filterQuery,
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  //===> Mine
  // getFieldList(params) {
  //   console.log(params);
  //   console.log(params.handleBar);
  //   let FIELDS_API_URL = this.BB_API_URL + params + '/field';
  //   return this.http.get(FIELDS_API_URL, {
  //     headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
  //   });
  // }

  getFieldList(params) {
    // let handleBar;
    // if (params.handlebar === undefined) {
    //   handleBar = params;
    // } else {
    //   handleBar = params.handlebar;
    // }
    // console.log(params);
    // console.log(params.handlebar);
    let FIELDS_API_URL = this.BB_API_URL + params + '/field';
    return this.http.get(FIELDS_API_URL, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getFieldWithID(bbhandleBar, fieldHandleBar) {
    let FIELDS_API_URL = this.BB_API_URL + bbhandleBar + '/field/' + fieldHandleBar;
    // let FIELDS_API_URL = this.BB_API_URL + params + '/field';
    return this.http.get(FIELDS_API_URL, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getActionList(params) {
    console.log(params);
    let ACTIONS_API_URL = this.BB_API_URL + params + '/action';
    return this.http.get(ACTIONS_API_URL, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  deleteBuildingBlock(params) {
    let DELETE_BB_API = this.BB_API_URL + 'buildingBlock/' + params.handlebar;
    return this.http.delete(DELETE_BB_API, {});
  }

  getBuildingBlockActions(handlebar): Observable<any> {
    let FIELDS_API_URL = this.BB_API_URL + handlebar + '/action';
    let data = this.http.get(FIELDS_API_URL, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
    return data;
  }

  deleteRecords(buldingBlockHandleBar, id) {
    let RECORD_LIST = this.BB_API_URL + 'test' + '/record' + '?' + 'id=' + id;
    console.log(RECORD_LIST);
    return this.http.delete(RECORD_LIST, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getActionsList(bbhandleBar): Observable<any> {
    let ACTIONS_API_URL = this.BB_API_URL + bbhandleBar + '/action';
    return this.http.get(ACTIONS_API_URL, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
  }

  getBuildingBlockAction(buildingBlockHandlebar, actionHandleBar): Observable<any> {
    let FIELDS_API_URL = this.BB_API_URL + buildingBlockHandlebar + '/action/' + actionHandleBar;
    // let data = this.http.get("https://montecarlo.auperator.co/buildingblock/api/v1/test/action", {
    let data = this.http.get(FIELDS_API_URL, {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
    });
    return data;
  }

  getFilters(payload) {
    const url = 'product-engine/api/v1/key';
    return this.http.get(url).pipe(
      map(filter => {
        let facets = [];
        filter['items'].forEach(data => {
          if (data['fieldType'].toLowerCase() === 'dropdown') {
            facets.push(data['key']);
          }
        });
        this.manupulateData(facets, filter);
        return filter['items'];
      })
    );
  }

  manupulateData(facets, filter) {
    // this.getDropdownValues(facets).subscribe(res => {
    //   if (res) {
    //     for (let key in res) {
    //       filter['items'].map(x => {
    //         if (x['key'].toLowerCase() === key.toLowerCase()) {
    //           x['value'] = res[key];
    //         }
    //         return x;
    //       });
    //     }
    //   }
    // });
  }

  // addField(){
  //   this.http.post<any>('https://jsonplaceholder.typicode.com/posts', body, { headers }).subscribe(data => {
  //   this.postId = data.id;
  // })
  // }

  // deleteBuildingBlock(params) {
  //   let DELETE_BB_API = this.BB_API_URL + 'buildingBlock/' + params.handlebar;
  //   return this.http.delete(DELETE_BB_API, {
  //     headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.AuthorizationToken)
  //   });
  // }

  // addField(){
  //   this.http.post<any>('https://jsonplaceholder.typicode.com/posts', body, { headers }).subscribe(data => {
  //   this.postId = data.id;
  // })
  // }
}
