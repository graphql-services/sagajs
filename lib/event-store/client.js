"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const env_1 = require("../env");
const logger_1 = require("../logger");
const client = new graphql_request_1.GraphQLClient(env_1.getENV('API_URL', 'event-store'));
exports.createEntity = (options) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield client.request(`mutation create${options.entity}(
              $input:${options.entity}RawCreateInput!
            ) {
              create${options.entity}(input:$input){
                id
              }
            }`, { input: options.input });
        logger_1.log(`entity (${options.entity}) created`, options.input, res);
    }
    catch (err) {
        logger_1.log(`create entity failed`, options, err);
    }
});
exports.updateEntity = (options) => __awaiter(this, void 0, void 0, function* () {
    try {
        const res = yield client.request(`mutation update${options.entity}(
            $id:ID!,
            $input:${options.entity}RawUpdateInput!
          ) {
            update${options.entity}(id:$id,input:$input){
              id
            }
          }`, { input: options.input, id: options.entityId });
        logger_1.log(`entity (${options.entity} #${options.entityId}) updated`, options.input, res);
    }
    catch (err) {
        logger_1.log(`update entity failed`, options, err);
    }
});
exports.deleteEntity = (options) => __awaiter(this, void 0, void 0, function* () {
    logger_1.log(`delete entity (${options.entity} #${options.entityId})`);
    try {
        const res = yield client.request(`mutation delete${options.entity}(
            $id: ID!
        ) {
            delete${options.entity}(id:$id){
            id
            }
        }`, { id: options.entityId });
        logger_1.log(`entity (${options.entity} #${options.entityId}) deleted`, res);
    }
    catch (err) {
        logger_1.log(`delete entity failed`, options, err);
    }
});
//# sourceMappingURL=client.js.map