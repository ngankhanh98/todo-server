"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const functions_1 = require("../functions");
let VerifyMiddleware = class VerifyMiddleware {
    async use(req, res, next) {
        const accessToken = req.headers['access-token'];
        try {
            const decoded = await functions_1.verify(accessToken);
            req.username = decoded.username;
            next();
        }
        catch (error) {
            res.status(common_1.HttpStatus.UNAUTHORIZED).send(error.message);
        }
    }
};
VerifyMiddleware = __decorate([
    common_1.Injectable()
], VerifyMiddleware);
exports.VerifyMiddleware = VerifyMiddleware;
//# sourceMappingURL=verify.middleware.js.map