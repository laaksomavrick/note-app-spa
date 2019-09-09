import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../app.module';
import { authAttempt } from '../../auth/auth.actions';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public loading$: Observable<boolean> = this.store.select(
        ({ authState }: AppStore) => authState.loading,
    );

    public error$: Observable<string | undefined> = this.store.select(
        ({ authState }: AppStore) => authState.error,
    );

    public emailFormInput = '';
    public passwordFormInput = '';

    constructor(private store: Store<AppStore>) {}

    public ngOnInit() {
        this.loading$.subscribe((loading: boolean) => {
            console.log(`loading ${loading}`);
        });

        this.error$.subscribe(error => {
            console.log(`error ${error}`);
        });
    }

    public submitForm(): void {
        // TODO: validation
        // TODO: auth guard should dispatch action if token in localStorage
        //       so that in memory store 1 - 1 with real state

        // TODO test component, reducer, effect

        const email = this.emailFormInput;
        const password = this.passwordFormInput;

        this.store.dispatch(authAttempt({ email, password }));
    }

    public closeError(): void {
        // TODO dispatch event to toggle error state
    }
}
