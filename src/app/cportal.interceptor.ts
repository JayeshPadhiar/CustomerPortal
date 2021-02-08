import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CPortalInterceptor implements HttpInterceptor {
  token: String = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJVVXdSREZCUVRSRFFqQkdORFUxTVVZeE16ZEdPRFJHTnpORk5EaEJSVEU0TVVORk5qVTJOdyJ9.eyJodHRwczovL2FwcERhdGEiOnt9LCJodHRwczovL3VzZXJEZXRhaWxzIjp7ImlkIjoxMDQ1LCJ1c2VyVHlwZSI6ImRlZmF1bHQiLCJlbWFpbCI6ImpheWVzaHBhZGhpYXIyMEBnbWFpbC5jb20ifSwiaHR0cHM6Ly9hY2NvdW50cyI6WyJtb250ZWNhcmxvIl0sImh0dHBzOi8vd2FyZWhvdXNlcyI6W10sImh0dHBzOi8vd2FyZWhvdXNlV29ya3NwYWNlcyI6W10sImh0dHBzOi8vcGFydG5lcnMiOltdLCJpc3MiOiJodHRwczovL2VzaG9wYm94LXBheW1lbnQtcmVjby5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NjAxMjZmYzYyYzY3MzAzOGE4ZWQ3ZDRkIiwiYXVkIjpbImh0dHBzOi8vZXNob3Bib3gtcG9ydGFsLWRldi5hcHBzcG90LmNvbSIsImh0dHBzOi8vZXNob3Bib3gtcGF5bWVudC1yZWNvLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MTI3NzIzMzUsImV4cCI6MTYxMjg1ODczNSwiYXpwIjoiVFNIMlRYeDdXdmZ4NmhwcElGZnpsNWNiMU1HcXY5VnAiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.r7wWHW3bHNmjK_G7a7J8WTlRhxZJi9CPIWO7ILLE0Sa2CUUcxswomVYsTIWEMjyAcFYi_8l3s3jasdRKYMtZNZi1PcS7IAKRXjE8wr7Fo8p0Xkv-4SdVVsS50eih0M8C0j_DE691raFJj4V045R9JjE3Z4sL9RTyTLQ6_eZRuekyu3LnYYJ5Mv7Gh73FhvTZmykDWe7zYTjUJEIXDMd_TNCVzfNHkFDkAs-rds_7WxoEecSEvsXjMwXhH8m88rw91m9oL1BeT7WW0qpiQN1mmpoY3pDpFMfi4RIOWYWKNpZhoUi5WJATbpyeVIfzD36O2WcIZVNlVMnBXYtz_4lbpQ'
  
  
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    });
    return next.handle(request);
  }
}
