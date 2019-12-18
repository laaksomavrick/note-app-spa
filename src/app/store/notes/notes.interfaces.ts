import { ApiResponse } from '../../http/http.interfaces';

export interface Note {
    id: number;
    userId: number;
    folderId: number;
    name: string;
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
}

export interface SetSelectedNoteProps {
    noteId: number;
}
