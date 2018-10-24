export enum EventType {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export interface EventData {
  [key: string]: any;
}
export interface EventOutputData extends EventData {
  id: string;
  createdAt: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export interface Event {
  id: string;
  entity: string;
  entityId: string;
  data: EventData | null;
  type: EventType;
  date: Date;
  principalId?: string;
  columns: string[];
}
