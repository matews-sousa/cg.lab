import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const completeAssignment = mutation({
  args: {
    assignmentId: v.string(),
    subject: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return;
    }
    const existingCompletion = await ctx.db
      .query("assignment_completions")
      .filter(q => q.eq(q.field("userId"), userId))
      .filter(q => q.eq(q.field("assignmentId"), args.assignmentId))
      .unique();
    if (existingCompletion) {
      return;
    }

    await ctx.db.insert("assignment_completions", {
      userId,
      assignmentId: args.assignmentId,
      subject: args.subject,
      completedAt: new Date().toISOString(),
    });
  },
});

export const getAssignmentCompletionsBySubject = query({
  args: {
    subject: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      // dont return anything if user is not authenticated
      return [];
    }
    return await ctx.db
      .query("assignment_completions")
      .filter(q => q.eq(q.field("userId"), userId))
      .filter(q => q.eq(q.field("subject"), args.subject))
      .collect();
  },
});

export const getSubjectsCompletionProgress = query({
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return {};
    }
    const completions = await ctx.db
      .query("assignment_completions")
      .filter(q => q.eq(q.field("userId"), userId))
      .collect();
    const subjects = completions.reduce(
      (acc, completion) => {
        if (!acc[completion.subject]) {
          acc[completion.subject] = 0;
        }
        acc[completion.subject]++;
        return acc;
      },
      {} as Record<string, number>
    );
    return subjects;
  },
});
