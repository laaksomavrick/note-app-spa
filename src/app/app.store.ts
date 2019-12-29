import { ActionReducerMap } from "@ngrx/store";
import { AuthActions } from "./store/auth/auth.actions";
import { authReducer, AuthState } from "./store/auth/auth.reducer";
import { DashboardActions } from "./store/dashboard/dashboard.actions";
import { dashboardReducer, DashboardState } from "./store/dashboard/dashboard.reducer";
import { FolderActions } from "./store/folders/folders.actions";
import { folderReducer, FoldersState } from "./store/folders/folders.reducer";
import { NoteActions } from "./store/notes/notes.actions";
import { noteReducer, NotesState } from "./store/notes/notes.reducer";

export interface AppStore {
    authState: AuthState;
    foldersState: FoldersState;
    notesState: NotesState;
    dashboardState: DashboardState;
}

export type AppActions = AuthActions & FolderActions & NoteActions & DashboardActions;

export const appStore: ActionReducerMap<
    {
        authState: ReturnType<typeof authReducer>;
        foldersState: ReturnType<typeof folderReducer>;
        notesState: ReturnType<typeof noteReducer>;
        dashboardState: ReturnType<typeof dashboardReducer>;
    },
    AppActions
> = {
    authState: authReducer,
    foldersState: folderReducer,
    notesState: noteReducer,
    dashboardState: dashboardReducer,
};
