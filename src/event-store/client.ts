import { GraphQLClient } from 'graphql-request';

import { getENV } from '../env';
import { log } from '../logger';

const client = new GraphQLClient(getENV('API_URL', 'event-store'));

interface ICreateEntityOptions {
  entity: string;
  input: { [key: string]: any };
}
export const createEntity = async (options: ICreateEntityOptions) => {
  try {
    const res = await client.request(
      `mutation create${options.entity}(
              $input:${options.entity}RawCreateInput!
            ) {
              create${options.entity}(input:$input){
                id
              }
            }`,
      { input: options.input },
    );
    log(`entity (${options.entity}) created`, options.input, res);
  } catch (err) {
    log(`create entity failed`, options, err);
  }
};

interface IUpdateEntityOptions {
  entity: string;
  entityId: string;
  input: { [key: string]: any };
}
export const updateEntity = async (options: IUpdateEntityOptions) => {
  try {
    const res = await client.request(
      `mutation update${options.entity}(
            $id:ID!,
            $input:${options.entity}RawUpdateInput!
          ) {
            update${options.entity}(id:$id,input:$input){
              id
            }
          }`,
      { input: options.input, id: options.entityId },
    );
    log(
      `entity (${options.entity} #${options.entityId}) updated`,
      options.input,
      res,
    );
  } catch (err) {
    log(`update entity failed`, options, err);
  }
};

interface IDeleteEntityOptions {
  entity: string;
  entityId: string;
}
export const deleteEntity = async (options: IDeleteEntityOptions) => {
  log(`delete entity (${options.entity} #${options.entityId})`);
  try {
    const res = await client.request(
      `mutation delete${options.entity}(
            $id: ID!
        ) {
            delete${options.entity}(id:$id){
            id
            }
        }`,
      { id: options.entityId },
    );
    log(`entity (${options.entity} #${options.entityId}) deleted`, res);
  } catch (err) {
    log(`delete entity failed`, options, err);
  }
};
