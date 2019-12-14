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
import { AppActions, appStore, AppStore } from './app.store';
import { AuthGuard } from './auth/auth.guard';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { LoginModule } from './pages/login/login.module';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
    declarations: [AppComponent],
    imports: [
        LoginModule,
        DashboardModule,
        SharedModule,
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
        EffectsModule.forRoot([AuthEffects]),
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
