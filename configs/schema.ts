import { subscribe } from "diagnostics_channel";

import { boolean, serial, varchar, pgTable, json, text, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
  subscription: boolean('subscription').default(false),
});



export const VideoData = pgTable("videoData", {
  id: serial("id").primaryKey().notNull(), // Auto-incrementing primary key
  script: json("script").notNull(), // JSON column for script data
  audioFileUrl: varchar("audioFileUrl", { length: 511 }).notNull(), // Text column for audio file URLs
  captions: json("captions").notNull(), // JSON column for captions
  imageList: varchar("imageList", { length: 511 }).array(1), // Array of text for storing image URLs
  createdBy: varchar("createdBy", { length: 511 }).notNull(), // Creator's ID or username
  createdAt: timestamp("createdAt"), // Timestamp for creation time
});
