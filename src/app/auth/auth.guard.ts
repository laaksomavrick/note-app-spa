import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { forkJoin, Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AppStore } from "../app.store";
import { authSuccess } from "../store/auth/auth.actions";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    public token$: Observable<string | undefined> = this.store
        .select(({ authState }: AppStore) => authState.token)
        .pipe(take(1));

    constructor(
        private router: Router,
        private authService: AuthService,
        private store: Store<AppStore>,
    ) {}

    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        const observables: Array<Observable<boolean> | Observable<string | undefined>> = [
            this.authService.isAuthenticated(),
            this.token$,
        ];

        return forkJoin(observables).pipe(
            tap(async (results: Array<boolean | string | undefined>) => {
                const [authenticated, token] = results;
                if (!authenticated) {
                    // If no token, don't allow into the app
                    await this.router.navigate(["/login"]);
                } else if (authenticated && !token) {
                    // If token exists but is not in store, put it in the store
                    const validToken = this.authService.getToken();
                    if (validToken) {
                        this.store.dispatch(
                            authSuccess({ status: 200, resource: { token: validToken } }),
                        );
                    }
                }
            }),
            map((results: Array<boolean | string | undefined>) => {
                const [authenticated] = results;
                return authenticated as boolean;
            }),
        );
    }
}
