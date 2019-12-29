import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(public authService: AuthService) {}

    public intercept(
        // tslint:disable-next-line:no-any
        request: HttpRequest<any>,
        next: HttpHandler,
        // tslint:disable-next-line:no-any
    ): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else {
            console.warn("No token found in localStorage");
        }
        return next.handle(request);
    }
}
