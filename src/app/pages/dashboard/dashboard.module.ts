import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { HIGHLIGHT_OPTIONS, HighlightModule } from "ngx-highlightjs";
import { QuillModule } from "ngx-quill";
import { AppActions, appStore, AppStore } from "../../app.store";
import { AuthGuard } from "../../auth/auth.guard";
import { AuthInterceptor } from "../../auth/auth.interceptor";
import { SharedModule } from "../../shared/shared.module";
import { DashboardEffects } from "../../store/dashboard/dashboard.effects";
import { FoldersEffects } from "../../store/folders/folders.effects";
import { NotesEffects } from "../../store/notes/notes.effects";
import { DashboardComponent } from "./dashboard.component";
import { CreateFolderModalComponent } from "./folders/create-folder-modal/create-folder-modal.component";
import { FolderListComponent } from "./folders/folder-list/folder-list.component";
import { FoldersService } from "./folders/folders.service";
import { NavigationComponent } from "./navigation/navigation.component";
import { CreateNoteModalComponent } from "./notes/create-note-modal/create-note-modal.component";
import { NoteEditorComponent } from "./notes/note-editor/note-editor.component";
import { NoteListItemComponent } from "./notes/note-list-item/note-list-item.component";
import { NoteListComponent } from "./notes/note-list/note-list.component";
import { NotesService } from "./notes/notes.service";
import { RouterService } from "./router.service";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
    entryComponents: [CreateFolderModalComponent, CreateNoteModalComponent],
    declarations: [
        DashboardComponent,
        FolderListComponent,
        NoteListComponent,
        NavigationComponent,
        ToolbarComponent,
        CreateFolderModalComponent,
        CreateNoteModalComponent,
        NoteEditorComponent,
        NoteListItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
        EffectsModule.forFeature([FoldersEffects, NotesEffects, DashboardEffects]),
        SharedModule,
        RouterModule,
        NgbModule,
        ReactiveFormsModule,
        HighlightModule,
        QuillModule.forRoot({}),
    ],
    providers: [
        AuthGuard,
        FoldersService,
        NotesService,
        RouterService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [DashboardComponent],
    exports: [NoteListComponent],
})
export class DashboardModule {}
