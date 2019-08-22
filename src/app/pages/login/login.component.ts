import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
    public usernameFormInput = '';

    public passwordFormInput = '';

    constructor() {
    }

    public ngOnInit() {
    }

    public submitForm(): void {
        console.log(this.usernameFormInput);
        console.log(this.passwordFormInput);
    }

}
