export interface ErrorModel {
    error: {
        code: number;
        message: string;
        details: string;
        validationErrors: string[]
    };
    result: any;
    success: boolean;
    targetUrl: string;
    unAuthorizedRequest: boolean;
}
