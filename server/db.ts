import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  tokenTransactions,
  InsertTokenTransaction,
  readingProgress,
  InsertReadingProgress,
  moduleCompletion,
  InsertModuleCompletion,
  lexiconTerms,
  InsertLexiconTerm,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Token management
export async function addTokens(userId: number, amount: number, type: InsertTokenTransaction["type"], description: string, relatedContentId?: string) {
  const db = await getDb();
  if (!db) return null;

  await db.transaction(async (tx) => {
    await tx.insert(tokenTransactions).values({
      userId,
      amount,
      type,
      description,
      relatedContentId,
    });

    const currentUser = await tx.select().from(users).where(eq(users.id, userId)).limit(1);
    const newBalance = (currentUser[0]?.tokenBalance ?? 0) + amount;
    await tx
      .update(users)
      .set({ tokenBalance: newBalance })
      .where(eq(users.id, userId));
  });

  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return user[0];
}

export async function getTokenBalance(userId: number) {
  const db = await getDb();
  if (!db) return 0;

  const user = await db.select({ tokenBalance: users.tokenBalance }).from(users).where(eq(users.id, userId)).limit(1);
  return user[0]?.tokenBalance ?? 0;
}

export async function getTokenHistory(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(tokenTransactions).where(eq(tokenTransactions.userId, userId)).orderBy(desc(tokenTransactions.createdAt));
}

// Reading progress
export async function getReadingProgress(userId: number, contentType: InsertReadingProgress["contentType"], contentId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(readingProgress)
    .where(and(eq(readingProgress.userId, userId), eq(readingProgress.contentType, contentType), eq(readingProgress.contentId, contentId)))
    .limit(1);

  return result[0] ?? null;
}

export async function updateReadingProgress(userId: number, contentType: InsertReadingProgress["contentType"], contentId: string, timeSpentSeconds: number, completed: boolean) {
  const db = await getDb();
  if (!db) return null;

  const existing = await getReadingProgress(userId, contentType, contentId);

  if (existing) {
    await db
      .update(readingProgress)
      .set({
        timeSpentSeconds: existing.timeSpentSeconds + timeSpentSeconds,
        completed,
        lastReadAt: new Date(),
      })
      .where(eq(readingProgress.id, existing.id));
  } else {
    await db.insert(readingProgress).values({
      userId,
      contentType,
      contentId,
      timeSpentSeconds,
      completed,
    });
  }

  return await getReadingProgress(userId, contentType, contentId);
}

// Module completion
export async function getModuleCompletion(userId: number, moduleId: string, subModuleId?: string) {
  const db = await getDb();
  if (!db) return null;

  const conditions = [eq(moduleCompletion.userId, userId), eq(moduleCompletion.moduleId, moduleId)];

  if (subModuleId) {
    conditions.push(eq(moduleCompletion.subModuleId, subModuleId));
  }

  const result = await db.select().from(moduleCompletion).where(and(...conditions)).limit(1);

  return result[0] ?? null;
}

export async function markModuleComplete(userId: number, moduleId: string, subModuleId: string | undefined, tokensEarned: number) {
  const db = await getDb();
  if (!db) return null;

  const existing = await getModuleCompletion(userId, moduleId, subModuleId);

  if (existing && existing.completed) {
    return existing;
  }

  if (existing) {
    await db
      .update(moduleCompletion)
      .set({
        completed: true,
        tokensEarned,
        completedAt: new Date(),
      })
      .where(eq(moduleCompletion.id, existing.id));
  } else {
    await db.insert(moduleCompletion).values({
      userId,
      moduleId,
      subModuleId: subModuleId ?? null,
      completed: true,
      tokensEarned,
      completedAt: new Date(),
    });
  }

  return await getModuleCompletion(userId, moduleId, subModuleId);
}

// Lexicon
export async function getAllLexiconTerms() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(lexiconTerms);
}

export async function getLexiconTerm(term: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(lexiconTerms).where(eq(lexiconTerms.term, term)).limit(1);

  return result[0] ?? null;
}

export async function seedLexiconTerms(terms: InsertLexiconTerm[]) {
  const db = await getDb();
  if (!db) return;

  for (const term of terms) {
    const existing = await getLexiconTerm(term.term);
    if (!existing) {
      await db.insert(lexiconTerms).values(term);
    }
  }
}
