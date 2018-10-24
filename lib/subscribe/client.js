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
const nsqjs_1 = require("nsqjs");
const env_1 = require("../env");
const logger_1 = require("../logger");
const reader = new nsqjs_1.Reader('es-event', 'saga', {
    lookupdHTTPAddresses: env_1.getENVString('NSQ_URL', 'subscribe').split(','),
    maxAttempts: 5,
});
reader.on('error', err => {
    logger_1.log(`NSQ error`, err);
});
reader.on('discard', msg => {
    logger_1.log(`NSQ message discarded`, msg);
});
reader.on('nsqd_connected', () => {
    logger_1.log(`NSQ connected`);
});
reader.on('nsqd_closed', () => {
    logger_1.log(`NSQ closed`);
});
reader.connect();
exports.onEvent = (config, handler) => {
    reader.on('message', (msg) => __awaiter(this, void 0, void 0, function* () {
        try {
            const event = JSON.parse(msg.body.toString());
            if (shouldProcessEvent({ config, event })) {
                yield handler(event);
            }
            msg.finish();
        }
        catch (e) {
            logger_1.log(`failed to process event ${msg.body.toString()},error: ${e}`);
            msg.requeue(300);
        }
    }));
};
const shouldProcessEvent = (props) => {
    const { config, event } = props;
    if (config.entity !== event.entity ||
        (config.type && config.type !== event.type)) {
        return false;
    }
    if (config.filter) {
        const { column, value } = config.filter;
        if (column &&
            (event.columns.indexOf(column) === -1 ||
                (value && event.data[column] !== value))) {
            return false;
        }
    }
    return true;
};
//# sourceMappingURL=client.js.map