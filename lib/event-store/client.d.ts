interface ICreateEntityOptions {
    entity: string;
    input: {
        [key: string]: any;
    };
}
export declare const createEntity: (options: ICreateEntityOptions) => Promise<void>;
interface IUpdateEntityOptions {
    entity: string;
    entityId: string;
    input: {
        [key: string]: any;
    };
}
export declare const updateEntity: (options: IUpdateEntityOptions) => Promise<void>;
interface IDeleteEntityOptions {
    entity: string;
    entityId: string;
}
export declare const deleteEntity: (options: IDeleteEntityOptions) => Promise<void>;
export {};
