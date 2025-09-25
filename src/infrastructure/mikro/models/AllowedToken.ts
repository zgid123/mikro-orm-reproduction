import { defineEntity, InferEntity } from '@mikro-orm/core';

import { baseProperties } from './Base';
import { User } from './User';

export const AllowedToken = defineEntity({
  name: 'AllowedToken',
  properties: (p) => {
    return {
      ...baseProperties,
      refreshToken: p.string(),
      exp: p.datetime().nullable(true),
      user: p.manyToOne(User),
    };
  },
});

export interface IAllowedToken extends InferEntity<typeof AllowedToken> { }
