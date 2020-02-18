import { ApiResponse } from "../../http/http.interfaces";
import { NoteOrderByParams } from "../../pages/dashboard/notes/notes.service";

export interface Note {
    id: number;
    userId: number;
    folderId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetNotesSuccessResponse extends ApiResponse {
    resource: {
        notes: Note[];
    };
}

export interface GetNotesAttemptProps {
    folderId: number;
    noteId?: number;
    orderBy?: NoteOrderByParams;
}

export interface SetSelectedNoteProps {
    noteId?: number;
}

// tslint:disable-next-line:no-empty-interface
export interface UpdateNoteAttemptProps {
    content: string;
    folderId: number;
    id: number;
}

export interface UpdateNoteSuccessResponse extends ApiResponse {
    resource: {
        note: Note;
    };
}

export interface CreateNoteAttemptProps {
    content: string;
    folderId: number;
}

export interface CreateNoteSuccessResponse extends ApiResponse {
    resource: {
        note: Note;
    };
}

export interface DeleteNoteSuccessResponse {
    noteId: number;
}

export interface DeleteNoteAttemptProps {
    noteId: number;
}

export interface SetNoteOrderByProps {
    orderBy: NoteOrderByParams;
}
