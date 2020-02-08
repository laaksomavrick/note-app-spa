import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppAutofocusDirective } from "./app-autofocus/app-autofocus.directive";
import { AppAutoselectDirective } from "./app-autoselect/app-autofocus.directive";
import { ListItemCreateButtonComponent } from "./list-item-create-button/list-item-create-button.component";
import { LoadableErrorableComponent } from "./loadable-errorable-data/loadable-errorable.component";
import { LoadingMaskComponent } from "./loading-mask/loading-mask.component";
import { ModalComponent } from "./modal/modal.component";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
    declarations: [
        LoadableErrorableComponent,
        AppAutofocusDirective,
        AppAutoselectDirective,
        ListItemCreateButtonComponent,
        ModalComponent,
        SpinnerComponent,
        LoadingMaskComponent,
    ],
    imports: [CommonModule, FormsModule, HttpClientModule, NgbModule],
    providers: [],
    bootstrap: [LoadableErrorableComponent],
    exports: [
        LoadableErrorableComponent,
        AppAutofocusDirective,
        AppAutoselectDirective,
        ListItemCreateButtonComponent,
        ModalComponent,
        SpinnerComponent,
        LoadingMaskComponent,
    ],
})
export class SharedModule {}
