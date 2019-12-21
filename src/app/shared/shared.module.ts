import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadableErrorableComponent } from './loadable-errorable-data/loadable-errorable.component';

@NgModule({
    declarations: [LoadableErrorableComponent],
    imports: [CommonModule, FormsModule, HttpClientModule, NgbModule],
    providers: [],
    bootstrap: [LoadableErrorableComponent],
    exports: [LoadableErrorableComponent],
})
export class SharedModule {}
