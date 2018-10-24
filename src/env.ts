import { config } from 'dotenv';

config({});

interface IENV {
  PORT: number | string;
  DEBUG: boolean;
  NODE_ENV: string;
  NSQ_URL: string;
  API_URL: string;
  SENTRY_DNS?: string;
}

export const ENV: IENV = process.env as any;

export const getENV = <T>(key: string, name?: string): T => {
  if (!ENV[key]) {
    throw new Error(
      `${key} environment variable is required${
        name ? ` for using ${name} module` : ''
      }`,
    );
  }
  return ENV[key];
};

export const getENVString = (key: string, name?: string): string => {
  return getENV(key, name);
};
