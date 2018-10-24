export { log } from './logger';
export { getENV } from './env';

export const delay = async (interval: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, interval);
  });
};
