import { typeEntity } from '@coreloops-orm/schemas/types';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const moveEntity = pgTable('moves', {
  id: uuid('id').notNull().defaultRandom().primaryKey(),
  name: text('name').notNull(),
  accuracy: integer('accuracy'),
  damageClass: text('damage_class'),
  power: integer('power'),
  pp: integer('pp'),
  level: integer('level'),
  typeId: uuid('type_id')
    .notNull()
    .references(() => typeEntity.id),
});
