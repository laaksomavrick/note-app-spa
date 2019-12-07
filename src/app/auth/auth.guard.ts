import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().pipe(
            tap(async (authenticated: boolean): Promise<void> => {
                if (!authenticated) {
                    await this.router.navigate(['/login']);
                }
            }),
        );
    }
}
