import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appRoutes } from '../../app.routes';
import { AppActions, appStore, AppStore } from '../../app.store';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthInterceptor } from '../../auth/auth.interceptor';
import { FoldersEffects } from '../../store/folders/folders.effects';
import { DashboardComponent } from './dashboard.component';
import { FoldersService } from './folders/folders.service';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        NgbModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
        EffectsModule.forFeature([FoldersEffects]),
    ],
    providers: [AuthGuard, FoldersService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
    bootstrap: [DashboardComponent],
})
export class DashboardModule {}