import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiErrorResponse } from "../../../http/http.interfaces";
import { HttpService } from "../../../http/http.service";
import { SearchAllSuccessResponse, SearchProps } from "../../../store/search/search.interfaces";

@Injectable()
export class SearchService extends HttpService {
    constructor(private http: HttpClient) {
        super();
    }

    public search(props: SearchProps): Promise<SearchAllSuccessResponse | ApiErrorResponse> {
        return this.http
            .post<SearchAllSuccessResponse | ApiErrorResponse>(
                `${this.url}/search/all`,
                props,
                this.httpOptions,
            )
            .toPromise();
    }
}
