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
  token: String =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJVVXdSREZCUVRSRFFqQkdORFUxTVVZeE16ZEdPRFJHTnpORk5EaEJSVEU0TVVORk5qVTJOdyJ9.eyJodHRwczovL2FwcERhdGEiOnt9LCJodHRwczovL3VzZXJEZXRhaWxzIjp7ImlkIjoxMDQ1LCJ1c2VyVHlwZSI6ImRlZmF1bHQiLCJlbWFpbCI6ImpheWVzaHBhZGhpYXIyMEBnbWFpbC5jb20ifSwiaHR0cHM6Ly9hY2NvdW50cyI6WyJtb250ZWNhcmxvIl0sImh0dHBzOi8vd2FyZWhvdXNlcyI6W10sImh0dHBzOi8vd2FyZWhvdXNlV29ya3NwYWNlcyI6W10sImh0dHBzOi8vcGFydG5lcnMiOltdLCJpc3MiOiJodHRwczovL2VzaG9wYm94LXBheW1lbnQtcmVjby5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NjAxMjZmYzYyYzY3MzAzOGE4ZWQ3ZDRkIiwiYXVkIjpbImh0dHBzOi8vZXNob3Bib3gtcG9ydGFsLWRldi5hcHBzcG90LmNvbSIsImh0dHBzOi8vZXNob3Bib3gtcGF5bWVudC1yZWNvLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MTIxMTU0MzksImV4cCI6MTYxMjIwMTgzOSwiYXpwIjoiVFNIMlRYeDdXdmZ4NmhwcElGZnpsNWNiMU1HcXY5VnAiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.GhX9CNNdu32GqE80zMYeWoQDvpqadXbb0MK3u7hIgJdF7jDJP8V6Kela_uk10F1DE738H7r5u19c707ZhTLKQYSVJHK_8jlLRvHTXNM5dyuEgirpIIDfuvNNTFh31IId1gDyLLviEmAcGGLZxdWopLvE8zsRJ1q4NHFhcuoVI-HkTgA9HFhRFUwrL6Wqyv_DVy3gshiwjSaspI5bOOzEwyWJ1mLa08pU5B2I-AGXtPhPOJfdGDDMcbfRXqfBLQsqsd_HWUX5MFxHDXhmBpmshr5vXblzatEMuXhhTvKI2MOHS2PbLtPC0y1_o5XzzsD6OxwQXPq4vORLqRaonQMpiA';

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
