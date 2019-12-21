import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiErrorResponse } from '../../../http/http.interfaces';
import { HttpService } from '../../../http/http.service';
import { GetNotesSuccessResponse } from '../../../store/notes/notes.interfaces';

@Injectable()
export class NotesService extends HttpService {
    constructor(private http: HttpClient) {
        super();
    }

    public getNotes(
        folderId: number,
    ): Promise<GetNotesSuccessResponse | ApiErrorResponse> {
        return this.http
            .get<GetNotesSuccessResponse | ApiErrorResponse>(`${this.url}/notes`, {
                ...this.httpOptions,
                params: { folderId: `${folderId}` },
            })
            .toPromise();
    }
}
