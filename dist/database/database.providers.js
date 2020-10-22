"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProvider = void 0;
const typeorm_1 = require("@nestjs/typeorm");
exports.databaseProvider = typeorm_1.TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'www.db4free.net',
    port: 3306,
    username: 'ebanking',
    password: '123456789',
    database: 'ebanking',
    entities: ['"dist/**/*.entity{.ts,.js}"'],
    synchronize: true,
    autoLoadEntities: true,
});
//# sourceMappingURL=database.providers.js.map