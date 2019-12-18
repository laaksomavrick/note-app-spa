import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoteEditorComponent } from './pages/dashboard/notes/note-editor/note-editor.component';
import { NoteRoutingComponent } from './pages/dashboard/notes/note-routing/note-routing.component';
import { LoginComponent } from './pages/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        // tslint:disable-next-line:no-any
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            // {
            //     path: '', redirectTo: 'folder/:folderId', pathMatch: 'full'
            // },
            {
                path: 'folder/:folderId',
                component: NoteRoutingComponent,
                children: [
                    {
                        path: 'note/:noteId',
                        component: NoteEditorComponent,
                    },
                ],
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];
