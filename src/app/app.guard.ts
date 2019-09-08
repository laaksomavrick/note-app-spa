import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

// TODO: temporary function, should be derived from authService whenever that exists
function isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const predicate = token != null;
    return of(predicate);
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        return isAuthenticated().pipe(
            tap((authenticated: boolean): void => {
                if (!authenticated) {
                    this.router.navigate(['/login']);
                }
            }),
        );
    }
}
