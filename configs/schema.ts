import { subscribe } from "diagnostics_channel";

import { boolean, serial, varchar, pgTable, json, text, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
  subscription: boolean('subscription').default(false),
});

export const VideoData = pgTable('videoData', {
  id: serial('id').primaryKey().notNull(), // Auto-incrementing primary key
  script: json('script').notNull(), // Using JSONB for better query performance
  audioFileUrl: text('audioFileUrl').notNull(), // Text to handle longer URLs
  captions: json('captions').notNull(), // JSONB for captions to improve indexing
  imageList: text('imageList').array().notNull(), // Array of text for storing image URLs
  createdBy: varchar('createdBy', { length: 255 }).notNull(), // Creator ID or username
  createdAt: timestamp('createdAt').defaultNow().notNull(), // Automatically sets the current timestamp
  updatedAt: timestamp('updatedAt').defaultNow().notNull(), // Automatically updates on modifications
});