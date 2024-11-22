export interface ApiResponse {
    success: boolean;
    message: string;
}

export interface Meta {
    currentPage: number;
    totalRecords: number;
    totalPages: number;
    limit: number;
    skip: number;
}

interface SuccessResponse<T> {
    status: true;
    data: T;
    meta: Meta;
}

interface ErrorResponse {
    status: false;
    message: string;
}

export type Result<T> = SuccessResponse<T> | ErrorResponse;
