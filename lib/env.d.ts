interface IENV {
    PORT: number | string;
    DEBUG: boolean;
    NODE_ENV: string;
    NSQ_URL: string;
    API_URL: string;
    SENTRY_DNS?: string;
}
export declare const ENV: IENV;
export declare const getENV: <T>(key: string, name?: string) => T;
export declare const getENVString: (key: string, name?: string) => string;
export {};
