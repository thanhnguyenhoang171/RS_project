export declare const ADMIN_ROLE = "AMDIN";
export declare const USER_ROLE = "USER";
export declare const INIT_PERMISSIONS: ({
    _id: string;
    name: string;
    path: string;
    method: string;
    module: string;
    createdBy: {
        _id: string;
        email: string;
    };
    isDeleted: boolean;
    deletedAt: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
    updatedBy: {
        _id: string;
        email: string;
    };
} | {
    _id: string;
    name: string;
    path: string;
    method: string;
    module: string;
    createdBy: {
        _id: string;
        email: string;
    };
    isDeleted: boolean;
    deletedAt: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
    updatedBy?: undefined;
})[];
