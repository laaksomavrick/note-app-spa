import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppStore } from "../../app.store";
import { appBootAttempt } from "../../store/dashboard/dashboard.actions";
import { RouterService } from "./router.service";

@Component({
    selector: "app-dashboard-page",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    public loading$: Observable<boolean> = this.store.select(
        ({ dashboardState }: AppStore) => dashboardState.loading,
    );

    constructor(private store: Store<AppStore>, private readonly routerService: RouterService) {}

    public ngOnInit(): void {
        const maybeFolderId = this.routerService.getFolderIdFromRoute();
        const maybeNoteId = this.routerService.getNoteIdFromRoute();
        this.store.dispatch(appBootAttempt({ folderId: maybeFolderId, noteId: maybeNoteId }));
    }
}
