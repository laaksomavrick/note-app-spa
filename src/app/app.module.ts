import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AuthEffects } from './auth/auth.effects';
import { AuthGuard } from './auth/auth.guard';
import { authReducer, AuthState } from './auth/auth.reducer';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

export interface AppStore {
    authState: AuthState;
}

@NgModule({
    declarations: [AppComponent, LoginComponent, DashboardComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore>({ authState: authReducer }),
        EffectsModule.forRoot([AuthEffects]),
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
