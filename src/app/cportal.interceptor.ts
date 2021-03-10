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
  token: String = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJVVXdSREZCUVRSRFFqQkdORFUxTVVZeE16ZEdPRFJHTnpORk5EaEJSVEU0TVVORk5qVTJOdyJ9.eyJodHRwczovL2FwcERhdGEiOnt9LCJodHRwczovL3VzZXJEZXRhaWxzIjp7ImlkIjoxMDQ1LCJ1c2VyVHlwZSI6ImRlZmF1bHQiLCJlbWFpbCI6ImpheWVzaHBhZGhpYXIyMEBnbWFpbC5jb20ifSwiaHR0cHM6Ly9hY2NvdW50cyI6WyJtb250ZWNhcmxvIl0sImh0dHBzOi8vd2FyZWhvdXNlcyI6W10sImh0dHBzOi8vd2FyZWhvdXNlV29ya3NwYWNlcyI6W10sImh0dHBzOi8vcGFydG5lcnMiOltdLCJpc3MiOiJodHRwczovL2VzaG9wYm94LXBheW1lbnQtcmVjby5hdXRoMC5jb20vIiwic3ViIjoiZW1haWx8NjAxMjZmYzYyYzY3MzAzOGE4ZWQ3ZDRkIiwiYXVkIjpbImh0dHBzOi8vZXNob3Bib3gtcG9ydGFsLWRldi5hcHBzcG90LmNvbSIsImh0dHBzOi8vZXNob3Bib3gtcGF5bWVudC1yZWNvLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2MTMwNTc3NzEsImV4cCI6MTYxMzE0NDE3MSwiYXpwIjoiVFNIMlRYeDdXdmZ4NmhwcElGZnpsNWNiMU1HcXY5VnAiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.VB3L8D-5PGs36JX-u_gxEe-W6Ip37WpaUQLEa8IpkklfGxBUAw-c_9fi9W16bK_VxIGKVlm4UaJ46pdoNvCdDbweZMzJmOwQ50Y0Rv-LtwL0DZ4P-XCg8U1xMzFg-8bYGtbulH404MA8JN0SR2WJ3HYmZhhqrc_s8xyXQqgukLZGy6Nb6rfnt4QZfH6iNlIJG1ttl_PTSRsQtUY7owLQPKChlXpa9UOEWhz6mFyxXnihYtaDv3h-J0kgYoTpARXXMKZiIrL811JYhC88kXTtowGInJa1GmyFVSzGfOZ3WwBNLI_bGi1suGTlW7HSS36PMoZmCeOleeKWw9FHp1DuAA'

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
