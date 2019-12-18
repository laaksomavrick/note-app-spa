import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppActions, appStore, AppStore } from '../../app.store';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthInterceptor } from '../../auth/auth.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { FoldersEffects } from '../../store/folders/folders.effects';
import { NotesEffects } from '../../store/notes/notes.effects';
import { DashboardComponent } from './dashboard.component';
import { FolderListComponent } from './folders/folder-list/folder-list.component';
import { FoldersService } from './folders/folders.service';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NoteRoutingComponent } from './notes/note-routing/note-routing.component';
import { NotesService } from './notes/notes.service';

@NgModule({
    declarations: [
        DashboardComponent,
        FolderListComponent,
        NoteListComponent,
        NoteRoutingComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
        EffectsModule.forFeature([FoldersEffects, NotesEffects]),
        SharedModule,
        MatListModule,
        MatToolbarModule,
        RouterModule,
    ],
    providers: [
        AuthGuard,
        FoldersService,
        NotesService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [DashboardComponent],
    exports: [NoteListComponent],
})
export class DashboardModule {}
