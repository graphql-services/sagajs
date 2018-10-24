import { EventType, Event } from './event.model';
export interface INSQOnEventConfig {
    entity: string;
    type?: EventType;
    filter?: {
        column?: string;
        value?: any;
    };
}
export declare const onEvent: (config: INSQOnEventConfig, handler: (event: Event) => Promise<any>) => void;
