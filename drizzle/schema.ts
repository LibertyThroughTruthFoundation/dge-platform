import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  tokenBalance: int("tokenBalance").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Token transactions table for tracking all token rewards and spending
 */
export const tokenTransactions = mysqlTable("tokenTransactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  amount: int("amount").notNull(),
  type: mysqlEnum("type", ["reading", "module_completion", "discussion"]).notNull(),
  description: text("description").notNull(),
  relatedContentId: varchar("relatedContentId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TokenTransaction = typeof tokenTransactions.$inferSelect;
export type InsertTokenTransaction = typeof tokenTransactions.$inferInsert;

/**
 * Reading progress table for tracking user progress through Bible chapters
 */
export const readingProgress = mysqlTable("readingProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contentType: mysqlEnum("contentType", ["bible", "module"]).notNull(),
  contentId: varchar("contentId", { length: 255 }).notNull(),
  timeSpentSeconds: int("timeSpentSeconds").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
  lastReadAt: timestamp("lastReadAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ReadingProgress = typeof readingProgress.$inferSelect;
export type InsertReadingProgress = typeof readingProgress.$inferInsert;

/**
 * Module completion tracking
 */
export const moduleCompletion = mysqlTable("moduleCompletion", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  moduleId: varchar("moduleId", { length: 255 }).notNull(),
  subModuleId: varchar("subModuleId", { length: 255 }),
  completed: boolean("completed").default(false).notNull(),
  tokensEarned: int("tokensEarned").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ModuleCompletion = typeof moduleCompletion.$inferSelect;
export type InsertModuleCompletion = typeof moduleCompletion.$inferInsert;

/**
 * Lexicon terms
 */
export const lexiconTerms = mysqlTable("lexiconTerms", {
  id: int("id").autoincrement().primaryKey(),
  term: varchar("term", { length: 255 }).notNull().unique(),
  definition: text("definition").notNull(),
  category: varchar("category", { length: 100 }),
  relatedTerms: text("relatedTerms"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LexiconTerm = typeof lexiconTerms.$inferSelect;
export type InsertLexiconTerm = typeof lexiconTerms.$inferInsert;
