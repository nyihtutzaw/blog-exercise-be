export type ResponseType<T> = {
    message: string;
    data?: T;
};

export type PaginatedResponse<T> = {
    totalCount: number;
    pages: number;
    data: T[];
};
