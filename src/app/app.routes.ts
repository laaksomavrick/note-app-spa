import { Routes } from '@angular/router';
import { AuthenticationGuard } from './app.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard],
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];
