import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const AccessToken = (token: string) => SetMetadata('accessToken', token);
