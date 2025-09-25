import { defineConfig, type MikroORMOptions } from '@mikro-orm/core';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator, TSMigrationGenerator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';

import { MikroNamingStrategy } from './strategy';

interface IConfigParams {
  dbName?: string;
  rootFolder?: string;
  allowGlobalContext?: boolean;
  entities?: MikroORMOptions['entities'];
  entitiesTs?: MikroORMOptions['entitiesTs'];
  extensions?: MikroORMOptions['extensions'];
}

export type TMikroConfig = Partial<MikroORMOptions>;

export function config({
  dbName,
  entities,
  entitiesTs,
  extensions = [],
  allowGlobalContext = false,
  rootFolder = 'infrastructure/mikro',
}: IConfigParams = {}): TMikroConfig {
  dbName ||= process.env.DB_NAME || 'demo_development';
  entities ||= [`./dist/${rootFolder}/models`];
  entitiesTs ||= [`./src/${rootFolder}/models`];
  const driverInstance: MikroORMOptions['driver'] = PostgreSqlDriver;

  return defineConfig({
    dbName,
    entities,
    entitiesTs,
    allowGlobalContext,
    driver: driverInstance,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    namingStrategy: MikroNamingStrategy,
    port: parseInt(process.env.DB_PORT || '', 10),
    debug: process.env.NODE_ENV === 'development',
    extensions: [Migrator, EntityGenerator, SeedManager, ...extensions],
    seeder: {
      glob: '!(*.d).{js,ts}',
      path: `./dist/${rootFolder}/seeds`,
      pathTs: `./src/${rootFolder}/seeds`,
    },
    migrations: {
      emit: 'ts',
      generator: TSMigrationGenerator,
      path: `./dist/${rootFolder}/migrations`,
      pathTs: `./src/${rootFolder}/migrations`,
      fileName: (timestamp: string, name?: string) => {
        if (!name) {
          throw new Error(
            'Specify migration name via `mikro-orm migration:create --name=...`',
          );
        }

        return `Migration${timestamp}_${name}`;
      },
    },
  });
}
