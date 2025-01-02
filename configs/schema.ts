import { subscribe } from "diagnostics_channel";

import { boolean, serial, varchar, pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
  subscription: boolean('subscription').default(false),
});