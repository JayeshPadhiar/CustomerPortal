import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private accountslug: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.accountslug = this.authService.getAccountSlug();
  }

  actiondetails(payload) {
    const url = `${payload.handleBar}/action`;
    return this.http.get(url);
  }

  addRecord(payload) {
    // {
    //   "productName":"Shirt",
    //   "portal": [
    //     "amazon",
    //     "flipkart"
    //   ],
    //   "brand":"montecarlo",
    //   "size": [
    //     "L",
    //     "XL",
    //     "XXL"
    //   ],
    //   "imageIcon":"cloud.appspot.com/bucket1/image.png",
    //   "isCOD":true,
    //   "address":{
    //       "hno": 220,
    //       "street": "professor colony",
    //       "city": "ambala",
    //       "country": "India"
    //     }
    // }
    const url = `${payload.handleBar}/${payload.actionHandleBar}/record`;
    return this.http.post(url, payload.body);
  }

  createRecord(payload) {
    const url = `buildingblock/api/v1/${payload.handleBar}/${payload.actionHandleBar}/record`;
    return this.http.post(url, payload.body);
  }

  updateRecord(payload) {
    console.log(payload);
    const url = `buildingblock/api/v1/${payload.handleBar}/${payload.actionHandleBar}/record/${payload.id}`;
    return this.http.put(url, payload.body);
  }

  editRecord(payload) {
    //   {
    //     "productName": "Shirt",
    //     "portal": [
    //         "amazon",
    //         "flipkart"
    //     ],
    //     "brand": "montecarlo",
    //     "size": [
    //         "L",
    //         "XL",
    //         "XXL"
    //     ],
    //     "imageIcon": "cloud.appspot.com/bucket1/image.png",
    //     "isCOD": true,
    //     "address": {
    //         "hno": 220,
    //         "street": "professor colony",
    //         "city": "ambala",
    //         "country": "India"
    //     }
    // }
    const url = `${payload.handleBar}/${payload.actionHandleBar}/record/${payload.id}`;
    return this.http.put(url, payload.body);
  }

  viewSingleRecord(payload) {
    const url = `${payload.handleBar}/record/${payload.id}`;
    return this.http.get(url);
  }

  listOfRecords(payload) {
    const url = `buildingblock/api/v1/${payload.handleBar}/record`;
    return this.http.get(url);
  }

  deleteRecord(payload) {
    const url = `buildingblock/api/v1/${payload.handleBar}/record?id=${payload.id}`;
    return this.http.delete(url);
  }
  validateRecord(payload) {
    //   {
    //     "records": [
    //         [
    //             {
    //                 "handleBar": "color",
    //                 "value": "red"
    //             },
    //             {
    //                 "handleBar": "size",
    //                 "value": "M"
    //             },
    //             {
    //                 "handleBar": "title",
    //                 "value": "shelf"
    //             }
    //         ],
    //         [
    //             {
    //                 "handleBar": "color",
    //                 "value": "red"
    //             },
    //             {
    //                 "handleBar": "size",
    //                 "value": "M"
    //             },
    //             {
    //                 "handleBar": "title",
    //                 "value": "shelf"
    //             }
    //         ]
    //     ]
    // }
    const url = `${payload.handleBar}/validate-record`;
    return this.http.post(url, payload.body);
  }
}
