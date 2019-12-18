import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorResponse } from '../../../http/http.interfaces';
import { HttpService } from '../../../http/http.service';
import { GetFoldersSuccessResponse } from '../../../store/folders/folders.interfaces';

@Injectable()
export class FoldersService extends HttpService {
    constructor(private http: HttpClient) {
        super();
    }

    public getFolders(): Promise<GetFoldersSuccessResponse | ApiErrorResponse> {
        return this.http
            .get<GetFoldersSuccessResponse | ApiErrorResponse>(
                `${this.url}/folders`,
                this.httpOptions,
            )
            .toPromise();
    }
}
