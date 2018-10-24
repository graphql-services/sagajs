export declare enum IStoreEventType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}
export interface IStoreEventData {
    [key: string]: any;
}
export interface IStoreEventOutputData extends IStoreEventData {
    id: string;
    createdAt: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
}
export interface IStoreEvent {
    id: string;
    entity: string;
    entityId: string;
    data: IStoreEventData | null;
    type: IStoreEventType;
    date: Date;
    principalId?: string;
    columns: string[];
}
