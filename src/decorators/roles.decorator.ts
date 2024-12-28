import { SetMetadata } from '@nestjs/common';
import { Roles as UserRoles } from 'src/enums/roles.enum'

export const Roles = (...roles: UserRoles[]) => SetMetadata('roles', roles);
