import { ApiResponse } from "../../http/http.interfaces";

export interface Folder {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetFoldersSuccessResponse extends ApiResponse {
    resource: {
        folders: Folder[];
    };
}

export interface GetFolderAttemptProps {
    folderId?: number;
}

export interface CreateFolderAttemptProps {
    name: string;
}

export interface DeleteFolderAttemptProps {
    folderId: number;
}

export interface DeleteFolderSuccessResponse {
    folderId: number;
}

export interface CreateFolderSuccessResponse extends ApiResponse {
    resource: {
        folder: Folder;
    };
}

export interface SetSelectedFolderIdProps {
    folderId?: number;
}
