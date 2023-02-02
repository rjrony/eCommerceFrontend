import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    private router: Router;
    constructor(router: Router) {
        this.router = router;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNDYxNzU5MC0xY2I5LTRjZmUtYWJmZi1jNjE1ZDYxNDA3OTEiLCJFbWFpbCI6ImFkbWluQHlvdXJzdG9yZS5jb20iLCJUb2tlbiI6ImUwNjQwMGZmLTRmOWQtNGMzYy04MjkzLTA2NTM5Y2ZhOTc0OSIsImV4cCI6MTY1MDkxODUyMX0.NyePtjtg0F46tRsiUEzol7-AM4ZT2UwQcMZAU8IFybI';
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const authReq = req.clone({ headers });
        return next.handle(authReq).pipe(tap(_ => {
        }, error => {
            const respError = error as HttpErrorResponse;
            if (respError && (respError.status === 401 || respError.status === 403)) {
                this.router.navigate(['/unauthorized']);
            }
        }));
    }
}
