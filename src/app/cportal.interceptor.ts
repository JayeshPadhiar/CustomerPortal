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
  token: String = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJVVXdSREZCUVRSRFFqQkdORFUxTVVZeE16ZEdPRFJHTnpORk5EaEJSVEU0TVVORk5qVTJOdyJ9.eyJodHRwczovL2FwcERhdGEiOnt9LCJodHRwczovL3VzZXJEZXRhaWxzIjp7ImlkIjoxMDQ1LCJ1c2VyVHlwZSI6ImRlZmF1bHQiLCJlbWFpbCI6ImpheWVzaHBhZGhpYXIyMEBnbWFpbC5jb20ifSwiaHR0cHM6Ly9hY2NvdW50cyI6WyJtb250ZWNhcmxvIl0sImh0dHBzOi8vd2FyZWhvdXNlcyI6W10sImh0dHBzOi8vd2FyZWhvdXNlV29ya3NwYWNlcyI6W10sImh0dHBzOi8vcGFydG5lcnMiOltdLCJpc3MiOiJodHRwczovL2VzaG9wYm94LXBheW1lbnQtcmVjby5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NjAxMjZmYzYyYzY3MzAzOGE4ZWQ3ZDRkIiwiYXVkIjpbImh0dHBzOi8vZXNob3Bib3gtcG9ydGFsLWRldi5hcHBzcG90LmNvbSIsImh0dHBzOi8vZXNob3Bib3gtcGF5bWVudC1yZWNvLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MTI4NTg5ODQsImV4cCI6MTYxMjk0NTM4NCwiYXpwIjoiVFNIMlRYeDdXdmZ4NmhwcElGZnpsNWNiMU1HcXY5VnAiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.MbSbAa__XOMXswm_6VtU2Df8r8bqx6E3zecXdo1MrIPu4kK6Ej9cSBvdBoqX-US993OLv4i7OHMzN-cLQuGA7fYW9R7VdM7NP5T3vfJoTST8_uhEsd7BRAdOiMPj3jukjXjrrvhzPRg8SVDFvCTRNN0NGKppg47dOjgBEpkLQqBGZIzqLoYJw-E--z6tJNJ984SZ6Nn12ogB9HT_UaX7Msj9S2QlqoDIqJfaMEPAjxYUUfW4vAyUCuHgDJGTS7ShVbq-SJbipCPe0ajHZUvH28o54xJynJFE-MuwkjDJz5uOIs-l3x-25HykX6io7XXIb6YaRJUnZ0dFbM0LUl9Taw'

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
