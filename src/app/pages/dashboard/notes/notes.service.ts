import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiErrorResponse, ApiResponse } from "../../../http/http.interfaces";
import { HttpService } from "../../../http/http.service";
import { CreateFolderSuccessResponse } from "../../../store/folders/folders.interfaces";
import {
    CreateNoteAttemptProps,
    CreateNoteSuccessResponse,
    GetNotesSuccessResponse,
    UpdateNoteAttemptProps,
    UpdateNoteSuccessResponse,
} from "../../../store/notes/notes.interfaces";

// TODO: move somewhere more appropriate
export enum NoteOrderByParams {
    CreatedAt = "createdAt",
    UpdatedAt = "updatedAt",
}

export const NOTE_ORDER_BY_DEFAULT = NoteOrderByParams.UpdatedAt;

@Injectable()
export class NotesService extends HttpService {
    constructor(private http: HttpClient) {
        super();
    }

    public getNotes(
        folderId: number,
        orderBy = NOTE_ORDER_BY_DEFAULT,
    ): Promise<GetNotesSuccessResponse | ApiErrorResponse> {
        return this.http
            .get<GetNotesSuccessResponse | ApiErrorResponse>(`${this.url}/notes`, {
                ...this.httpOptions,
                params: { folderId: `${folderId}`, orderBy },
            })
            .toPromise();
    }

    public updateNote(
        props: UpdateNoteAttemptProps,
    ): Promise<UpdateNoteSuccessResponse | ApiErrorResponse> {
        const { content, folderId } = props;
        const updateNoteRequest = { note: { content, folderId } };
        return this.http
            .patch<UpdateNoteSuccessResponse | ApiErrorResponse>(
                `${this.url}/notes/${props.id}`,
                updateNoteRequest,
                this.httpOptions,
            )
            .toPromise();
    }

    public createNote(
        props: CreateNoteAttemptProps,
    ): Promise<CreateNoteSuccessResponse | ApiErrorResponse> {
        const { content, folderId } = props;
        const createNoteBody = { note: { content, folderId } };
        return this.http
            .post<CreateNoteSuccessResponse | ApiErrorResponse>(
                `${this.url}/notes`,
                createNoteBody,
                this.httpOptions,
            )
            .toPromise();
    }

    public deleteNote(noteId: number): Promise<ApiResponse | ApiErrorResponse> {
        return this.http
            .delete<CreateFolderSuccessResponse | ApiErrorResponse>(
                `${this.url}/notes/${noteId}`,
                this.httpOptions,
            )
            .toPromise();
    }
}
