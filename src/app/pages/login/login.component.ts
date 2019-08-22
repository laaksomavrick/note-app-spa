import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { LoginResponse } from './loginResponse';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public emailFormInput = '';

    public passwordFormInput = '';

    constructor(private loginService: LoginService) {
    }

    public ngOnInit() {
    }

    public submitForm(): void {
        // TODO: validation
        // TODO: error handling
        // TODO: view model layer to abstract the above

        console.log(this.emailFormInput);
        console.log(this.passwordFormInput);

        const email = this.emailFormInput;
        const password = this.passwordFormInput;

        this.loginService.loginUser(email, password)
            .subscribe((response: LoginResponse) => {
                console.log(response);
            });
    }

}
