import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { appRoutes } from '../../app.routes';
import { AppActions, appStore, AppStore } from '../../app.store';
import { AuthGuard } from '../../auth/auth.guard';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
    ],
    providers: [AuthGuard],
    bootstrap: [LoginComponent],
})
export class LoginModule {}
