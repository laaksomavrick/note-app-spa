import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppActions, appStore, AppStore } from "../../app.store";
import { AuthGuard } from "../../auth/auth.guard";
import { AuthInterceptor } from "../../auth/auth.interceptor";
import { SharedModule } from "../../shared/shared.module";
import { DashboardEffects } from "../../store/dashboard/dashboard.effects";
import { FoldersEffects } from "../../store/folders/folders.effects";
import { NotesEffects } from "../../store/notes/notes.effects";
import { DashboardComponent } from "./dashboard.component";
import { CreateFolderComponent } from "./folders/create-folder/create-folder.component";
import { FolderListComponent } from "./folders/folder-list/folder-list.component";
import { FoldersService } from "./folders/folders.service";
import { NavigationComponent } from "./navigation/navigation.component";
import { CreateNoteComponent } from "./notes/create-note/create-note.component";
import { NoteListComponent } from "./notes/note-list/note-list.component";
import { NotesService } from "./notes/notes.service";
import { RouterService } from "./router.service";
import { ToolbarComponent } from "./toolbar/toolbar.component";

@NgModule({
    declarations: [
        DashboardComponent,
        FolderListComponent,
        NoteListComponent,
        NavigationComponent,
        CreateFolderComponent,
        CreateNoteComponent,
        ToolbarComponent,
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
