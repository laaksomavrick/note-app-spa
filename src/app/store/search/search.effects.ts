import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap } from "rxjs/operators";
import { isApiErrorResponse } from "../../http/http.helpers";
import { SearchService } from "../../pages/dashboard/toolbar/search.service";
import { searchAllAttempt, searchAllFailure, searchAllSuccess } from "./search.actions";
import { SearchProps } from "./search.interfaces";

@Injectable()
export class SearchEffects {
    public searchAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(searchAllAttempt),
            exhaustMap(async (props: SearchProps) => {
                try {
                    const response = await this.searchService.search(props);

                    if (isApiErrorResponse(response)) {
                        return searchAllFailure(response);
                    }

                    return searchAllSuccess(response);
                } catch (e) {
                    return searchAllFailure(e);
                }
            }),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly searchService: SearchService,
    ) {}
}
