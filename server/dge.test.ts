import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("DGE Platform Tests", () => {
  describe("Bible Reader", () => {
    it("should return chapter content for valid chapter ID", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bible.getChapter({ chapterId: "enoch-60" });

      expect(result).toBeDefined();
      expect(result.book).toBe("1 Enoch");
      expect(result.chapter).toBe(60);
      expect(result.title).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.lexiconTerms).toBeInstanceOf(Array);
    });

    it("should track reading progress", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.bible.updateProgress({
        chapterId: "enoch-60",
        timeSpentSeconds: 120, // 2 minutes
        completed: false,
      });

      expect(result.progress).toBeDefined();
      expect(result.tokensEarned).toBe(2); // 2 tokens for 2 minutes
    });
  });

  describe("Module 7", () => {
    it("should return module content", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.module.getModule();

      expect(result).toBeDefined();
      expect(result.id).toBe("module-7");
      expect(result.title).toBe("Leadership in the Unfolding");
      expect(result.subModules).toHaveLength(4);
    });

    it("should include scholarly footnotes in sub-module content", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.module.getSubModule({
        subModuleId: "fixed-foundation-flexible-form",
      });

      expect(result).toBeDefined();
      expect(result.content).toContain("[^1]"); // Footnote reference
      expect(result.content).toContain("## Footnotes"); // Footnote section
      expect(result.content).toContain("Carson"); // Scholar citation
    });

    it("should include 'Building upon' framing for original contributions", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.module.getSubModule({
        subModuleId: "fourfold-kingdom-organism",
      });

      expect(result).toBeDefined();
      expect(result.content).toContain("Building on"); // Framing language
      expect(result.content).toContain("The Apostle Paul's body metaphor"); // Biblical foundation
    });

    it("should return sub-module content", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.module.getSubModule({
        subModuleId: "fixed-foundation-flexible-form",
      });

      expect(result).toBeDefined();
      expect(result.id).toBe("fixed-foundation-flexible-form");
      expect(result.title).toBeDefined();
      expect(result.content).toBeDefined();
      expect(result.tokensEarned).toBeGreaterThan(0);
    });

    it("should mark module as complete and award tokens", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.module.markComplete({
        moduleId: "module-7",
        subModuleId: "fixed-foundation-flexible-form",
        tokensEarned: 15,
      });

      expect(result).toBeDefined();
      expect(result.completed).toBe(true);
    });
  });

  describe("Lexicon", () => {
    it("should return all lexicon terms", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.lexicon.getAllTerms();

      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty("term");
      expect(result[0]).toHaveProperty("definition");
      expect(result[0]).toHaveProperty("category");
    });

    it("should include scholarly citations in lexicon definitions", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.lexicon.getAllTerms();
      const angelLedgers = result.find(t => t.term === "Angel Ledgers");

      expect(angelLedgers).toBeDefined();
      expect(angelLedgers?.definition).toContain("Drawing on"); // Framing language
      expect(angelLedgers?.definition).toContain("Nickelsburg"); // Scholar citation
    });

    it("should include 'Building upon' framing for original lexicon terms", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.lexicon.getAllTerms();
      const covenantEconomics = result.find(t => t.term === "Covenant Economics");

      expect(covenantEconomics).toBeDefined();
      expect(covenantEconomics?.definition).toContain("biblical covenant principles");
      expect(covenantEconomics?.definition).toContain("Hahn"); // Scholar citation
    });

    it("should return specific term", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // First get all terms to find a valid term
      const allTerms = await caller.lexicon.getAllTerms();
      const firstTerm = allTerms[0];

      if (firstTerm) {
        const result = await caller.lexicon.getTerm({ term: firstTerm.term });
        expect(result).toBeDefined();
        expect(result?.term).toBe(firstTerm.term);
      }
    });
  });

  describe("Token System", () => {
    it("should return token balance", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tokens.getBalance();

      expect(result).toBeDefined();
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it("should return token history", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.tokens.getHistory();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
