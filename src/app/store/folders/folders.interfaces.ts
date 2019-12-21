import { ApiResponse } from '../../http/http.interfaces';

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
