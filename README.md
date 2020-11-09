# Report

- [Report](#report)
  * [1. Introduction](#1-introduction)
  * [2. Technical stacks](#2-technical-stacks)
    + [2.1. Main stack](#21-main-stack)
    + [2.2. Additional techniques](#22-additional-techniques)
      - [2.2.1. Guard, authentication](#221-guard--authentication)
      - [2.2.2. Configuration](#222-configuration)
      - [2.2.3. Exception filters](#223-exception-filters)
      - [2.2.4. nestjsx/crud](#224-nestjsx-crud)
      - [2.2.5. Cache](#225-cache)
      - [2.2.6. Queue](#226-queue)
      - [2.2.7. Task schedule (@Cron)](#227-task-schedule---cron-)
      - [2.2.8. Secure with helmet](#228-secure-with-helmet)
      - [2.2.9. Websocket (Limitation)](#229-websocket--limitation-)
  * [3. Design diagram](#3-design-diagram)
  * [4. Design explaination](#4-design-explaination)


## 1. Introduction
This is TODO API, includes:
- [ ] Authenticate: signin, signup, forgot password
- [ ] CRUD task
- [ ] CRUD user

Meanwhile, 
- **Forgot password** using [URL Tokens](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html#url-tokens). To process changing password, user must first create request to `/forgot-password`, a token will be responsed. Then, he/she requests `/reset-password` with **that token**. Only valid and unexpired token (in 24h) can pass `ResetPwdGuard` of `/reset-password` to complete changing password.
- **CRUD task, CRUD user** require `accessToken` in every request's header, and can only Create/Read/Update/Delete on that token's user.


## 1.1. Restful API
To my knowledge, Restful API is one way to implement of Application Programming Interface. Two main characteristics Restful API is mostly known for is: **endpoint** and **HTTP method**
```
     GET /products 
     ^^^
     method
     ^^^^^^^^^^^^^
     endpoint
```
### HTTP methods

| Method | Purpose | Response status|
|--------|---------|----------------|
| GET    | retrieve data|`200` OK, `404` Not found|
| POST   | submit an entity to the specified resource | `201` Created, `403` Forbidden, `409` Conflict|
| PUT | replaces all fields of the target resource | `201` Created, `204` No Content
| DELETE | deletes the specified resource. | `200` OK,  `204` No Content (Delete fullfiled, no information to be supplied)
| OPTIONS | _'check whether an enpoint available'_. - Mr. Tuan (otherwise I have no idea) | 
| PATCH | modifies partially to a resource. | `200` Succeeded, `404` Not found|


## 2. Technical stacks
### 2.1. Main stack
**Frameword:** NestJS<br>
**Database:** mySQL (TypeORM)
### 2.2. Additional techniques
#### 2.2.1. Guard, authentication 
Using jwt, passport
#### 2.2.2. Configuration
Using `.env` and dynamic module imports.

⚠ When deciding to use `.env` to store your contants, note that these become **enviroment** variables, which are declared and initialised dependently from your **application** enviroment. Not-found exceptions may occur. To avoid this, dynamic module imports are required.

#### 2.2.3. Exception filters
To filter then response http-exception from specitfic coder-defined exception, implemented in `common/filters/http-exception.filter.ts`
For example, when register new user, this filter will be activated when 
```ts
...
throw new ConflictException(exceptionMessage.USER_ALREADY_EXIST);
...
```


#### 2.2.4. nestjsx/crud

##### Installation
```bash
$ npm i @nestjsx/crud class-transformer class-validator
$ npm i @nestjsx/crud-typeorm @nestjs/typeorm typeorm
```

##### Getting started
Create an entity, let say, **user.entity.ts**. This should map with columns in your table `user` (database)
```ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;

  @Column()
  fullname: string;

  @Column()
  email: string;
}
```

Create a service, **user.service.ts**
```ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { User } from "./user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }
}
```

Create a controller, **user.controller.ts**
```ts
import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { User } from "./user.entity";
import { UserService } from "./user.service";

@Crud({
  model: {
    type: User,
  },
})
@Controller("user")
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}
```
Create a module, **user.module.ts**
```ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./User.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
```


##### Exclude endpoints
You might want to exclude some endpoints, in **.controller.ts**
```ts
... 
@Crud({
  model: {
    type: User,
  },
  routes: {
    exclude: [
      'createOneBase',
      'createManyBase',
      'getManyBase',
      'replaceOneBase',
    ],
  }
})
...
```

##### Add new endpoint
Besides basic CRUD, you might want to add new, place `@UseInterceptors(CrudRequestInterceptor)` before it
```ts
...
export class UserController implements CrudController<User> {
  constructor(public service: UserService) {}

  @UseInterceptors(CrudRequestInterceptor)
  @Get('/me')
  async getMe(@Request() req) {
    // your funtion
  }
}
```

##### Override endpoint
You might want to override an existing endpoint: place `@Override()` before which route being overrided. Ex, **task.controller.ts**
```ts
...
export class TaskController implements CrudController<Task> {
  constructor(readonly service: TaskService) {}

  @Override()
  @CacheKey('tasks')
  @CacheTTL(600)
  getMany(@Request() req) {
    const username = req['user'];
    return this.service.getTasksByCreator(username);
  }
}
```
Here is a list of crud default route can be overrided, https://github.com/nestjsx/crud/wiki/Controllers#routes-override

##### Serialize
@nestjsx/crud using your **entity**, which reflects all columns in your table. So there is a concern, if my [table].[user] contains `username` and `password`, how can I hide them from `GET - /user/{username}`. 

Let say, `GET - /user` can only retrive data that maps `getUserDTO`, add `serialize` in your `@Crud({})` decorator
```ts
@Crud({
  ...
  serialize: {
    get: getUserDTO,
  },
  ...
})

```

#### 2.2.5. Cache
A simple techniques implementing in `/task` (TaskModule) to cache a list of task in previous response.
#### 2.2.6. Queue
Queue is used in `/new-task` (TaskModule) with file upload (using multer)

#### 2.2.7. Task schedule (@Cron)
#### 2.2.8. Secure with helmet

#### 2.2.9. Websocket (Limitation)
Websocket is not in the project yet. In order to learning, I have implemented it in another local repository.
It's all about creating a socket server and let client emit to it. `Observerable` (or **Reactive programming** in general) is one kind of knowledge I try to figure out. It looks like a `Promise` with multi returns.


## 3. Design diagram

![](https://github.com/ngankhanh98/todo-server/blob/master/docs/Diagram.png?raw=true)

## 4. Design explaination
- **AppModule**: interface of the application, imports other modules.
- **UserModule**: whose controller is `UserController`, and import `UserService`.
  - **UserController**: handle HTTP requests, guarded by `AuthGuard` (which mean accessToken required in request's header):
    - GET user/me, 
    - GET user/{username}, 
    - PATCH user/{username}, 
    - DELETE user/{username}

  - **UserService**: 
    - Embeded `nestjsx/crud-typeorm` to auto CRUD user
    - Provide getAccessToken method for **AuthModule** (JWT sign with secretkey config in UserModule) 

- **AuthModule**: whose controller is `UserController`, and import `UserService`.
  - **AuthController**: handle HTTP requests:
    - POST ​/auth​/login, guarded by `LocalGuard`, which means: if username and password validated, an accessToken will be responsed
    - POST ​/auth​/register
    - GET ​/auth​/forgot-password, a resetPwdToken in response (frontend can send this token to user email)
    - POST ​/auth​/reset-password, guarded by `ResetPwdGuard`, means that: if resetPwdToken valid and unexpired, changing password request will be processed.


- **TaskModule**: whose controller is `UserController` and is guarded by `AuthGuard`.
  - **TaskController**: handle HTTP request, attention requird for one route:
    - POST /task/new-task, using Multer upload file and addNewTask from **TaskService**.
  - **TaskServer**: provide a addNewTask method, which imports **TaskProccessor** using Queue.

- **DatabaseModule**: import **DatabaseProvider** which is TypeORM under the hood.

## Acknowledge
- This project and my knowledge accumulation in NestJS is blessed by Mr. Dinh Tien @dohoangdinhtien
- NestJS Official Docs, https://docs.nestjs.com/
- CRUD for RESTful APIs built with NestJs, https://github.com/nestjsx/crud
- Forgot password approaches, https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
- RxJS, https://reactive.how/
- Guru JS blog - anonystick, https://anonystick.com/
- TypeScript handbook, https://www.typescriptlang.org/docs/handbook
- Clean code JavaScript, https://github.com/ryanmcdermott/clean-code-javascript
- JavaScript Modern, https://javascript.info/

