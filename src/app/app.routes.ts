import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthenticationGuard } from './app.guard';

export const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthenticationGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard',
    },
];
