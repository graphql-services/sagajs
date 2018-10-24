import { config } from 'dotenv';

config({});

export const ENV = process.env as { [key: string]: string };

export const getENV = (key: string, name?: string): string => {
  if (!ENV[key]) {
    throw new Error(
      `${key} environment variable is required${
        name ? ` for using ${name} module` : ''
      }`,
    );
  }
  return ENV[key];
};
