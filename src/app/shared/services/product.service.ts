import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Product } from '../models/product.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private accountslug: string;
  // private facetsStatus = new BehaviorSubject<any>({});
  private totalHits = new BehaviorSubject<any>(0);
  _totalHits = this.totalHits.asObservable();
  // _facetsStatus = this.facetsStatus.asObservable();
  private al: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.accountslug = this.authService.getAccountSlug();
  }

  getProductList(params: any) {
    const qpms = { ...params };
    const url = `${params.sortBy}`;
    delete qpms.sortBy;
    // console.log('INSIDE SERVICE', qpms);
    // console.log('INSIDE SERVICE URL', url);
    return this.http.get(url, { params: qpms });
  }

  updateTotalHits(data) {
    this.totalHits.next(data);
  }

  getInventoryDetails(payload) {
    const url = 'v1/inventoryListing';
    return this.http.post(url, payload);
  }
  getWarehouseList(payload) {
    const url = 'v1/warehouse';
    return this.http.get(url, { params: payload }).pipe(
      map(res => {
        if (res) {
          const data = res['data'].filter(x => x.enrollmentStatus.toLowerCase() == 'enrolled');
          return { ...res, data };
        }
      })
    );
  }

  channelList(payload) {
    const url = 'v1/channel';
    return this.http.get(url, { params: payload });
  }

  productAvailability(payload) {
    const url = 'product-engine/api/v1/productListing';
    return this.http.post(url, payload);
  }

  createProduct(product: Product) {
    const apiUrl = 'product-engine/api/v1/products';
    return this.http.post(apiUrl, product);
  }

  createBulkProduct(payload) {
    const apiUrl = 'platform/api/v1/import-job';
    return this.http.post(apiUrl, payload);
  }

  editProduct(product: Product) {
    const apiUrl = `product-engine/api/v1/products/${product.sku}`;
    return this.http.put(apiUrl, product);
  }

  checkSKUExistOrNot(sku) {
    const al = `${env.algolia.product_index}?filters=(accountSlug:${this.accountslug})AND(sku:'${sku}')`;
    return this.http.get(al).pipe(
      map(res => {
        return res['hits'];
      })
    );
  }

  createExportJob(exportJobPayload) {
    return this.http.post('platform/api/v1/export-job', exportJobPayload);
  }

  getPropertyList(payload) {
    const url = 'platform/api/v1/property';
    return this.http.get(url, { params: payload }).pipe(
      map(x => {
        let final = x['data'].filter(y => {
          if (y['scope']) {
            if (y['scope'].includes('product') || y['scope'].includes('Product')) {
              return y;
            }
          }
        });
        return { ...x, data: final };
      })
    );
  }

  getBulkUploadDocumentStatus(payload) {
    const url = `platform/api/v1/import-job/${payload}`;
    return this.http.get(url);
  }

  getBrandAndVertical(params) {
    const url = 'v1/brand';
    return this.http.get(url, { params });
  }

  getFilters() {
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
    this.getDropdownValues(facets).subscribe(res => {
      if (res) {
        for (let key in res) {
          filter['items'].map(x => {
            if (x['key'].toLowerCase() === key.toLowerCase()) {
              x['value'] = res[key];
            }
            return x;
          });
        }
      }
    });
  }

  getDropdownValues(facets) {
    const url = `product_service?filters=(accountSlug:${this.accountslug})&hitsPerPage=0&facets=${facets}`;
    return this.http.get(url).pipe(
      map(res => {
        localStorage.setItem('totalProducts', res['nbHits']);
        return res['facets'];
      })
    );
  }
  mergeProduct(body) {
    const url = 'product-engine/api/v1/mergeProducts';
    return this.http.post(url, body);
  }

  getColumns() {
    const url = `product-engine/api/v1/getColumns`;
    return this.http.get(url).pipe(
      tap(res => {
        console.log('res', res);
      })
    );
  }
}
