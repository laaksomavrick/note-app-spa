import { ApiResponse } from '../../http/http.interfaces';

export interface Note {
    id: number;
    userId: number;
    folderId: number;
    name?: string;
    content?: string;
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
}

export interface SetSelectedNoteProps {
    noteId?: number;
}

// tslint:disable-next-line:no-empty-interface
export interface UpdateNoteAttemptProps {
    name?: string;
    content?: string;
    folderId: number;
    id: number;
}

export interface UpdateNoteSuccessResponse extends ApiResponse {
    resource: {
        note: Note;
    };
}

export interface CreateNoteAttemptProps {
    name: string;
    content?: string;
    folderId: number;
}

export interface CreateNoteSuccessResponse extends ApiResponse {
    resource: {
        note: Note;
    };
}
