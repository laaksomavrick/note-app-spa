import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Store } from "@ngrx/store";
import { debounceTime, take } from "rxjs/operators";
import { AppStore } from "../../../../app.store";
import { searchAllAttempt } from "../../../../store/search/search.actions";
import { SearchProps } from "../../../../store/search/search.interfaces";

interface SearchForm {
    search: string;
}

@Component({
    selector: "app-search-input",
    templateUrl: "./search-input.component.html",
    styleUrls: ["./search-input.component.css"],
})
export class SearchInputComponent implements OnInit {
    private readonly SEARCH_DEBOUNCE = 250;

    public form = new FormGroup({
        search: new FormControl(""),
    });

    constructor(private readonly store: Store<AppStore>) {}

    public ngOnInit(): void {
        this.form.valueChanges
            .pipe(debounceTime(this.SEARCH_DEBOUNCE))
            .subscribe(async (form: SearchForm) => {
                const { search } = form;

                if (search) {
                    const props: SearchProps = {
                        search: {
                            query: search,
                        },
                    };

                    console.log(props);
                    this.store.dispatch(searchAllAttempt(props));
                }
            });
    }
}
