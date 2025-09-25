import { defineEntity, type InferEntity } from '@mikro-orm/core';

import { AllowedToken } from './AllowedToken';
import { baseProperties } from './Base';

export const roles = {
  user: 'user',
  admin: 'admin',
} as const;

export type TRole = keyof typeof roles;

export const User = defineEntity({
  name: 'User',
  properties: (p) => {
    return {
      ...baseProperties,
      uuid: p.text().unique(true),
      email: p.string().unique(true),
      firstName: p.string().nullable(true),
      lastName: p.string().nullable(true),
      password: p.string().hidden(),
      role: p.enum(Object.values(roles)).default(roles.user),
      allowedTokens: () => {
        return p
          .oneToMany(AllowedToken)
          .mappedBy((allowedToken) => allowedToken.user);
      },
    };
  },
});

export interface IUser extends InferEntity<typeof User> { }
