import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthenticationGuard } from './app.guard';
import { appRoutes } from './app.routes';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    declarations: [AppComponent, LoginComponent, DashboardComponent],
    imports: [BrowserModule, RouterModule.forRoot(appRoutes), NgbModule, FormsModule, HttpClientModule],
    providers: [AuthenticationGuard],
    bootstrap: [AppComponent],
})
export class AppModule {
}
