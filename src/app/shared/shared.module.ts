import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoadableErrorableComponent } from './loadable-errorable-data/loadable-errorable.component';

@NgModule({
    declarations: [LoadableErrorableComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule],
    providers: [],
    bootstrap: [LoadableErrorableComponent],
    exports: [LoadableErrorableComponent],
})
export class SharedModule {}
