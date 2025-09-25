import { MikroORM } from '@mikro-orm/core';
import { AllowedToken } from './models/AllowedToken';

async function test() {
  const orm = await MikroORM.init();
  const repo = orm.em.getRepository(AllowedToken);

  const allowedToken = repo.create({
    refreshToken: '',
    user: BigInt(123),
  })
}
