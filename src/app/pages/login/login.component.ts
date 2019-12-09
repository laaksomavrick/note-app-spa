import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStore } from '../../app.store';
import { authAttempt, authDismissError } from '../../store/auth/auth.actions';

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

    public ngOnInit(): void {}

    public submitForm(): void {
        const email = this.emailFormInput;
        const password = this.passwordFormInput;

        this.store.dispatch(authAttempt({ email, password }));
    }

    public closeError(): void {
        this.store.dispatch(authDismissError());
    }
}
