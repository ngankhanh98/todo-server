"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDTO = exports.createUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class createUserDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createUserDTO.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createUserDTO.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createUserDTO.prototype, "fullname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], createUserDTO.prototype, "email", void 0);
exports.createUserDTO = createUserDTO;
class getUserDTO {
}
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUserDTO.prototype, "username", void 0);
__decorate([
    class_transformer_1.Exclude(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUserDTO.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUserDTO.prototype, "fullname", void 0);
__decorate([
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], getUserDTO.prototype, "email", void 0);
exports.getUserDTO = getUserDTO;
//# sourceMappingURL=user.dto.js.map