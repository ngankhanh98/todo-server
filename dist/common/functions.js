"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.compare = exports.hash = void 0;
const constant_1 = require("../constant");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
function hash(text) {
    return bcrypt.hashSync(text, 6, async function (err, hash) {
        if (err)
            throw Error(err.message);
        return hash;
    });
}
exports.hash = hash;
async function compare(password, hash) {
    return await bcrypt.compare(password, hash);
}
exports.compare = compare;
function verify(token) {
    return jwt.verify(token, constant_1.secret.passphrase, function (err, decoded) {
        if (err)
            throw new Error(err.message);
        return decoded;
    });
}
exports.verify = verify;
//# sourceMappingURL=functions.js.map