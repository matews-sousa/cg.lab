import { getAuthUserId } from "@convex-dev/auth/server";
import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import lostCurrentStreak from "../src/utils/lostCurrentStreak";
import { format } from "date-fns";

export const currentUser = query({
  args: {},
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db.get(userId);
  },
});

export const getUserByEmail = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .unique();
  },
});

export const updateUserStreak = mutation({
  handler: async ctx => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return;
    }
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("_id"), userId))
      .unique();
    if (user === null) {
      throw new Error("User not found");
    }
    const streak = user.streak ?? 0;
    const bestStreak = user.bestStreak ?? 0;
    const lastCompletedDate = user.lastCompletedDate ?? "";
    const practicedWeekDays = user.practicedWeekDays ?? [];

    // if last completed date is today, do nothing
    if (
      new Date(lastCompletedDate).toDateString() === new Date().toDateString()
    ) {
      return;
    }

    if (lostCurrentStreak(lastCompletedDate)) {
      const newBestStreak = Math.max(1, bestStreak);
      const formatedPracticedWeekDay = format(new Date(), "iii");
      await ctx.db.patch(userId, {
        streak: 1,
        bestStreak: newBestStreak,
        lastCompletedDate: new Date().toISOString(),
        practicedWeekDays: [formatedPracticedWeekDay],
      });
    } else {
      const formatedPracticedWeekDay = format(new Date(), "iii");
      await ctx.db.patch(userId, {
        streak: streak + 1,
        bestStreak: Math.max(streak + 1, bestStreak),
        lastCompletedDate: new Date().toISOString(),
        practicedWeekDays: [...practicedWeekDays, formatedPracticedWeekDay],
      });
    }
  },
});

export const resetAllUsersPracticedWeekDays = internalMutation({
  args: {},
  handler: async ctx => {
    const users = await ctx.db.query("users").collect();
    for (const user of users) {
      await ctx.db.patch(user._id, {
        practicedWeekDays: [],
      });
    }
  },
});
