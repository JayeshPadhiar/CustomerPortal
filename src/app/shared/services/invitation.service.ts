import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Configuration } from '../../constants/config';


@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  constructor(
    private api: ApiService,
    private API_URL: Configuration,

  ) { }


  doesEmailExists(email) {
    return this.api.get(`${this.API_URL.CONFIG_URL.EMAIL_EXISTS}${email}`);
  }
}
