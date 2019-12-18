import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { AppActions, appStore, AppStore } from './app.store';
import { AuthGuard } from './auth/auth.guard';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { NoteEditorComponent } from './pages/dashboard/notes/note-editor/note-editor.component';
import { LoginModule } from './pages/login/login.module';
import { SharedModule } from './shared/shared.module';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
    declarations: [AppComponent, NoteEditorComponent],
    imports: [
        LoginModule,
        DashboardModule,
        SharedModule,
        CommonModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
        EffectsModule.forRoot([AuthEffects]),
        BrowserAnimationsModule,
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent],
})
export class AppModule {}
