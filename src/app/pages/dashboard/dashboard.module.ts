import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MarkdownModule } from "ngx-markdown";

import { AppActions, appStore, AppStore } from "../../app.store";
import { AuthGuard } from "../../auth/auth.guard";
import { AuthInterceptor } from "../../auth/auth.interceptor";
import { SharedModule } from "../../shared/shared.module";
import { DashboardEffects } from "../../store/dashboard/dashboard.effects";
import { FoldersEffects } from "../../store/folders/folders.effects";
import { NotesEffects } from "../../store/notes/notes.effects";
import { SearchEffects } from "../../store/search/search.effects";
import { DashboardComponent } from "./dashboard.component";
import { CreateFolderModalComponent } from "./folders/create-folder-modal/create-folder-modal.component";
import { FolderListComponent } from "./folders/folder-list/folder-list.component";
import { FoldersService } from "./folders/folders.service";
import { NavigationComponent } from "./navigation/navigation.component";
import { CreateNoteModalComponent } from "./notes/create-note-modal/create-note-modal.component";
import { DeleteNoteModalComponent } from "./notes/delete-note-modal/delete-note-modal.component";
import { NoteEditorComponent } from "./notes/note-editor/note-editor.component";
import { NoteListItemComponent } from "./notes/note-list-item/note-list-item.component";
import { NoteListComponent } from "./notes/note-list/note-list.component";
import { NoteSortToggleComponent } from "./notes/note-sort-toggle/note-sort-toggle.component";
import { NotesService } from "./notes/notes.service";
import { RouterService } from "./router.service";
import { SearchInputComponent } from "./toolbar/search-input/search-input.component";
import { SearchService } from "./toolbar/search.service";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
    entryComponents: [
        CreateFolderModalComponent,
        CreateNoteModalComponent,
        DeleteNoteModalComponent,
    ],
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
        NoteSortToggleComponent,
        DeleteNoteModalComponent,
        SearchInputComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        StoreModule.forRoot<AppStore, AppActions>(appStore),
        EffectsModule.forFeature([FoldersEffects, NotesEffects, DashboardEffects, SearchEffects]),
        SharedModule,
        RouterModule,
        NgbModule,
        ReactiveFormsModule,
        MarkdownModule.forChild(),
    ],
    providers: [
        AuthGuard,
        FoldersService,
        NotesService,
        RouterService,
        SearchService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [DashboardComponent],
    exports: [NoteListComponent],
})
export class DashboardModule {}
