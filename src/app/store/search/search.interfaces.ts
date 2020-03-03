import { ApiResponse } from "../../http/http.interfaces";
import { Folder } from "../folders/folders.interfaces";
import { Note } from "../notes/notes.interfaces";

export interface SearchProps {
    search: {
        query: string;
    };
}

export interface SearchAllSuccessResponse extends ApiResponse {
    resource: {
        notes: Note[];
        folders: Folder[];
    };
}
