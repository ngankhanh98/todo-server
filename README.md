# Report

## Introduction
This is TODO API, includes:
- [ ] Authenticate: signin, signup, forgot password
- [ ] CRUD task
- [ ] CRUD user

Meanwhile, 
- **Forgot password** using [URL Tokens](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html#url-tokens). To process changing password, user must first create request to `/forgot-password`, a token will be responsed. Then, he/she requests `/reset-password` with **that token**. Only valid and unexpired token (in 24h) can pass `ResetPwdGuard` of `/reset-password` to complete changing password.
- **CRUD task, CRUD user** require `accessToken` in every request's header, and can only Create/Read/Update/Delete on that token's user.

## Technical stacks
**Frameword:** NestJS<br>
**Database:** mySQL (TypeORM)
### Additional techniques
#### Guard, authentication 
Using jwt, passport
#### Configuration
Using `.env` and dynamic module imports.

⚠ When deciding to use `.env` to store your contants, note that these become **enviroment** variables, which are declared and initialised dependently from your **application** enviroment. Not-found exceptions may occur. To avoid this, dynamic module imports are required.

#### Exception filters
To filter then response http-exception from specitfic coder-defined exception, implemented in `common/filters/http-exception.filter.ts`
For example, when register new user, this filter will be activated when 
```ts
...
throw new ConflictException(exceptionMessage.USER_ALREADY_EXIST);
...
```


#### nestjsx/crud

#### Cache
A simple techniques implementing in `/task` (TaskModule) to cache a list of task in previous response.
#### Queue
Queue is used in `/new-task` (TaskModule) with file upload (using multer)

#### Task schedule (@Cron)
#### Secure with helmet


#### Websocket (Limitation)
Websocket is not in the project yet. In order to learning, I have implemented it in another local repository.
It's all about creating a socket server and let client emit to it. `Observerable` (or **Reactive programming** in general) is one kind of knowledge I try to figure out. It looks like a `Promise` with multi returns.


## Design

![](https://github.com/ngankhanh98/todo-server/blob/master/docs/Diagram.png?raw=true)

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