import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AuthenticationGuard } from './app.guard';

@NgModule({
    declarations: [AppComponent, LoginPageComponent, DashboardPageComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
    providers: [AuthenticationGuard],
    bootstrap: [AppComponent],
})
export class AppModule {
}
