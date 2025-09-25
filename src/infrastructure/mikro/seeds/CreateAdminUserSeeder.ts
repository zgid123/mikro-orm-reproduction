import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

import { User } from '../models/User';

export class CreateAdminUserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const repo = em.getRepository(User);
    const email = 'test@gmail.com';

    const admin = await repo.findOne({
      email,
    });

    if (!admin) {
      repo.create(
        {
          email,
          role: 'admin',
          uuid: "test-uuid",
          password: "password",
          lastName: 'Admin',
          firstName: 'Admin',
        },
        {
          partial: true,
        },
      );

      await em.flush();
    }
  }
}
