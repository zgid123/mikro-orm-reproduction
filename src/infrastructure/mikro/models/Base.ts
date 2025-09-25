import { defineEntity, OptionalProps } from '@mikro-orm/core';

// For CLI only
export abstract class Base {
  id!: bigint;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt';
}

const p = defineEntity.properties;

export const baseProperties = {
  id: p
    .bigint()
    .columnType('bigint')
    .primary()
    .autoincrement(true)
    .$type<bigint>()
    .generated('identity'),
  createdAt: p.datetime().onCreate(() => new Date()),
  updatedAt: p
    .datetime()
    .onCreate(() => new Date())
    .onUpdate(() => new Date()),
};
