import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appRoutes } from '../../app.routes';
import { AppActions, appStore, AppStore } from '../../app.store';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthInterceptor } from '../../auth/auth.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { FoldersEffects } from '../../store/folders/folders.effects';
import { NotesEffects } from '../../store/notes/notes.effects';
import { DashboardComponent } from './dashboard.component';
import { FolderListComponent } from './folders/folder-list/folder-list.component';
import { FoldersService } from './folders/folders.service';
import { NotesService } from './notes/notes.service';

@NgModule({
    declarations: [DashboardComponent, FolderListComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
        EffectsModule.forFeature([FoldersEffects, NotesEffects]),
        SharedModule,
        MatListModule,
        MatToolbarModule,
    ],
    providers: [
        AuthGuard,
        FoldersService,
        NotesService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [DashboardComponent],
})
export class DashboardModule {}
