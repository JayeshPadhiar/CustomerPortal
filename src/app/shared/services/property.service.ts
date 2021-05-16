import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private http: HttpClient) {}
  getPropertyDetails(payload) {
    const apiurl = `platform/api/v1/property/${payload}`;
    return this.http.get(apiurl);
  }

  createProperty(payload) {
    const url = `platform/api/v1/property`;
    return this.http.post(url, payload);
  }

  editProperty(payload) {
    const url = `platform/api/v1/property`;
    return this.http.put(url, payload);
  }

  getPropertyList(payload) {
    const url = `platform/api/v1/property`;
    return this.http.get(url, { params: payload });
  }

  filterPropety(payload) {
    const url = `platform/api/v1/property/search`;
    return this.http.get(url, { params: payload });
  }
}
