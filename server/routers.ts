import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { enochChapters } from "./data/enoch-60-61";
import { module7Content } from "./data/module7";
import { lexiconTermsData } from "./data/lexicon";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Bible Reader
  bible: router({
    getChapter: protectedProcedure
      .input(z.object({ chapterId: z.string() }))
      .query(({ input }) => {
        const chapter = enochChapters[input.chapterId as keyof typeof enochChapters];
        if (!chapter) {
          throw new Error("Chapter not found");
        }
        return chapter;
      }),
    
    getProgress: protectedProcedure
      .input(z.object({ chapterId: z.string() }))
      .query(async ({ ctx, input }) => {
        return await db.getReadingProgress(ctx.user.id, "bible", input.chapterId);
      }),

    updateProgress: protectedProcedure
      .input(z.object({
        chapterId: z.string(),
        timeSpentSeconds: z.number(),
        completed: z.boolean(),
      }))
      .mutation(async ({ ctx, input }) => {
        const progress = await db.updateReadingProgress(
          ctx.user.id,
          "bible",
          input.chapterId,
          input.timeSpentSeconds,
          input.completed
        );

        // Award tokens (1 token per minute of reading)
        const tokensEarned = Math.floor(input.timeSpentSeconds / 60);
        if (tokensEarned > 0) {
          await db.addTokens(
            ctx.user.id,
            tokensEarned,
            "reading",
            `Reading ${input.chapterId}`,
            input.chapterId
          );
        }

        return { progress, tokensEarned };
      }),
  }),

  // Module 7
  module: router({
    getModule: protectedProcedure.query(() => module7Content),
    
    getSubModule: protectedProcedure
      .input(z.object({ subModuleId: z.string() }))
      .query(({ input }) => {
        const subModule = module7Content.subModules.find(sm => sm.id === input.subModuleId);
        if (!subModule) {
          throw new Error("Sub-module not found");
        }
        return subModule;
      }),

    getCompletion: protectedProcedure
      .input(z.object({
        moduleId: z.string(),
        subModuleId: z.string().optional(),
      }))
      .query(async ({ ctx, input }) => {
        return await db.getModuleCompletion(ctx.user.id, input.moduleId, input.subModuleId);
      }),

    markComplete: protectedProcedure
      .input(z.object({
        moduleId: z.string(),
        subModuleId: z.string().optional(),
        tokensEarned: z.number(),
      }))
      .mutation(async ({ ctx, input }) => {
        const completion = await db.markModuleComplete(
          ctx.user.id,
          input.moduleId,
          input.subModuleId,
          input.tokensEarned
        );

        // Award tokens
        await db.addTokens(
          ctx.user.id,
          input.tokensEarned,
          "module_completion",
          `Completed ${input.subModuleId || input.moduleId}`,
          input.subModuleId || input.moduleId
        );

        return completion;
      }),
  }),

  // Lexicon
  lexicon: router({
    getAllTerms: protectedProcedure.query(async () => {
      let terms = await db.getAllLexiconTerms();
      
      // Seed if empty
      if (terms.length === 0) {
        await db.seedLexiconTerms(lexiconTermsData);
        terms = await db.getAllLexiconTerms();
      }
      
      return terms;
    }),

    getTerm: protectedProcedure
      .input(z.object({ term: z.string() }))
      .query(async ({ input }) => {
        return await db.getLexiconTerm(input.term);
      }),
  }),

  // Tokens
  tokens: router({
    getBalance: protectedProcedure.query(async ({ ctx }) => {
      return await db.getTokenBalance(ctx.user.id);
    }),

    getHistory: protectedProcedure.query(async ({ ctx }) => {
      return await db.getTokenHistory(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
