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
  token: String = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJVVXdSREZCUVRSRFFqQkdORFUxTVVZeE16ZEdPRFJHTnpORk5EaEJSVEU0TVVORk5qVTJOdyJ9.eyJodHRwczovL2FwcERhdGEiOnt9LCJodHRwczovL3VzZXJEZXRhaWxzIjp7ImlkIjoxMDQ1LCJ1c2VyVHlwZSI6ImRlZmF1bHQiLCJlbWFpbCI6ImpheWVzaHBhZGhpYXIyMEBnbWFpbC5jb20ifSwiaHR0cHM6Ly9hY2NvdW50cyI6WyJtb250ZWNhcmxvIl0sImh0dHBzOi8vd2FyZWhvdXNlcyI6W10sImh0dHBzOi8vd2FyZWhvdXNlV29ya3NwYWNlcyI6W10sImh0dHBzOi8vcGFydG5lcnMiOltdLCJpc3MiOiJodHRwczovL2VzaG9wYm94LXBheW1lbnQtcmVjby5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NjAxMjZmYzYyYzY3MzAzOGE4ZWQ3ZDRkIiwiYXVkIjpbImh0dHBzOi8vZXNob3Bib3gtcG9ydGFsLWRldi5hcHBzcG90LmNvbSIsImh0dHBzOi8vZXNob3Bib3gtcGF5bWVudC1yZWNvLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MTI1MTIxMDEsImV4cCI6MTYxMjU5ODUwMSwiYXpwIjoiVFNIMlRYeDdXdmZ4NmhwcElGZnpsNWNiMU1HcXY5VnAiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.jEUuepEGbnhzA648phPtNyWKAMvbx8waIrsJGcP-12DP2R3OXY3IHa7MeUBDhQSkqZMzBfsCrl4fKcCttyvcrxXHHjnMsHi8dWQYavs5Zhml6Wx7vZsdTlaZhC7djb1ySB2JEyfQ0Y5TBSXh2NflDU05MojL4eEMXJrKAS51kOjm8h4hFNn6h4E3z7Q8NreeWWTUCCxEYNv8BX6_fnnuCW_tvjcswMJs-IrRljXbzMiWNcqNaixrbcm7w2RgmvB4XLORXIre5cZRsH6iRnWIEeCWi4P3AGnag07YyyluVLIKBThVJD5asO3nqVGo06LnN1Fp_Gaf0WB50xBe-Umymw'
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
