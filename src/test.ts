import { MikroORM } from '@mikro-orm/core';
import { AllowedToken } from './infrastructure/mikro/models/AllowedToken';
import { User } from './infrastructure/mikro/models/User';

async function test() {
  const orm = await MikroORM.init();
  const repo = orm.em.getRepository(AllowedToken);
  const userRepo = orm.em.getRepository(User);

  const allowedToken = repo.create({
    refreshToken: '',
    user: BigInt(123),
  })

  const user = userRepo.create({
    email: 'test@gmail.com',
    password: 'test',
    id: BigInt(123), // not optional
  })
}
