import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { defaultDailyMissions } from "../src/constants/defaultDailyMissions";

export const completeAssignment = mutation({
  args: {
    assignmentId: v.string(),
    subject: v.string(),
    subjectCategory: v.string(),
    ignoreCompletionSave: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return;
    }
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("_id"), userId))
      .unique();
    const existingCompletion = await ctx.db
      .query("assignmentCompletions")
      .filter(q => q.eq(q.field("userId"), userId))
      .filter(q => q.eq(q.field("assignmentId"), args.assignmentId))
      .unique();
    if (existingCompletion) {
      return;
    }

    if (!args.ignoreCompletionSave) {
      await ctx.db.insert("assignmentCompletions", {
        userId,
        assignmentId: args.assignmentId,
        subject: args.subject,
        completedAt: new Date().toISOString(),
      });
    }

    const currentUserDailyMission =
      defaultDailyMissions.find(
        mission => mission.id === user?.currentDailyMissionId
      ) ?? defaultDailyMissions[0];
    let completedMission = false;
    if (
      currentUserDailyMission &&
      currentUserDailyMission.subjectCategory === args.subjectCategory
    ) {
      const currentProgress = user?.currentDailyMissionProgress ?? 0;
      const newProgress = currentProgress + 1;

      if (newProgress <= currentUserDailyMission.target) {
        await ctx.db.patch(userId, {
          currentDailyMissionId: currentUserDailyMission.id,
          currentDailyMissionProgress: newProgress,
        });
      }

      if (newProgress === currentUserDailyMission.target) {
        completedMission = true;
      }
    }
    return completedMission;
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
      .query("assignmentCompletions")
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
      .query("assignmentCompletions")
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
