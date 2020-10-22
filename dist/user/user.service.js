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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_transformer_1 = require("class-transformer");
const typeorm_2 = require("typeorm");
const functions_1 = require("../common/functions");
const user_entity_1 = require("../entities/user.entity");
const user_dto_1 = require("./dto/user.dto");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDTO) {
        const user = new user_entity_1.User();
        const { username, password, fullname, email } = createUserDTO;
        const existed = await this.find(username);
        if (!existed.length) {
            try {
                user.password = functions_1.hash(password);
                user.username = username;
                user.fullname = fullname;
                user.email = email;
                return await this.userRepository.save(user);
            }
            catch (error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
        throw new common_1.ConflictException('Username already exist');
    }
    async getDetail(username) {
        try {
            const user = await this.find(username);
            return class_transformer_1.plainToClass(user_dto_1.getUserDTO, user[0]);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async find(username) {
        try {
            return await this.userRepository.find({ username: username });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map