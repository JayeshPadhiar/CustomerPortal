/**
 *  Define service to process get a quote form request
 */
import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { LOCAL_STORAGE_SECRETE } from '../constants/return.constant';

@Injectable()
export class LocalStorageService {
  private static storage: any = sessionStorage;
  /**
   * Set value in local storage
   * @method set
   */
  static set(key: string, value: any, prefix: boolean = true): any {
    value = LocalStorageService.bsEncrypt(value);
    // key = LocalStorageService.addPrefix(key, prefix);
    LocalStorageService.storage.setItem(key, value);
  }

  /**
   * Get value form local storage
   * @method get
   */
  static get(key: string, prefix: boolean = true): any {
    // key = LocalStorageService.addPrefix(key, prefix);
    let data = LocalStorageService.storage.getItem(key);
    data = LocalStorageService.bsDecrypt(data);
    if (data != null && data !== '{}') {
      try {
        return JSON.parse(data);
      } catch (error) {}
    }
    return null;
  }

  /**
   * clear local storage
   * @method flush
   */
  static flush(key?: string, prefix: boolean = true) {
    // key = LocalStorageService.addPrefix(key, prefix);
    if (key != null && key !== undefined) {
      LocalStorageService.storage.removeItem(key);
    } else {
      LocalStorageService.storage.clear();
    }
  }

  /**
   * use to encrypt data
   * @method bsEncrypt
   */
  static bsEncrypt(data: string) {
    const newString: any = JSON.stringify(data);
    return AES.encrypt(newString, LOCAL_STORAGE_SECRETE).toString();
  }

  /**
   * use to decrypt data
   * @method bsDecrypt
   */
  static bsDecrypt(data: string) {
    if (!data) {
      return data;
    }
    const newString: any = AES.decrypt(data, LOCAL_STORAGE_SECRETE);
    return newString.toString(enc.Utf8);
  }
}
