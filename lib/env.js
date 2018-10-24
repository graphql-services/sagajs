"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config({});
exports.ENV = process.env;
exports.getENV = (key, name) => {
    if (!exports.ENV[key]) {
        throw new Error(`${key} environment variable is required${name ? ` for using ${name} module` : ''}`);
    }
    return exports.ENV[key];
};
exports.getENVString = (key, name) => {
    return exports.getENV(key, name);
};
//# sourceMappingURL=env.js.map