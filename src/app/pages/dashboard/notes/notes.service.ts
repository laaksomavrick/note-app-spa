import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiErrorResponse } from '../../../http/http.interfaces';
import { HttpService } from '../../../http/http.service';
import {
    GetNotesSuccessResponse,
    Note,
    UpdateNoteSuccessResponse,
} from '../../../store/notes/notes.interfaces';

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

    public updateNote(note: Note): Promise<UpdateNoteSuccessResponse | ApiErrorResponse> {
        const { name, content, folderId } = note;
        const updateNoteRequest = { note: { name, content, folderId } };
        return this.http
            .patch<UpdateNoteSuccessResponse | ApiErrorResponse>(
                `${this.url}/notes/${note.id}`,
                updateNoteRequest,
                this.httpOptions,
            )
            .toPromise();
    }
}
